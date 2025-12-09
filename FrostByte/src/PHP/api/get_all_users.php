<?php
header('Content-Type: application/json');
session_start();

// Database connection
require_once '../db_connect.php';

// Check if user is authenticated and is superadmin
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// Check if user is superadmin
$check_role = "SELECT role FROM users WHERE user_id = '{$_SESSION['user_id']}'";
$result = $conn->query($check_role);
if (!$result || $result->num_rows === 0) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Forbidden']);
    exit;
}

$user = $result->fetch_assoc();
if ($user['role'] !== 'superadmin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Only superadmins can access this']);
    exit;
}

// Get filter parameters
$role_filter = isset($_GET['role']) ? $_GET['role'] : null;
$status_filter = isset($_GET['status']) ? $_GET['status'] : null;
$search = isset($_GET['search']) ? trim($_GET['search']) : null;

// Build query
$query = "SELECT user_id, fullname, email, gender, city, role, status, orders, total_spent, join_date, last_active FROM users WHERE 1=1";

// Apply filters
if ($role_filter && $role_filter !== 'allRoles') {
    $role_filter = $conn->real_escape_string($role_filter);
    $query .= " AND role = '$role_filter'";
}

if ($status_filter && $status_filter !== 'allStatus') {
    $status_filter = $conn->real_escape_string($status_filter);
    $query .= " AND status = '$status_filter'";
}

if ($search) {
    $search = $conn->real_escape_string($search);
    $query .= " AND (fullname LIKE '%$search%' OR email LIKE '%$search%')";
}

$query .= " ORDER BY join_date DESC";

$result = $conn->query($query);

if (!$result) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Query error: ' . $conn->error]);
    exit;
}

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

// Get statistics
$total_users = "SELECT COUNT(*) as count FROM users";
$active_users = "SELECT COUNT(*) as count FROM users WHERE status = 'active'";
$active_admins = "SELECT COUNT(*) as count FROM users WHERE role IN ('admin', 'superadmin') AND status = 'active'";

$total = $conn->query($total_users)->fetch_assoc()['count'];
$active = $conn->query($active_users)->fetch_assoc()['count'];
$admins = $conn->query($active_admins)->fetch_assoc()['count'];

echo json_encode([
    'success' => true,
    'data' => $users,
    'stats' => [
        'total_users' => $total,
        'active_users' => $active,
        'active_admins' => $admins
    ]
]);

$conn->close();
?>
