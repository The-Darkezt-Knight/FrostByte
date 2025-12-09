<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log errors to a file
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/auth_errors.log');

// Database connection
$connection = new mysqli('localhost', 'root', '', 'frostbyte');

if ($connection->connect_error) {
    http_response_code(500);
    error_log('Database connection error: ' . $connection->connect_error);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

$connection->set_charset("utf8mb4");

// Get JSON data from request body
$rawData = file_get_contents('php://input');
error_log('Signup request: ' . $rawData);
$data = json_decode($rawData, true);

if ($data === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON in request body']);
    exit;
}

// Validate required fields
$required_fields = ['fullname', 'email', 'password', 'confirm_password', 'gender', 'city'];

foreach ($required_fields as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit;
    }
}

// Extract and sanitize input
$fullname = $connection->real_escape_string(trim($data['fullname']));
$email = $connection->real_escape_string(trim($data['email']));
$password = $data['password'];
$confirm_password = $data['confirm_password'];
$gender = $connection->real_escape_string(trim($data['gender']));
$city = $connection->real_escape_string(trim($data['city']));

// Validate fullname (at least 3 characters)
if (strlen($fullname) < 3) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Full name must be at least 3 characters long']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Validate password length (at least 6 characters)
if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters long']);
    exit;
}

// Check if passwords match
if ($password !== $confirm_password) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Passwords do not match']);
    exit;
}

// Check if email already exists
$checkEmailQuery = "SELECT user_id FROM users WHERE email = '$email'";
$result = $connection->query($checkEmailQuery);

if ($result === false) {
    http_response_code(500);
    error_log('Email check query error: ' . $connection->error);
    echo json_encode(['success' => false, 'message' => 'Database error']);
    exit;
}

if ($result->num_rows > 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email already registered']);
    exit;
}

// Hash password using SHA256 (same as existing system)
$hashed_password = hash('sha256', $password);

// Generate unique user_id
$user_id = 'USR-' . uniqid();
$join_date = date('Y-m-d H:i:s');

// Insert new user into database
// By default, new users are registered as 'user' (customer) role
$insertQuery = "INSERT INTO users 
(user_id, fullname, email, password, gender, city, role, status, orders, total_spent, join_date, created_at, updated_at) 
VALUES 
('$user_id', '$fullname', '$email', '$hashed_password', '$gender', '$city', 'user', 'active', 0, 0.00, '$join_date', '$join_date', '$join_date')";

error_log('Insert query: ' . $insertQuery);

if ($connection->query($insertQuery)) {
    error_log('User registered successfully: user_id=' . $user_id . ', email=' . $email);
    
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'User registered successfully',
        'user_id' => $user_id,
        'email' => $email,
        'fullname' => $fullname,
        'role' => 'user'
    ]);
} else {
    http_response_code(500);
    error_log('Insert error: ' . $connection->error);
    echo json_encode(['success' => false, 'message' => 'Failed to register user: ' . $connection->error]);
}

$connection->close();
?>
