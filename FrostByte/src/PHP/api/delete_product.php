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
$product_id = $conn->real_escape_string($_POST['product_id'] ?? '');

if (empty($product_id)) {
    die(json_encode(["success" => false, "error" => "Product ID is required"]));
}

// Get the product image path before deletion (to delete the file)
$select_sql = "SELECT image_path FROM products WHERE product_id = '$product_id'";
$select_result = $conn->query($select_sql);

if ($select_result && $select_result->num_rows > 0) {
    $product = $select_result->fetch_assoc();
    $image_path = $product['image_path'];
    
    // Delete the product from database
    $delete_sql = "DELETE FROM products WHERE product_id = '$product_id'";
    
    if ($conn->query($delete_sql)) {
        // Delete the image file if it exists
        if ($image_path) {
            $file_path = __DIR__ . '/../../' . $image_path;
            if (file_exists($file_path)) {
                unlink($file_path);
            }
        }
        
        echo json_encode([
            "success" => true,
            "message" => "Product deleted successfully"
        ]);
    } else {
        echo json_encode(["success" => false, "error" => "Delete failed: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Product not found"]);
}

$conn->close();
?>
