<?php
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "frostbyte";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Set charset to utf8
$conn->set_charset("utf8");

// Fetch all products
$sql = "SELECT product_id, product_name, category, price, stock, status FROM products";
$result = $conn->query($sql);

$products = array();

if ($result) {
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }
} else {
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit;
}

echo json_encode($products);
$conn->close();
?>
