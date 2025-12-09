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
$customer_name = isset($_SESSION['fullname']) ? $_SESSION['fullname'] : (isset($_POST['customer_name']) ? trim($_POST['customer_name']) : '');

if (!$user_id) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "User not authenticated"]);
    exit;
}

// Get POST data
$part_name = isset($_POST['part_name']) ? trim($_POST['part_name']) : '';
$category = isset($_POST['category']) ? trim($_POST['category']) : '';
$condition = isset($_POST['condition']) ? trim($_POST['condition']) : '';
$price = isset($_POST['price']) ? floatval($_POST['price']) : 0;
$quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 1;
$description = isset($_POST['description']) ? trim($_POST['description']) : '';
$contact_phone = isset($_POST['contact_phone']) ? trim($_POST['contact_phone']) : '';

// Validate required fields
if (empty($part_name) || empty($category) || empty($condition) || $price <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing required fields: part_name, category, condition, price"]);
    exit;
}

// Generate unique request ID
$request_id = 'SP-' . date('YmdHis') . '-' . bin2hex(random_bytes(4));

// Generate unique numeric ID for the id column (unix timestamp + random)
$id = intval(microtime(true) * 10000) + random_int(1, 9999);

// Handle image uploads
$image_paths = [1 => '', 2 => '', 3 => '', 4 => ''];

for ($i = 1; $i <= 4; $i++) {
    $file_key = 'image_' . $i;
    
    if (isset($_FILES[$file_key]) && $_FILES[$file_key]['error'] === UPLOAD_ERR_OK) {
        $upload_dir = __DIR__ . '/../../resources/images/sell-parts/';
        
        // Create directory if it doesn't exist
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0755, true);
        }
        
        $file_name = basename($_FILES[$file_key]['name']);
        $file_ext = pathinfo($file_name, PATHINFO_EXTENSION);
        $new_file_name = $request_id . '_' . $i . '.' . $file_ext;
        $upload_path = $upload_dir . $new_file_name;
        
        if (move_uploaded_file($_FILES[$file_key]['tmp_name'], $upload_path)) {
            $image_paths[$i] = 'resources/images/sell-parts/' . $new_file_name;
        }
    }
}

// Validate at least one image was uploaded
if (empty($image_paths[1]) && empty($image_paths[2]) && empty($image_paths[3]) && empty($image_paths[4])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "At least one image is required"]);
    exit;
}

// Prepare image path variables for binding (required for bind_param to work with references)
$img1 = $image_paths[1];
$img2 = $image_paths[2];
$img3 = $image_paths[3];
$img4 = $image_paths[4];

// Insert into database
$sql = "INSERT INTO sell_parts_requests (
    id, request_id, user_id, customer_name, part_name, category, 
    `condition`, price, quantity, description, contact_phone, 
    image_path_1, image_path_2, image_path_3, image_path_4, `status`
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
    exit;
}

$status = 'pending';
$stmt->bind_param(
    'issssssdisssssss',
    $id, $request_id, $user_id, $customer_name, $part_name, $category,
    $condition, $price, $quantity, $description, $contact_phone,
    $img1, $img2, $img3, $img4, $status
);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Sell part request created successfully",
        "request_id" => $request_id,
        "data" => [
            "request_id" => $request_id,
            "part_name" => $part_name,
            "category" => $category,
            "condition" => $condition,
            "price" => $price,
            "status" => "pending"
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Execute failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
