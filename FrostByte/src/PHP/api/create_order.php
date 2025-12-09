<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log errors to a file
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/order_errors.log');

// Database connection
$connection = new mysqli('localhost', 'root', '', 'frostbyte');

if ($connection->connect_error) {
    http_response_code(500);
    error_log('Database connection error: ' . $connection->connect_error);
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $connection->connect_error]);
    exit;
}

// Set charset to utf8mb4
$connection->set_charset("utf8mb4");

// Get JSON data from request body
$rawData = file_get_contents('php://input');
error_log('Raw request data: ' . $rawData);
$data = json_decode($rawData, true);

if ($data === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON in request body']);
    exit;
}

error_log('Decoded data: ' . json_encode($data));

// Validate required fields
$required_fields = ['firstName', 'streetAddress', 'brgy', 'town', 'phone', 'email', 'paymentMethod', 'checkoutData'];

foreach ($required_fields as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit;
    }
}

// Extract billing data
$firstName = $connection->real_escape_string($data['firstName']);
$companyName = isset($data['companyName']) ? $connection->real_escape_string($data['companyName']) : '';
$phone = $connection->real_escape_string($data['phone']);
$email = $connection->real_escape_string($data['email']);
$paymentMethod = $connection->real_escape_string($data['paymentMethod']);

// Build shipping address in the format: "Street, Brgy. [Brgy], [City]"
$streetAddress = $connection->real_escape_string($data['streetAddress']);
$brgy = $connection->real_escape_string($data['brgy']);
$town = $connection->real_escape_string($data['town']);
$shippingAddress = $streetAddress . ', Brgy. ' . $brgy . ', ' . $town;

// Extract checkout data
$checkoutData = $data['checkoutData'];

// Validate checkout data - handle both single product and multiple items (cart)
if (isset($checkoutData['items']) && is_array($checkoutData['items'])) {
    // Cart checkout with multiple items
    $items = $checkoutData['items'];
    error_log('Cart checkout detected with ' . count($items) . ' items: ' . json_encode($items));
    if (empty($items)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Cart is empty']);
        exit;
    }
} else if (isset($checkoutData['productId']) && isset($checkoutData['quantity'])) {
    // Single product checkout - convert to items array for uniform processing
    $items = [
        [
            'productId' => $checkoutData['productId'],
            'quantity' => $checkoutData['quantity'],
            'price' => $checkoutData['subtotal'] / $checkoutData['quantity']
        ]
    ];
    error_log('Single product checkout detected: ' . json_encode($items));
} else {
    http_response_code(400);
    error_log('Invalid checkout data: ' . json_encode($checkoutData));
    echo json_encode(['success' => false, 'message' => 'Invalid checkout data']);
    exit;
}

$subtotal = floatval($checkoutData['subtotal']);
$shipping = floatval($checkoutData['shipping']);
$totalAmount = $subtotal + $shipping;

// Get user_id from session (assuming user is logged in)
// For now, using a valid default user - update this based on your auth system
// TODO: Get actual user_id from session or auth header
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'USR-003';
error_log('Using userId: ' . $userId . ', session_status: ' . (isset($_SESSION['user_id']) ? 'set' : 'not set'));

// Validate stock for all items before creating orders
$stockValidation = [];
foreach ($items as $item) {
    $productId = $connection->real_escape_string($item['productId']);
    $quantity = intval($item['quantity']);
    
    error_log('Processing item: productId=' . $productId . ', quantity=' . $quantity);
    
    $productQuery = $connection->query("SELECT product_name, stock FROM products WHERE product_id = '$productId'");
    
    if ($productQuery === false || $productQuery->num_rows === 0) {
        http_response_code(400);
        error_log('Product not found: ' . $productId);
        echo json_encode(['success' => false, 'message' => 'Product not found: ' . $productId]);
        exit;
    }
    
    $productResult = $productQuery->fetch_assoc();
    $currentStock = intval($productResult['stock']);
    
    if ($currentStock < $quantity) {
        http_response_code(400);
        error_log('Insufficient stock: product_id=' . $productId . ', requested=' . $quantity . ', available=' . $currentStock);
        echo json_encode([
            'success' => false,
            'message' => 'Insufficient stock for ' . $productResult['product_name'] . '. Only ' . $currentStock . ' item(s) in stock.',
            'available_stock' => $currentStock
        ]);
        exit;
    }
    
    $stockValidation[$productId] = [
        'productName' => $productResult['product_name'],
        'quantity' => $quantity,
        'currentStock' => $currentStock
    ];
}

// All stock validation passed - create orders for each item
$orderDate = date('Y-m-d H:i:s');
$createdOrderIds = [];
$amountPerItem = $subtotal / count($items);

error_log('Starting order creation. Total items: ' . count($items) . ', Amount per item: ' . $amountPerItem);

foreach ($items as $item) {
    $productId = $connection->real_escape_string($item['productId']);
    $quantity = intval($item['quantity']);
    $productName = $stockValidation[$productId]['productName'];
    
    // Generate unique order ID for each product
    $orderNumber = 'ORD-' . time() . '-' . count($createdOrderIds);
    
    error_log('Creating order: orderNumber=' . $orderNumber . ', productId=' . $productId . ', productName=' . $productName . ', quantity=' . $quantity . ', userId=' . $userId);
    
    // Insert order into database
    $insertQuery = "INSERT INTO orders 
    (order_id, user_id, customer, product, product_id, amount, quantity, status, payment_method, 
    phone, email, company_name, shipping_address, date, created_at, updated_at) 
    VALUES 
    ('$orderNumber', '$userId', '$firstName', '$productName', '$productId', '$amountPerItem', '$quantity', 
    'pending', '$paymentMethod', '$phone', '$email', '$companyName', '$shippingAddress', 
    '$orderDate', '$orderDate', '$orderDate')";
    
    error_log('Insert query: ' . $insertQuery);
    
    if (!$connection->query($insertQuery)) {
        http_response_code(500);
        error_log('Insert failed: ' . $connection->error);
        error_log('Insert error: ' . $connection->error);
        echo json_encode(['success' => false, 'message' => 'Failed to create order: ' . $connection->error]);
        exit;
    }
    
    // Deduct the stock from products table
    $updateStockQuery = "UPDATE products SET stock = stock - $quantity WHERE product_id = '$productId'";
    
    if (!$connection->query($updateStockQuery)) {
        http_response_code(500);
        error_log('Stock deduction error: ' . $connection->error);
        echo json_encode(['success' => false, 'message' => 'Order created but stock update failed: ' . $connection->error]);
        exit;
    }
    
    $createdOrderIds[] = $orderNumber;
    error_log('Order created: order_id=' . $orderNumber . ', product_id=' . $productId . ', quantity=' . $quantity);
}

// All orders created and stock deducted successfully
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Order(s) created successfully',
    'order_ids' => $createdOrderIds,
    'total_orders' => count($createdOrderIds),
    'order_data' => [
        'customer' => $firstName,
        'total_amount' => $totalAmount,
        'shipping_address' => $shippingAddress,
        'item_count' => count($items)
    ]
]);

$connection->close();
?>
