<?php
header('Content-Type: application/json');

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// Get database connection
require_once __DIR__ . '/../db_connect.php';

if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

try {
    // Fetch all active technicians
    $sql = "SELECT user_id, fullname, email, city, status
            FROM users
            WHERE role = 'technician' AND status = 'active'
            ORDER BY fullname ASC";
    
    $result = $conn->query($sql);
    
    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }
    
    $technicians = [];
    while ($row = $result->fetch_assoc()) {
        $technicians[] = $row;
    }
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $technicians,
        'count' => count($technicians)
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error fetching technicians: ' . $e->getMessage()
    ]);
}

$conn->close();
?>
