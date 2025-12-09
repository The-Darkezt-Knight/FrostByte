<?php
/**
 * API Endpoint: Approve or Reject Order
 * Path: /FrostByte/src/PHP/api/manage_order.php
 * Methods: POST (approve/reject)
 */

session_start();
header('Content-Type: application/json');

// Check admin authentication
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
    exit();
}

// Get request parameters
$action = $_POST['action'] ?? null;
$order_id = $_POST['order_id'] ?? null;
$admin_notes = $_POST['admin_notes'] ?? '';
$rejection_reason = $_POST['rejection_reason'] ?? '';

// Validate parameters
if (!$action || !$order_id || !in_array($action, ['approve', 'reject'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid parameters']);
    exit();
}

// Require rejection reason for reject action
if ($action === 'reject' && empty($rejection_reason)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Rejection reason is required']);
    exit();
}

// Get database connection
require_once '../../config/Database.php';

try {
    $db = new Database();
    $conn = $db->connect();

    // Begin transaction
    $conn->begin_transaction();

    // Get current order status
    $checkStmt = $conn->prepare("SELECT status FROM orders WHERE order_id = ?");
    $checkStmt->bind_param("s", $order_id);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    
    if ($result->num_rows === 0) {
        throw new Exception('Order not found');
    }

    $order = $result->fetch_assoc();
    $currentStatus = $order['status'];

    // Check if order can be processed
    if ($currentStatus !== 'pending') {
        throw new Exception('Only pending orders can be processed');
    }

    // Prepare update statement based on action
    if ($action === 'approve') {
        $newStatus = 'processing';
        $updateStmt = $conn->prepare("
            UPDATE orders 
            SET status = ?, 
                admin_notes = ?, 
                approved_by = ?, 
                approved_at = NOW()
            WHERE order_id = ?
        ");
        $updateStmt->bind_param("ssss", $newStatus, $admin_notes, $_SESSION['user_id'], $order_id);
    } else { // reject
        $newStatus = 'rejected';
        $updateStmt = $conn->prepare("
            UPDATE orders 
            SET status = ?, 
                rejection_reason = ?, 
                admin_notes = ?, 
                rejected_by = ?, 
                rejected_at = NOW()
            WHERE order_id = ?
        ");
        $updateStmt->bind_param("sssss", $newStatus, $rejection_reason, $admin_notes, $_SESSION['user_id'], $order_id);
    }

    if (!$updateStmt->execute()) {
        throw new Exception('Failed to update order: ' . $updateStmt->error);
    }

    // Log to approval history
    $historyId = uniqid('history_');
    $historyAction = ($action === 'approve') ? 'approved' : 'rejected';
    $historyReason = ($action === 'approve') ? $admin_notes : $rejection_reason;

    $historyStmt = $conn->prepare("
        INSERT INTO approval_history 
        (id, request_type, request_id, user_id, admin_id, action, reason, notes)
        VALUES (?, 'order', ?, ?, ?, ?, ?, ?)
    ");
    $historyStmt->bind_param(
        "sssssss",
        $historyId,
        $order_id,
        $order['user_id'] ?? 'unknown',
        $_SESSION['user_id'],
        $historyAction,
        $historyReason,
        $admin_notes
    );

    if (!$historyStmt->execute()) {
        throw new Exception('Failed to log approval history: ' . $historyStmt->error);
    }

    // Commit transaction
    $conn->commit();

    // Return success response
    echo json_encode([
        'success' => true,
        'message' => ucfirst($action) . 'd successfully',
        'order_id' => $order_id,
        'new_status' => $newStatus
    ]);

} catch (Exception $e) {
    // Rollback transaction on error
    $conn->rollback();
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

$conn->close();
?>
