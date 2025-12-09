<?php
// Test move_uploaded_file directly
$source_file = 'C:/xampp/htdocs/FrostByte/resources/images/background.avif';
$dest_dir = 'C:/xampp/htdocs/FrostByte/resources/images/products/';
$dest_file = $dest_dir . 'test_direct_' . time() . '.avif';

echo "Source: $source_file\n";
echo "Source exists: " . (file_exists($source_file) ? 'YES' : 'NO') . "\n";
echo "Source readable: " . (is_readable($source_file) ? 'YES' : 'NO') . "\n";

echo "\nDest: $dest_file\n";
echo "Dest dir exists: " . (is_dir($dest_dir) ? 'YES' : 'NO') . "\n";
echo "Dest dir writable: " . (is_writable($dest_dir) ? 'YES' : 'NO') . "\n";

// Use copy instead of move_uploaded_file
if (copy($source_file, $dest_file)) {
    echo "\nSuccessfully copied file!\n";
    echo "File size: " . filesize($dest_file) . " bytes\n";
} else {
    echo "\nFailed to copy file\n";
}
?>
