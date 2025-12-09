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
    // Get all sell part requests (buyback requests from customers)
    $query = "
        SELECT 
            id,
            request_id,
            user_id,
            customer_name,
            part_name,
            category,
            `condition`,
            price,
            quantity,
            description,
            contact_phone,
            image_path_1,
            image_path_2,
            image_path_3,
            image_path_4,
            `status`,
            created_at,
            updated_at
        FROM sell_parts_requests
        ORDER BY created_at DESC
    ";

    $result = $conn->query($query);

    if (!$result) {
        throw new Exception("Query error: " . $conn->error);
    }

    $requests = [];
    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }

    echo json_encode([
        'success' => true,
        'data' => $requests,
        'total' => count($requests)
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

$conn->close();
?>
