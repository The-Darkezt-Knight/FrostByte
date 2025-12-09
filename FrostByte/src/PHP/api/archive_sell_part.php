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
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

if (!$user_id) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "User not authenticated"]);
    exit;
}

// Get request ID
$request_id = isset($_POST['request_id']) ? trim($_POST['request_id']) : '';

if (empty($request_id)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Request ID is required"]);
    exit;
}

// Delete request and associated images
$sql = "DELETE FROM sell_parts_requests WHERE request_id = ? AND user_id = ?";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param('ss', $request_id, $user_id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Sell part request deleted successfully",
            "request_id" => $request_id
        ]);
    } else {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Request not found or already deleted"]);
    }
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Execute failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
