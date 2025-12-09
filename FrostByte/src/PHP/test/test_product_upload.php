<?php
// Test product upload functionality

header('Content-Type: application/json');

// Test data
$testProduct = [
    'productname' => 'Test Gaming Monitor ' . time(),  // Add timestamp for uniqueness
    'category' => 'Monitor',
    'quantity' => '5',
    'price' => '499.99',
    'mode' => 'add'
];

// Copy background image to temp location for upload
$testImagePath = 'C:/xampp/htdocs/FrostByte/resources/images/background.avif';
$tempImagePath = sys_get_temp_dir() . '/test_product_image_' . time() . '.avif';

if (!file_exists($testImagePath)) {
    die(json_encode(["success" => false, "error" => "Test image not found at: $testImagePath"]));
}

if (!copy($testImagePath, $tempImagePath)) {
    die(json_encode(["success" => false, "error" => "Failed to copy test image"]));
}

// Prepare multipart form data
$boundary = '----WebKitFormBoundary' . bin2hex(random_bytes(16));
$body = '';

// Add form fields
foreach ($testProduct as $key => $value) {
    $body .= "--" . $boundary . "\r\n";
    $body .= "Content-Disposition: form-data; name=\"" . $key . "\"\r\n\r\n";
    $body .= $value . "\r\n";
}

// Add file
$body .= "--" . $boundary . "\r\n";
$body .= "Content-Disposition: form-data; name=\"product_image\"; filename=\"test_image.avif\"\r\n";
$body .= "Content-Type: image/avif\r\n\r\n";
$body .= file_get_contents($tempImagePath) . "\r\n";
$body .= "--" . $boundary . "--\r\n";

// Make request
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost/FrostByte/src/PHP/api/add_product.php');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: multipart/form-data; boundary=' . $boundary
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Clean up temp file
unlink($tempImagePath);

// Return results
echo json_encode([
    "success" => true,
    "message" => "Test completed",
    "http_code" => $httpCode,
    "response" => json_decode($response, true)
]);
?>
