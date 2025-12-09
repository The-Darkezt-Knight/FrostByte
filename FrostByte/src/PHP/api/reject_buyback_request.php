<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if user is authenticated
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Unauthorized'
    ]);
    exit();
}

try {
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['request_id'])) {
        throw new Exception("Missing request_id");
    }

    $request_id = (int)$input['request_id'];
    $status = 'Rejected';
    $approved_by = $_SESSION['user_id'];

    // Update sell part request
    $updateQuery = "
        UPDATE sell_parts_requests 
        SET 
            status = ?,
            approved_by = ?,
            approved_at = NOW(),
            updated_at = NOW()
        WHERE id = ?
    ";

    $stmt = $conn->prepare($updateQuery);

    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param('sii', $status, $approved_by, $request_id);

    if (!$stmt->execute()) {
        throw new Exception("Execute failed: " . $stmt->error);
    }

    if ($stmt->affected_rows === 0) {
        throw new Exception("No record found to update");
    }

    $stmt->close();

    echo json_encode([
        'success' => true,
        'message' => 'Sell part request rejected'
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

$conn->close();
?>
