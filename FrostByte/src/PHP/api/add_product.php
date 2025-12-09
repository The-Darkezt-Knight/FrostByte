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

// Get POST data
$product_name = $conn->real_escape_string($_POST['productname'] ?? '');
$category = $conn->real_escape_string($_POST['category'] ?? '');
$quantity = intval($_POST['quantity'] ?? 0);
$price = floatval($_POST['price'] ?? 0);
$mode = $_POST['mode'] ?? 'add';  // 'add' or 'edit'
$edit_product_id = $conn->real_escape_string($_POST['product_id'] ?? '');

// Validate input
if (empty($product_name) || empty($category) || $quantity <= 0 || $price <= 0) {
    die(json_encode(["success" => false, "error" => "All fields are required and must be valid"]));
}

// Handle image upload
$image_path = null;
if (!empty($_FILES['product_image']['name'])) {
    // Define upload directory using absolute path
    $upload_dir = realpath(__DIR__ . '/../../') . '/resources/images/products/';
    
    // Create directory if it doesn't exist
    if (!is_dir($upload_dir)) {
        if (!mkdir($upload_dir, 0755, true)) {
            die(json_encode(["success" => false, "error" => "Failed to create upload directory: $upload_dir"]));
        }
    }
    
    // Validate file
    $file_name = $_FILES['product_image']['name'];
    $file_tmp = $_FILES['product_image']['tmp_name'];
    $file_error = $_FILES['product_image']['error'];
    $file_size = $_FILES['product_image']['size'];
    
    // File validation
    $allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
    $max_file_size = 5 * 1024 * 1024; // 5MB
    
    if ($file_error !== UPLOAD_ERR_OK) {
        die(json_encode(["success" => false, "error" => "File upload error: " . $file_error]));
    }
    
    if ($file_size > $max_file_size) {
        die(json_encode(["success" => false, "error" => "File size exceeds 5MB limit"]));
    }
    
    // Check MIME type
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime_type = finfo_file($finfo, $file_tmp);
    finfo_close($finfo);
    
    if (!in_array($mime_type, $allowed_types)) {
        die(json_encode(["success" => false, "error" => "Invalid file type. Only JPG, PNG, GIF, WebP allowed"]));
    }
    
    // Generate filename based on product name
    $file_ext = pathinfo($file_name, PATHINFO_EXTENSION);
    $safe_product_name = preg_replace('/[^a-zA-Z0-9\s\-]/', '', $product_name);
    $unique_name = trim($safe_product_name) . '.' . $file_ext;
    $file_path = $upload_dir . $unique_name;
    
    // Move uploaded file
    if (is_uploaded_file($file_tmp) && copy($file_tmp, $file_path)) {
        // Store relative path for database
        $image_path = 'resources/images/products/' . $unique_name;
    } else {
        die(json_encode(["success" => false, "error" => "Failed to save uploaded file"]));
    }
}

// Check if product exists with same name and category
$check_sql = "SELECT product_id, stock FROM products WHERE product_name = '$product_name' AND category = '$category'";
$check_result = $conn->query($check_sql);

// Handle edit mode
if ($mode === 'edit' && !empty($edit_product_id)) {
    // Update existing product
    $update_sql = "UPDATE products SET product_name = '$product_name', category = '$category', price = $price, stock = $quantity";
    
    if ($image_path) {
        $image_path = $conn->real_escape_string($image_path);
        $update_sql .= ", image_path = '$image_path'";
    }
    
    $update_sql .= " WHERE product_id = '$edit_product_id'";
    
    if ($conn->query($update_sql)) {
        echo json_encode([
            "success" => true, 
            "message" => "Product updated successfully",
            "product_id" => $edit_product_id
        ]);
    } else {
        echo json_encode(["success" => false, "error" => "Update failed: " . $conn->error]);
    }
} elseif ($check_result && $check_result->num_rows > 0) {
    // Product exists - update stock
    $row = $check_result->fetch_assoc();
    $product_id = $row['product_id'];
    $new_stock = $row['stock'] + $quantity;
    
    // Update with image_path if provided
    $update_sql = "UPDATE products SET stock = $new_stock";
    if ($image_path) {
        $image_path = $conn->real_escape_string($image_path);
        $update_sql .= ", image_path = '$image_path'";
    }
    $update_sql .= " WHERE product_id = '$product_id'";
    
    if ($conn->query($update_sql)) {
        echo json_encode([
            "success" => true, 
            "message" => "Product stock updated successfully",
            "product_id" => $product_id
        ]);
    } else {
        echo json_encode(["success" => false, "error" => "Update failed: " . $conn->error]);
    }
} else {
    // Product doesn't exist - generate new product ID and insert
    $max_id_sql = "SELECT MAX(CAST(SUBSTRING(product_id, 6) AS UNSIGNED)) as max_id FROM products WHERE product_id LIKE 'PROD-%'";
    $max_id_result = $conn->query($max_id_sql);
    $max_id_row = $max_id_result->fetch_assoc();
    
    $next_num = ($max_id_row['max_id'] ?? 0) + 1;
    $product_id = "PROD-" . str_pad($next_num, 3, "0", STR_PAD_LEFT);
    
    // Set default status to 'active'
    $status = 'active';
    
    // Prepare image_path for insert
    $image_path_sql = "NULL";
    if ($image_path) {
        $image_path = $conn->real_escape_string($image_path);
        $image_path_sql = "'$image_path'";
    }
    
    $insert_sql = "INSERT INTO products (product_id, product_name, category, price, stock, status, image_path) 
                   VALUES ('$product_id', '$product_name', '$category', $price, $quantity, '$status', $image_path_sql)";
    
    if ($conn->query($insert_sql)) {
        echo json_encode([
            "success" => true, 
            "message" => "Product added successfully",
            "product_id" => $product_id
        ]);
    } else {
        echo json_encode(["success" => false, "error" => "Insert failed: " . $conn->error]);
    }
}

$conn->close();
?>
