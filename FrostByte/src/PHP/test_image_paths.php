<?php
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "frostbyte";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$conn->set_charset("utf8");

// Get ALL product data including image_path
$sql = "SELECT product_id, product_name, category, price, stock, status, image_path FROM products";
$result = $conn->query($sql);

$products = array();
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = array(
            'product_id' => $row['product_id'],
            'product_name' => $row['product_name'],
            'category' => $row['category'],
            'price' => $row['price'],
            'stock' => $row['stock'],
            'status' => $row['status'],
            'image_path' => $row['image_path'],
            'image_path_type' => gettype($row['image_path']),
            'image_path_empty' => empty($row['image_path']),
            'constructed_path' => '/FrostByte/resources/images/products/' . urlencode($row['product_name']) . '.jpg'
        );
    }
}

$conn->close();

echo json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
?>
