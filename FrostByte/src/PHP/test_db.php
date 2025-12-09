<?php
require_once 'db_connect.php';

// Test database connection
if ($conn->connect_error) {
    echo "Connection failed: " . $conn->connect_error;
} else {
    echo "Connected successfully!<br>";
    
    // Check if service_requests table exists
    $result = $conn->query("SHOW TABLES LIKE 'service_requests'");
    if ($result->num_rows > 0) {
        echo "service_requests table EXISTS<br>";
        
        // Show table structure
        $schema = $conn->query("DESCRIBE service_requests");
        echo "<pre>";
        while ($row = $schema->fetch_assoc()) {
            print_r($row);
        }
        echo "</pre>";
    } else {
        echo "service_requests table DOES NOT EXIST - need to run SQL<br>";
    }
    
    // Check if service_request_history table exists
    $result = $conn->query("SHOW TABLES LIKE 'service_request_history'");
    if ($result->num_rows > 0) {
        echo "service_request_history table EXISTS<br>";
    } else {
        echo "service_request_history table DOES NOT EXIST - need to run SQL<br>";
    }
}

$conn->close();
?>
