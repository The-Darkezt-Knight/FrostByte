<?php
header('Content-Type: application/json');
session_start();

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "frostbyte";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Set charset to utf8mb4
$conn->set_charset("utf8mb4");

// Get user_id from session or query parameter
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : (isset($_GET['user_id']) ? $conn->real_escape_string($_GET['user_id']) : null);

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "User ID is required"]);
    exit;
}

// Fetch orders for specific user with product images
$sql = "SELECT 
    o.order_id, 
    o.user_id,
    o.customer, 
    o.product,
    o.product_id,
    o.amount, 
    o.quantity,
    o.status, 
    o.date,
    o.created_at,
    o.shipping_address,
    o.phone,
    o.email,
    p.image_path as product_image
FROM orders o
LEFT JOIN products p ON o.product_id = p.product_id
WHERE o.user_id = '$user_id'
ORDER BY o.created_at DESC, o.order_id DESC";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Query failed: " . $conn->error]);
    exit;
}

if ($result->num_rows === 0) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "No orders found",
        "data" => [],
        "count" => 0
    ]);
    exit;
}

// Group orders by order_id and aggregate items
$ordersMap = array();

while($row = $result->fetch_assoc()) {
    $order_id = $row['order_id'];
    
    // Format product image path
    if ($row['product_image']) {
        $row['product_image'] = '/FrostByte/resources/images/products/' . basename($row['product_image']);
    } else {
        $row['product_image'] = '/FrostByte/resources/images/placeholder.png';
    }
    
    // Initialize order if not exists
    if (!isset($ordersMap[$order_id])) {
        $ordersMap[$order_id] = [
            'order_id' => $row['order_id'],
            'user_id' => $row['user_id'],
            'customer' => $row['customer'],
            'status' => $row['status'],
            'created_at' => $row['created_at'],
            'date' => $row['date'],
            'shipping_address' => $row['shipping_address'],
            'phone' => $row['phone'],
            'email' => $row['email'],
            'total' => 0,
            'items' => []
        ];
    }
    
    // Add item to order
    $itemTotal = floatval($row['amount']) * intval($row['quantity']);
    $ordersMap[$order_id]['items'][] = [
        'product_id' => $row['product_id'],
        'product_name' => $row['product'],
        'product_image' => $row['product_image'],
        'quantity' => intval($row['quantity']),
        'price' => floatval($row['amount'])
    ];
    
    // Add to total
    $ordersMap[$order_id]['total'] += $itemTotal;
}

// Convert map to array
$orders = array_values($ordersMap);

// Sort by created_at descending
usort($orders, function($a, $b) {
    return strtotime($b['created_at']) - strtotime($a['created_at']);
});

http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Orders retrieved successfully",
    "data" => $orders,
    "count" => count($orders)
]);

$conn->close();
?>
