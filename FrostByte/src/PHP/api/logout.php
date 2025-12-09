<?php
// Start session FIRST before any output
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/auth_errors.log');

error_log('=== LOGOUT INITIATED ===');
error_log('Session ID: ' . session_id());
error_log('Session status before destroy: ' . session_status());

// Store session ID before destroying
$session_id = session_id();

// Unset all session variables one by one
if (isset($_SESSION)) {
    foreach ($_SESSION as $key => $value) {
        error_log('Unsetting session variable: ' . $key);
        unset($_SESSION[$key]);
    }
}

// Clear the session array
$_SESSION = array();
error_log('Session array cleared');

// Destroy the session
session_destroy();
error_log('Session destroyed. Status: ' . session_status());

// Clear the session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
    error_log('Session cookie cleared');
}

// Set cache control headers to prevent caching
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('Expires: 0');

error_log('=== LOGOUT COMPLETE ===');

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Logged out successfully'
]);
?>
