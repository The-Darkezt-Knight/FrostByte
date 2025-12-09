<?php
// Debug file upload
error_reporting(E_ALL);
ini_set('display_errors', 1);

$upload_dir = __DIR__ . '/../../resources/images/products/';

echo "Upload directory: " . $upload_dir . "\n";
echo "Directory exists: " . (is_dir($upload_dir) ? 'YES' : 'NO') . "\n";
echo "Directory writable: " . (is_writable($upload_dir) ? 'YES' : 'NO') . "\n";

// Try to create a test file
$test_file = $upload_dir . 'test_' . time() . '.txt';
if (file_put_contents($test_file, 'test content')) {
    echo "Successfully wrote test file: $test_file\n";
    unlink($test_file);
    echo "Successfully deleted test file\n";
} else {
    echo "Failed to write test file: $test_file\n";
}

// List existing files
$files = @scandir($upload_dir);
echo "\nFiles in directory: " . count($files) . "\n";
if ($files) {
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            echo "  - $file\n";
        }
    }
}
?>
