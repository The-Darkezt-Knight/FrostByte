<?php
// Test script to verify create_sell_part.php works correctly
session_start();

// Simulate logged-in user
$_SESSION['user_id'] = 'USR-6932b7e5bfc26';
$_SESSION['fullname'] = 'Test User';

// Set up mock POST data
$_POST['part_name'] = 'Test RAM Module';
$_POST['category'] = 'Memory';
$_POST['condition'] = 'excellent';
$_POST['price'] = '5000';
$_POST['quantity'] = '1';
$_POST['description'] = 'Testing the sell part feature';
$_POST['contact_phone'] = '09123456789';

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "frostbyte";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$conn->set_charset("utf8mb4");

// Get user from session
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
$customer_name = isset($_SESSION['fullname']) ? $_SESSION['fullname'] : (isset($_POST['customer_name']) ? trim($_POST['customer_name']) : '');

if (!$user_id) {
    die(json_encode(["success" => false, "message" => "User not authenticated"]));
}

// Get POST data
$part_name = isset($_POST['part_name']) ? trim($_POST['part_name']) : '';
$category = isset($_POST['category']) ? trim($_POST['category']) : '';
$condition = isset($_POST['condition']) ? trim($_POST['condition']) : '';
$price = isset($_POST['price']) ? floatval($_POST['price']) : 0;
$quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 1;
$description = isset($_POST['description']) ? trim($_POST['description']) : '';
$contact_phone = isset($_POST['contact_phone']) ? trim($_POST['contact_phone']) : '';

echo "DEBUG: Parsed values:\n";
echo "part_name: " . var_export($part_name, true) . "\n";
echo "category: " . var_export($category, true) . "\n";
echo "condition: " . var_export($condition, true) . "\n";
echo "price: " . var_export($price, true) . " (type: " . gettype($price) . ")\n";
echo "quantity: " . var_export($quantity, true) . " (type: " . gettype($quantity) . ")\n";
echo "description: " . var_export($description, true) . "\n";
echo "contact_phone: " . var_export($contact_phone, true) . "\n";

// Validate required fields
if (empty($part_name) || empty($category) || empty($condition) || $price <= 0) {
    die(json_encode(["success" => false, "message" => "Missing required fields: part_name, category, condition, price"]));
}

// Generate unique request ID
$request_id = 'SP-' . date('YmdHis') . '-' . bin2hex(random_bytes(4));

echo "DEBUG: request_id: $request_id\n";

// Handle image uploads - using empty strings
$image_paths = [1 => '', 2 => '', 3 => '', 4 => ''];

echo "DEBUG: image_paths before validation: " . var_export($image_paths, true) . "\n";

// Since no files in CLI test, validate will fail - skip this test
// Instead test just the database insert

// Insert into database
$sql = "INSERT INTO sell_parts_requests (
    request_id, user_id, customer_name, part_name, category, 
    `condition`, price, quantity, description, contact_phone, 
    image_path_1, image_path_2, image_path_3, image_path_4, `status`
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

echo "DEBUG: SQL query prepared\n";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    die(json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]));
}

echo "DEBUG: Statement prepared successfully\n";

$status = 'pending';
echo "DEBUG: About to bind parameters:\n";
echo "  Types: 'sssssdisssssss'\n";
echo "  Params: \n";
echo "    request_id: " . var_export($request_id, true) . "\n";
echo "    user_id: " . var_export($user_id, true) . "\n";
echo "    customer_name: " . var_export($customer_name, true) . "\n";
echo "    part_name: " . var_export($part_name, true) . "\n";
echo "    category: " . var_export($category, true) . "\n";
echo "    condition: " . var_export($condition, true) . "\n";
echo "    price: " . var_export($price, true) . "\n";
echo "    quantity: " . var_export($quantity, true) . "\n";
echo "    description: " . var_export($description, true) . "\n";
echo "    contact_phone: " . var_export($contact_phone, true) . "\n";
echo "    image_path_1: " . var_export($image_paths[1], true) . "\n";
echo "    image_path_2: " . var_export($image_paths[2], true) . "\n";
echo "    image_path_3: " . var_export($image_paths[3], true) . "\n";
echo "    image_path_4: " . var_export($image_paths[4], true) . "\n";
echo "    status: " . var_export($status, true) . "\n";

$bind_result = $stmt->bind_param(
    'sssssdisssssss',
    $request_id, $user_id, $customer_name, $part_name, $category,
    $condition, $price, $quantity, $description, $contact_phone,
    $image_paths[1], $image_paths[2], $image_paths[3], $image_paths[4], $status
);

if (!$bind_result) {
    die(json_encode(["success" => false, "message" => "Bind param failed: " . $stmt->error]));
}

echo "DEBUG: Parameters bound successfully\n";

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Sell part request created successfully",
        "request_id" => $request_id
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Execute failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
