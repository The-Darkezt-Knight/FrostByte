<?php
header('Content-Type: application/json');
session_start();

// Don't check auth for this test
// if (!isset($_SESSION['user_id'])) {
//     http_response_code(401);
//     echo json_encode(['success' => false, 'message' => 'Unauthorized']);
//     exit;
// }

// Get database connection
require_once 'db_connect.php';

if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

try {
    // Fetch all service requests with customer and technician details
    $sql = "SELECT 
                sr.request_id,
                sr.customer_id,
                c.fullname as customer,
                sr.service_type,
                sr.description,
                sr.priority,
                sr.status,
                sr.location,
                sr.preferred_date,
                sr.preferred_time,
                sr.assigned_technician_id,
                u.fullname as technician,
                sr.created_at,
                sr.updated_at
            FROM service_requests sr
            LEFT JOIN users c ON sr.customer_id = c.user_id
            LEFT JOIN users u ON sr.assigned_technician_id = u.user_id
            ORDER BY 
                CASE sr.priority
                    WHEN 'Critical' THEN 1
                    WHEN 'High' THEN 2
                    WHEN 'Medium' THEN 3
                    WHEN 'Low' THEN 4
                END ASC,
                sr.created_at DESC";

    $result = mysqli_query($conn, $sql);

    if (!$result) {
        throw new Exception("Query failed: " . mysqli_error($conn));
    }

    $services = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $services[] = $row;
    }

    http_response_code(200);
    echo json_encode($services);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error fetching service requests: ' . $e->getMessage()
    ]);
}

mysqli_close($conn);
?>
