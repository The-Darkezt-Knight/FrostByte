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

// Log for debugging
error_log("get_service_requests.php called for user: " . $_SESSION['user_id']);

try {
    // Get customer ID from session
    $customer_id = $_SESSION['user_id'];
    
    error_log("Customer ID from session: " . $customer_id);
    
    // Check if specific request_id is requested
    $request_id = isset($_GET['request_id']) ? $_GET['request_id'] : null;
    
    if ($request_id) {
        // Fetch specific service request - simplified version first
        $sql = "SELECT * FROM service_requests WHERE request_id = ? AND customer_id = ?";
        
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            error_log("Prepare failed: " . $conn->error);
            throw new Exception("Prepare failed: " . $conn->error);
        }
        
        if (!$stmt->bind_param('ss', $request_id, $customer_id)) {
            error_log("Bind param failed: " . $stmt->error);
            throw new Exception("Bind param failed: " . $stmt->error);
        }
        
        if (!$stmt->execute()) {
            error_log("Execute failed: " . $stmt->error);
            throw new Exception("Execute failed: " . $stmt->error);
        }
        
        $result = $stmt->get_result();
        $service_request = $result->fetch_assoc();
        
        if (!$service_request) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'Service request not found'
            ]);
            exit;
        }
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $service_request
        ]);
    } else {
        // Fetch all service requests - simplified version first
        $sql = "SELECT * FROM service_requests WHERE customer_id = ? ORDER BY created_at DESC";
        
        error_log("Executing query for customer: " . $customer_id);
        
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            error_log("Prepare failed: " . $conn->error);
            throw new Exception("Prepare failed: " . $conn->error);
        }
        
        if (!$stmt->bind_param('s', $customer_id)) {
            error_log("Bind param failed: " . $stmt->error);
            throw new Exception("Bind param failed: " . $stmt->error);
        }
        
        if (!$stmt->execute()) {
            error_log("Execute failed: " . $stmt->error);
            throw new Exception("Execute failed: " . $stmt->error);
        }
        
        $result = $stmt->get_result();
        
        if (!$result) {
            error_log("Get result failed: " . $stmt->error);
            throw new Exception("Query failed: " . $stmt->error);
        }
        
        $service_requests = [];
        while ($row = $result->fetch_assoc()) {
            $service_requests[] = $row;
        }
        
        error_log("Found " . count($service_requests) . " service requests");
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $service_requests,
            'count' => count($service_requests)
        ]);
    }
    
} catch (Exception $e) {
    error_log("Exception in get_service_requests: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error fetching service requests: ' . $e->getMessage()
    ]);
}

$conn->close();
?>
