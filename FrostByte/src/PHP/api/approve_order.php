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

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);
$order_id = isset($input['order_id']) ? trim($input['order_id']) : null;

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

// Start transaction
$connection->begin_transaction();

try {
    // Update order status to 'processing'
    $update_query = "UPDATE orders SET status = 'processing' WHERE order_id = ?";
    $stmt = $connection->prepare($update_query);
    
    if (!$stmt) {
        throw new Exception('Prepare error: ' . $connection->error);
    }
    
    $stmt->bind_param('s', $order_id);
    
    if (!$stmt->execute()) {
        throw new Exception('Execute error: ' . $stmt->error);
    }
    
    if ($stmt->affected_rows === 0) {
        throw new Exception('Order not found or already approved');
    }
    
    $stmt->close();
    
    // Commit transaction
    $connection->commit();
    
    // Get updated stats
    $stats_query = "SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending_payment' THEN 1 ELSE 0 END) as pending_payment,
        SUM(CASE WHEN status = 'processing' THEN 1 ELSE 0 END) as processing,
        SUM(CASE WHEN status = 'shipped' THEN 1 ELSE 0 END) as shipped,
        SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as delivered
    FROM orders";
    
    $stats_result = $connection->query($stats_query);
    $stats = $stats_result->fetch_assoc();
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Order approved and moved to processing',
        'order_id' => $order_id,
        'new_status' => 'processing',
        'stats' => [
            'total' => (int)$stats['total'],
            'pending_payment' => (int)($stats['pending_payment'] ?? 0),
            'processing' => (int)($stats['processing'] ?? 0),
            'shipped' => (int)($stats['shipped'] ?? 0),
            'delivered' => (int)($stats['delivered'] ?? 0)
        ]
    ]);
    
} catch (Exception $e) {
    // Rollback transaction
    $connection->rollback();
    
    error_log('Order approval error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

$connection->close();
?>
