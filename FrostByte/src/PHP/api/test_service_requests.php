<?php
header('Content-Type: application/json');
session_start();

// Test if session is working
echo json_encode([
    'session_user_id' => $_SESSION['user_id'] ?? 'NOT SET',
    'session_data' => $_SESSION
]);
?>
