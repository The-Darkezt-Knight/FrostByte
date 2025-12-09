<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "frostbyte";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if image_path column exists, if not add it
$result = $conn->query("SHOW COLUMNS FROM products LIKE 'image_path'");

if ($result->num_rows == 0) {
    // Column doesn't exist, add it
    $alter_sql = "ALTER TABLE products ADD COLUMN image_path VARCHAR(255) NULL DEFAULT NULL AFTER status";
    
    if ($conn->query($alter_sql) === TRUE) {
        echo "Column 'image_path' added successfully to products table";
    } else {
        echo "Error adding column: " . $conn->error;
    }
} else {
    echo "Column 'image_path' already exists";
}

$conn->close();
?>
