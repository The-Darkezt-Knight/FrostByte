<?php
// Assign Technician to Service Request API
// Updates the assigned_technician_id for a service request

header('Content-Type: application/json');
require_once __DIR__ . '/../db_connect.php';

// Check database connection
if (!isset($conn) || $conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Access denied - Admin only']);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['request_id']) || !isset($data['technician_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$request_id = $data['request_id'];
$technician_id = $data['technician_id'];
$notes = $data['notes'] ?? '';

try {
    // Verify the service request exists
    $checkQuery = "SELECT * FROM service_requests WHERE request_id = ?";
    $stmt = $conn->prepare($checkQuery);
    
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    $stmt->bind_param('s', $request_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Service request not found']);
        exit;
    }
    
    $stmt->close();
    
    // Update service request with technician assignment
    $updateQuery = "
        UPDATE service_requests 
        SET 
            assigned_technician_id = ?,
            assigned_by = ?,
            status = 'Scheduled',
            scheduled_at = NOW(),
            notes = IF(? != '', CONCAT(COALESCE(notes, ''), ' | ', ?), notes),
            updated_at = NOW()
        WHERE request_id = ?
    ";
    
    $stmt = $conn->prepare($updateQuery);
    
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    // Get current user ID from session
    $assigned_by = $_SESSION['user_id'];
    $stmt->bind_param('sssss', $technician_id, $assigned_by, $notes, $notes, $request_id);
    
    if (!$stmt->execute()) {
        throw new Exception("Execute failed: " . $stmt->error);
    }
    
    $stmt->close();
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Technician assigned successfully'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error assigning technician',
        'error' => $e->getMessage()
    ]);
}

$conn->close();
?>
