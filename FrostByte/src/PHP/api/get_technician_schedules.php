<?php
// Get Technician Schedules API
// Fetches service requests that need technician assignment

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

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// Check if user is admin or technician
if (!isset($_SESSION['role']) || ($_SESSION['role'] !== 'admin' && $_SESSION['role'] !== 'technician')) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Access denied']);
    exit;
}

try {
    // Query service requests with customer details
    $query = "
        SELECT 
            sr.request_id as id,
            u.fullname as customer,
            u.email as email,
            u.city as address,
            sr.service_type as service,
            sr.description as description,
            sr.priority as priority,
            sr.preferred_date as date,
            sr.preferred_time as time,
            COALESCE(assigned_user.fullname, '') as technician,
            sr.status as status,
            sr.notes as notes
        FROM service_requests sr
        JOIN users u ON sr.customer_id = u.user_id
        LEFT JOIN users assigned_user ON sr.assigned_technician_id = assigned_user.user_id
        ORDER BY sr.preferred_date DESC, sr.preferred_time DESC
    ";
    
    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }
    
    $schedules = [];
    while ($row = $result->fetch_assoc()) {
        // Map status to lowercase for consistency
        $row['status'] = strtolower(str_replace(' ', '_', $row['status']));
        
        // Format time if present
        if ($row['time']) {
            // Convert time to 12-hour format
            $timeObj = DateTime::createFromFormat('H:i:s', $row['time']);
            if ($timeObj) {
                $row['time'] = $timeObj->format('h:i A');
            }
        }
        
        $schedules[] = $row;
    }
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $schedules,
        'count' => count($schedules)
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error fetching schedules',
        'error' => $e->getMessage()
    ]);
}

$conn->close();
?>
