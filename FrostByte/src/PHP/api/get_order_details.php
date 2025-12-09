<?php
// Start session FIRST before any output
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/order_errors.log');

// Verify admin access
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
    exit;
}

// Get order ID from query parameter
$order_id = isset($_GET['order_id']) ? trim($_GET['order_id']) : null;

if (!$order_id) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Order ID is required']);
    exit;
}

// Database connection
$connection = new mysqli('localhost', 'root', '', 'frostbyte');

if ($connection->connect_error) {
    http_response_code(500);
    error_log('Database connection error: ' . $connection->connect_error);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

$connection->set_charset("utf8mb4");

// Fetch order details with customer info
$query = "SELECT 
    o.order_id, 
    o.customer as customer_name,
    o.email,
    o.phone,
    o.shipping_address,
    o.product,
    o.quantity as total_items,
    o.amount as total_amount,
    o.status,
    o.date as order_date,
    o.payment_method
FROM orders o
WHERE o.order_id = ?";

$stmt = $connection->prepare($query);
if (!$stmt) {
    http_response_code(500);
    error_log('Prepare error: ' . $connection->error);
    echo json_encode(['success' => false, 'message' => 'Database prepare failed']);
    exit;
}

$stmt->bind_param('s', $order_id);
if (!$stmt->execute()) {
    http_response_code(500);
    error_log('Execute error: ' . $stmt->error);
    echo json_encode(['success' => false, 'message' => 'Database query failed']);
    exit;
}

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Order not found']);
    exit;
}

$order = $result->fetch_assoc();

// Parse items (they're stored as comma-separated in product column)
$items = [];
if (!empty($order['product'])) {
    $products = explode(',', $order['product']);
    foreach ($products as $product) {
        $items[] = [
            'product_name' => trim($product),
            'quantity' => 1,
            'price' => $order['total_amount'] / count($products)
        ];
    }
}

// Calculate totals based on real order amount
$total_amount = (float)$order['total_amount'];
$subtotal = $total_amount * 0.85; // Approximate (85% of total)
$tax = $total_amount * 0.10; // 10% tax
$shipping = $total_amount - $subtotal - $tax;

// Ensure shipping is never negative
if ($shipping < 0) {
    $shipping = 0;
}

http_response_code(200);
echo json_encode([
    'success' => true,
    'order' => [
        'order_id' => $order['order_id'],
        'customer_name' => $order['customer_name'] || 'Unknown Customer',
        'email' => $order['email'] || 'Not provided',
        'phone' => $order['phone'] || 'Not provided',
        'shipping_address' => $order['shipping_address'] || 'Not provided',
        'total_amount' => $total_amount,
        'subtotal' => $subtotal,
        'tax' => $tax,
        'shipping' => $shipping,
        'status' => $order['status'],
        'order_date' => $order['order_date'],
        'payment_method' => $order['payment_method'] || 'Not specified',
        'items' => $items
    ]
]);

$stmt->close();
$connection->close();
?>
