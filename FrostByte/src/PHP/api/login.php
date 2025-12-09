<?php
// Start session FIRST before any output
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

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
error_log('Login request: ' . $rawData);
$data = json_decode($rawData, true);

if ($data === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON in request body']);
    exit;
}

// Validate required fields
if (!isset($data['email']) || empty($data['email']) || !isset($data['password']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit;
}

// Extract and sanitize input
$email = $connection->real_escape_string(trim($data['email']));
$password = $data['password'];

// Hash password using SHA256 (same as registration)
$hashed_password = hash('sha256', $password);

// Query user by email
$query = "SELECT user_id, fullname, email, password, role, status FROM users WHERE email = '$email'";
error_log('Login query: ' . $query);

$result = $connection->query($query);

if ($result === false) {
    http_response_code(500);
    error_log('Login query error: ' . $connection->error);
    echo json_encode(['success' => false, 'message' => 'Database error']);
    exit;
}

// Check if user exists
if ($result->num_rows === 0) {
    http_response_code(401);
    error_log('Login failed: User not found - email=' . $email);
    echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    exit;
}

$user = $result->fetch_assoc();

// Verify password
if ($user['password'] !== $hashed_password) {
    http_response_code(401);
    error_log('Login failed: Incorrect password - email=' . $email);
    echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    exit;
}

// Check if account is active
if ($user['status'] !== 'active') {
    http_response_code(403);
    error_log('Login failed: Account inactive - email=' . $email . ', status=' . $user['status']);
    echo json_encode(['success' => false, 'message' => 'Your account has been deactivated']);
    exit;
}

// Set session variables
$_SESSION['user_id'] = $user['user_id'];
$_SESSION['fullname'] = $user['fullname'];
$_SESSION['email'] = $user['email'];
$_SESSION['role'] = $user['role'];

// Log the successful login
error_log('User logged in successfully: user_id=' . $user['user_id'] . ', role=' . $user['role']);

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Login successful',
    'user' => [
        'user_id' => $user['user_id'],
        'fullname' => $user['fullname'],
        'email' => $user['email'],
        'role' => $user['role']
    ]
]);

$connection->close();
?>
