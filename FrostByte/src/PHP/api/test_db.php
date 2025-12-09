<?php
header('Content-Type: application/json');

// Simple database test
require_once '../db_connect.php';

if (!$conn) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Test 1: Check if table exists
$result = $conn->query("SHOW TABLES LIKE 'service_requests'");
$tableExists = $result->num_rows > 0;

// Test 2: Get table structure
$columns = $conn->query("DESCRIBE service_requests");
$columnData = [];
if ($columns) {
    while ($row = $columns->fetch_assoc()) {
        $columnData[] = $row;
    }
}

// Test 3: Count total records
$countResult = $conn->query("SELECT COUNT(*) as count FROM service_requests");
$count = $countResult->fetch_assoc();

echo json_encode([
    'table_exists' => $tableExists,
    'columns' => $columnData,
    'total_records' => $count,
    'test' => 'success'
]);

$conn->close();
?>
