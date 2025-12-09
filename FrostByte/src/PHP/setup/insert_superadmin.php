<?php
// Insert superadmin credentials for testing
$connection = new mysqli('localhost', 'root', '', 'frostbyte');

if ($connection->connect_error) {
    die('Connection failed: ' . $connection->connect_error);
}

$connection->set_charset("utf8mb4");

// Superadmin credentials
$fullname = 'Super Admin';
$email = 'superadmin@frostbyte.com';
$password = '123123';
$gender = 'Male';
$city = 'Admin City';
$role = 'superadmin';
$status = 'active';

// Hash password using SHA256 (same as registration)
$hashed_password = hash('sha256', $password);

// Generate unique user ID
$user_id = 'USR-' . bin2hex(random_bytes(6));

// Insert query
$query = "INSERT INTO users 
(user_id, fullname, email, password, gender, city, role, status, orders, total_spent, join_date, created_at, updated_at) 
VALUES 
('$user_id', '$fullname', '$email', '$hashed_password', '$gender', '$city', '$role', '$status', 0, 0.00, NOW(), NOW(), NOW())";

if ($connection->query($query) === TRUE) {
    echo "<h2>✅ Superadmin account created successfully!</h2>";
    echo "<p><strong>Email:</strong> $email</p>";
    echo "<p><strong>Password:</strong> $password</p>";
    echo "<p><strong>User ID:</strong> $user_id</p>";
    echo "<p><strong>Role:</strong> $role</p>";
    echo "<hr>";
    echo "<p><a href='/FrostByte/src/PHP/index.php'>Back to Login</a></p>";
} else {
    echo "<h2>❌ Error creating superadmin account</h2>";
    echo "<p>Error: " . $connection->error . "</p>";
    
    // Check if user already exists
    $check_query = "SELECT * FROM users WHERE email = '$email'";
    $result = $connection->query($check_query);
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo "<p><strong>Superadmin already exists:</strong></p>";
        echo "<p><strong>Email:</strong> " . $user['email'] . "</p>";
        echo "<p><strong>Role:</strong> " . $user['role'] . "</p>";
    }
}

$connection->close();
?>
