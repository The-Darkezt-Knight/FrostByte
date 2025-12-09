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

// Helper function to resolve actual image path from product name
function resolveImagePath($productName) {
    $imageExtensions = array('.jpg', '.jpeg', '.png', '.avif', '.webp', '.gif');
    $baseDir = $_SERVER['DOCUMENT_ROOT'] . '/FrostByte/resources/images/products/';
    $basePath = '/FrostByte/resources/images/products/';
    
    if (empty($productName)) {
        return '/FrostByte/resources/images/background.avif';
    }
    
    $encodedName = urlencode($productName);
    
    // Try to find file with any of the supported extensions
    foreach ($imageExtensions as $ext) {
        // Try exact filename with extension
        $filePath = $baseDir . $productName . $ext;
        if (file_exists($filePath)) {
            return $basePath . $encodedName . $ext;
        }
    }
    
    // If no file found, return default with .jpg (frontend will handle gracefully)
    return $basePath . $encodedName . '.jpg';
}

// Fetch all products
$sql = "SELECT product_id, product_name, category, price, stock, status FROM products";
$result = $conn->query($sql);

$products = array();

if ($result) {
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            // Automatically set status based on stock
            if ($row['stock'] == 0) {
                $row['status'] = 'out of stock';
            } else {
                $row['status'] = 'active';
            }
            
            // Resolve actual image path for this product
            $row['image_path'] = resolveImagePath($row['product_name']);
            
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
