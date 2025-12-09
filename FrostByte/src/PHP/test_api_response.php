<?php
// Direct API Response Test
header('Content-Type: application/json');

echo json_encode([
    'test' => 'API Response Test',
    'timestamp' => date('Y-m-d H:i:s'),
    'server' => php_uname(),
    'php_version' => phpversion(),
    'document_root' => $_SERVER['DOCUMENT_ROOT'],
    'get_products_url' => '/FrostByte/src/PHP/api/get_products.php',
    'test_page_url' => '/FrostByte/src/PHP/complete_system_test.html',
    'status' => 'Server is responding correctly'
], JSON_PRETTY_PRINT);
?>
