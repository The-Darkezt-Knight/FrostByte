<?php
header('Content-Type: application/json');
session_start();

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "frostbyte";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

$conn->set_charset("utf8mb4");

// Get user from session
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : (isset($_GET['user_id']) ? $conn->real_escape_string($_GET['user_id']) : null);

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "User ID is required"]);
    exit;
}

// Fetch sell parts requests for specific user
$sql = "SELECT 
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
WHERE user_id = ?
ORDER BY created_at DESC";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param('s', $user_id);
if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Execute failed: " . $stmt->error]);
    exit;
}

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "No sell part requests found",
        "data" => [],
        "count" => 0
    ]);
    exit;
}

$requests = array();
while ($row = $result->fetch_assoc()) {
    // Format image paths
    for ($i = 1; $i <= 4; $i++) {
        $key = 'image_path_' . $i;
        if ($row[$key]) {
            $row[$key] = '/FrostByte/' . $row[$key];
        } else {
            $row[$key] = null;
        }
    }
    
    $requests[] = $row;
}

http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Sell part requests retrieved successfully",
    "data" => $requests,
    "count" => count($requests)
]);

$stmt->close();
$conn->close();
?>
