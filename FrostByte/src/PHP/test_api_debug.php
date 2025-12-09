<?php
// Test API directly to see the error
session_start();
$_SESSION['user_id'] = 'USR-001'; // Simulate logged-in user

header('Content-Type: application/json');

// Get database connection
require_once 'db_connect.php';

if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Test data
$data = [
    'service_type' => 'pc-assembly',
    'description' => 'Test booking',
    'location' => 'Test Address',
    'preferred_date' => '2025-12-15',
    'preferred_time' => '14:00',
    'priority' => 'Medium'
];

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
    $description = isset($data['description']) ? $data['description'] : '';
    $priority = isset($data['priority']) ? $data['priority'] : 'Medium';
    $location = $data['location'];
    $preferred_date = $data['preferred_date'];
    $preferred_time = $data['preferred_time'];
    $status = 'Pending';
    
    echo json_encode(['debug' => 'Before insert', 'customer_id' => $customer_id, 'service_type' => $service_type]);
    exit;
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
}

mysqli_close($conn);
?>
