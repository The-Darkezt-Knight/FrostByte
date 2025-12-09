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

// Fetch products grouped by category
$sql = "SELECT product_id, product_name, category, price, stock, status, image_path FROM products WHERE stock > 0 ORDER BY category, product_id";
$result = $conn->query($sql);

$products = array();
$categorized = array();

if ($result) {
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $category = $row['category'];
            
            // Set status based on stock
            if ($row['stock'] == 0) {
                $row['status'] = 'out of stock';
            } else {
                $row['status'] = 'active';
            }
            
            // Format image path - handle spaces properly
            if ($row['image_path']) {
                // image_path from DB is like: resources/images/products/Ryzen 9 9600x.jpg
                // Convert to URL-safe path
                $row['image_path'] = '/FrostByte/' . $row['image_path'];
            } else {
                // Fallback to background image
                $row['image_path'] = '/FrostByte/resources/images/background.avif';
            }
            
            // Add to products list
            $products[] = $row;
            
            // Organize by category
            if (!isset($categorized[$category])) {
                $categorized[$category] = array();
            }
            $categorized[$category][] = $row;
        }
    }
} else {
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit;
}

echo json_encode([
    "all_products" => $products,
    "by_category" => $categorized
]);
$conn->close();
?>
