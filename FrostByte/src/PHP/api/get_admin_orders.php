<?php
// Start session FIRST before any output
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

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
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

$connection->set_charset("utf8mb4");

// Fetch all orders with stats
$query = "SELECT 
    o.order_id, 
    o.customer as customer_name,
    u.fullname,
    u.email,
    o.product,
    o.quantity as total_items,
    o.amount as total_amount,
    o.status,
    o.date as order_date,
    'Not specified' as payment_method
FROM orders o
LEFT JOIN users u ON o.user_id = u.user_id
ORDER BY o.date DESC
LIMIT 100";

error_log('Fetching orders with query: ' . $query);

$result = $connection->query($query);

if ($result === false) {
    http_response_code(500);
    error_log('Query error: ' . $connection->error);
    echo json_encode(['success' => false, 'message' => 'Database query failed']);
    exit;
}

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

// Get order statistics
$stats_query = "SELECT 
    COUNT(*) as total,
    SUM(CASE WHEN status = 'pending_payment' THEN 1 ELSE 0 END) as pending_payment,
    SUM(CASE WHEN status = 'processing' THEN 1 ELSE 0 END) as processing,
    SUM(CASE WHEN status = 'shipped' THEN 1 ELSE 0 END) as shipped,
    SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as delivered
FROM orders";

error_log('Fetching stats with query: ' . $stats_query);

$stats_result = $connection->query($stats_query);

if ($stats_result === false) {
    http_response_code(500);
    error_log('Stats query error: ' . $connection->error);
    echo json_encode(['success' => false, 'message' => 'Database stats query failed']);
    exit;
}

$stats = $stats_result->fetch_assoc();

error_log('Successfully fetched ' . count($orders) . ' orders');

http_response_code(200);
echo json_encode([
    'success' => true,
    'orders' => $orders,
    'stats' => [
        'total' => (int)$stats['total'],
        'pending_payment' => (int)($stats['pending_payment'] ?? 0),
        'processing' => (int)($stats['processing'] ?? 0),
        'shipped' => (int)($stats['shipped'] ?? 0),
        'delivered' => (int)($stats['delivered'] ?? 0)
    ]
]);

$connection->close();
?>
