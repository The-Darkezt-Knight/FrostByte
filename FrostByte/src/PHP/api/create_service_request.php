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
$required_fields = ['service_type', 'location', 'preferred_date', 'preferred_time'];
foreach ($required_fields as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit;
    }
}

try {
    // Get customer ID from session
    $customer_id = $_SESSION['user_id'];
    
    $service_type = $data['service_type'];
    $notes = isset($data['notes']) ? $data['notes'] : '';
    $contact_number = isset($data['contact_number']) ? $data['contact_number'] : '';
    $priority = 'Medium';
    $location = $data['location'];
    $preferred_date = $data['preferred_date'];
    $preferred_time = $data['preferred_time'];
    $status = 'Pending';
    
    // Generate unique request ID
    $request_id = 'SRV-' . date('YmdHis') . '-' . substr(md5(uniqid()), 0, 6);
    
    // Insert into service_requests table
    $sql = "INSERT INTO service_requests 
            (request_id, customer_id, service_type, notes, priority, status, location, preferred_date, preferred_time, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
    
    $stmt = mysqli_prepare($conn, $sql);
    
    if (!$stmt) {
        throw new Exception("Prepare failed: " . mysqli_error($conn));
    }
    
    // Bind parameters: request_id (s-string), customer_id (s), service_type (s), notes (s), priority (s), status (s), location (s), preferred_date (s), preferred_time (s)
    mysqli_stmt_bind_param($stmt, 'sssssssss', $request_id, $customer_id, $service_type, $notes, $priority, $status, $location, $preferred_date, $preferred_time);
    
    if (mysqli_stmt_execute($stmt)) {
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Service request created successfully',
            'request_id' => $request_id
        ]);
    } else {
        throw new Exception("Execute failed: " . mysqli_error($conn));
    }
    
    mysqli_stmt_close($stmt);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error creating service request: ' . $e->getMessage()
    ]);
}

mysqli_close($conn);
?>

