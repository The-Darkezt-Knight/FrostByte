<?php
header('Content-Type: application/json');
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// Get database connection
require_once '../db_connect.php';

if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['request_id']) || empty($data['request_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing request_id']);
    exit;
}

if (!isset($data['technician_id']) || empty($data['technician_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing technician_id']);
    exit;
}

try {
    $request_id = $data['request_id'];
    $technician_id = $data['technician_id'];
    $new_status = $data['status'] ?? 'Scheduled';
    
    // Update service request with assigned technician and status
    $sql = "UPDATE service_requests 
            SET assigned_technician_id = ?, status = ?, updated_at = NOW()
            WHERE request_id = ?";
    
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    $stmt->bind_param('sss', $technician_id, $new_status, $request_id);
    
    if ($stmt->execute()) {
        // Log this change to history
        $history_id = 'HST-' . strtoupper(substr(uniqid(), -6));
        $old_status = 'Pending';
        
        $history_sql = "INSERT INTO service_request_history 
                       (history_id, request_id, old_status, new_status, changed_by, notes, created_at)
                       VALUES (?, ?, ?, ?, ?, ?, NOW())";
        
        $history_stmt = $conn->prepare($history_sql);
        $note = "Technician assigned";
        
        $history_stmt->bind_param('ssssss', $history_id, $request_id, $old_status, $new_status, $_SESSION['user_id'], $note);
        $history_stmt->execute();
        $history_stmt->close();
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Technician assigned successfully',
            'request_id' => $request_id
        ]);
    } else {
        throw new Exception("Execute failed: " . $stmt->error);
    }
    
    $stmt->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error assigning technician: ' . $e->getMessage()
    ]);
}

$conn->close();
?>
