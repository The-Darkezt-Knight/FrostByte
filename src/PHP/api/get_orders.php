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

// Fetch all orders with customer and product information
$sql = "SELECT order_id, customer, product, amount, status, date FROM orders";
$result = $conn->query($sql);

$orders = array();

if ($result) {
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }
    }
} else {
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit;
}

echo json_encode($orders);
$conn->close();
?>
