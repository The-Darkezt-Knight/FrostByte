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
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

// Set charset to utf8
$conn->set_charset("utf8");

// Get product ID from request
$product_id = $conn->real_escape_string($_GET['product_id'] ?? '');

if (empty($product_id)) {
    die(json_encode(["success" => false, "error" => "Product ID is required"]));
}

// Fetch product data
$sql = "SELECT product_id, product_name, category, price, stock, status, image_path FROM products WHERE product_id = '$product_id'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $product = $result->fetch_assoc();
    // Format image path - URL encode to handle spaces
    if ($product['image_path']) {
        $product['image_path'] = '/' . urlencode(str_replace('/', '___SLASH___', $product['image_path']));
        $product['image_path'] = str_replace('___SLASH___', '/', $product['image_path']);
    }
    echo json_encode($product);
} else {
    echo json_encode(["success" => false, "error" => "Product not found"]);
}

$conn->close();
?>
