<?php
// Test image path construction
$products = array(
    array('product_name' => 'Ryzen 9 9600x'),
    array('product_name' => 'RTX 4090'),
    array('product_name' => 'Logitech MX Master 3'),
    array('product_name' => 'Gaming Keyboard RGB'),
    array('product_name' => '4K Monitor 32inch'),
    array('product_name' => 'ASUS TUF B550-Plus'),
    array('product_name' => 'Cooler Master MWE 650W'),
    array('product_name' => 'Corsair Vengeance 16GB DDR4'),
    array('product_name' => 'Intel Core i7-12700F'),
    array('product_name' => 'Seagate Barracuda 2TB'),
);

echo "<h2>Image Path Construction Test</h2>";
echo "<table border='1' cellpadding='10'>";
echo "<tr><th>Product Name</th><th>File Extensions</th><th>Constructed Path</th><th>File Exists</th></tr>";

$basePath = 'C:/xampp/htdocs/FrostByte/resources/images/products/';

foreach ($products as $product) {
    $productName = $product['product_name'];
    $encodedName = urlencode($productName);
    $constructedPath = "/FrostByte/resources/images/products/{$encodedName}.jpg";
    
    // Check different extensions
    $extensions = array('.jpg', '.avif', '.png', '.webp');
    $foundFiles = array();
    
    foreach ($extensions as $ext) {
        $filePath = $basePath . $productName . $ext;
        if (file_exists($filePath)) {
            $foundFiles[] = $ext;
        }
    }
    
    $fileStatus = count($foundFiles) > 0 ? 'YES (' . implode(', ', $foundFiles) . ')' : 'NO';
    
    echo "<tr>";
    echo "<td>{$productName}</td>";
    echo "<td>" . implode(', ', $foundFiles) . "</td>";
    echo "<td>{$constructedPath}</td>";
    echo "<td>{$fileStatus}</td>";
    echo "</tr>";
}

echo "</table>";

// Also check what files actually exist in the directory
echo "<h2>Files in Product Directory</h2>";
echo "<ul>";
$files = scandir($basePath);
foreach ($files as $file) {
    if ($file !== '.' && $file !== '..') {
        echo "<li>{$file}</li>";
    }
}
echo "</ul>";
?>
