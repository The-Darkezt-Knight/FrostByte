<?php
// Test service request creation
require_once 'db_connect.php';

// Simulate a session user
$_SESSION['user_id'] = 'USR-001';

// Test data
$service_type = 'pc-assembly';
$description = 'Test booking';
$priority = 'Medium';
$location = 'Test Address';
$preferred_date = '2025-12-15';
$preferred_time = '14:00';
$status = 'Pending';

// Insert test record
$sql = "INSERT INTO service_requests 
        (customer_id, service_type, description, priority, status, location, preferred_date, preferred_time, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    die("Prepare failed: " . mysqli_error($conn));
}

$customer_id = 'USR-001';
mysqli_stmt_bind_param($stmt, 'isssssss', $customer_id, $service_type, $description, $priority, $status, $location, $preferred_date, $preferred_time);

if (mysqli_stmt_execute($stmt)) {
    $request_id = mysqli_insert_id($conn);
    echo "✓ Test service request created successfully! Request ID: " . $request_id . "<br>";
    echo "<a href='/FrostByte/src/PHP/customer.php'>Go to Customer Page</a>";
} else {
    echo "✗ Error: " . mysqli_error($conn);
}

mysqli_stmt_close($stmt);
$conn->close();
?>
