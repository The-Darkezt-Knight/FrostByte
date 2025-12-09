<?php
session_start();
require_once '../db_connect.php';

if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit;
}

// Ensure this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get request data
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($input['request_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing request_id']);
    exit;
}

$request_id = $input['request_id'];
$status = 'Cancelled';
$user_id = $_SESSION['user_id'];

try {
    // Start transaction
    mysqli_begin_transaction($conn);

    // First, get the current service request to verify it belongs to the user
    $checkQuery = "SELECT customer_id FROM service_requests WHERE request_id = ?";
    $checkStmt = mysqli_prepare($conn, $checkQuery);
    mysqli_stmt_bind_param($checkStmt, 's', $request_id);
    mysqli_stmt_execute($checkStmt);
    $result = mysqli_stmt_get_result($checkStmt);
    $requestData = mysqli_fetch_assoc($result);

    if (!$requestData) {
        throw new Exception('Service request not found');
    }

    // Verify the request belongs to the current user
    if ($requestData['customer_id'] != $user_id) {
        throw new Exception('Unauthorized: This request does not belong to you');
    }

    // Update the service request status
    $updateQuery = "UPDATE service_requests SET status = ?, updated_at = NOW() WHERE request_id = ?";
    $updateStmt = mysqli_prepare($conn, $updateQuery);
    mysqli_stmt_bind_param($updateStmt, 'ss', $status, $request_id);
    
    if (!mysqli_stmt_execute($updateStmt)) {
        throw new Exception('Failed to update service request: ' . mysqli_error($conn));
    }

    // Commit transaction
    mysqli_commit($conn);

    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Service request cancelled successfully',
        'request_id' => $request_id,
        'status' => $status
    ]);

} catch (Exception $e) {
    // Rollback transaction on error
    mysqli_rollback($conn);
    
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} finally {
    // Close connections
    if (isset($checkStmt)) mysqli_stmt_close($checkStmt);
    if (isset($updateStmt)) mysqli_stmt_close($updateStmt);
    mysqli_close($conn);
}
?>
