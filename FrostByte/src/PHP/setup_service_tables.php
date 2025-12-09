<?php
require_once 'db_connect.php';

// SQL for service_requests table
$createServiceRequestsSQL = "
CREATE TABLE IF NOT EXISTS `service_requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(50) NOT NULL,
  `service_type` varchar(100) NOT NULL,
  `description` longtext,
  `priority` enum('Low','Medium','High','Critical') DEFAULT 'Medium',
  `status` enum('Pending','Scheduled','In Progress','Completed','Cancelled') DEFAULT 'Pending',
  `location` varchar(255) NOT NULL,
  `preferred_date` date NOT NULL,
  `preferred_time` time NOT NULL,
  `assigned_technician_id` int,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`request_id`),
  KEY `customer_id` (`customer_id`),
  KEY `status` (`status`),
  KEY `priority` (`priority`),
  FOREIGN KEY (`customer_id`) REFERENCES `users`(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

// SQL for service_request_history table
$createHistorySQL = "
CREATE TABLE IF NOT EXISTS `service_request_history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `request_id` int NOT NULL,
  `action` varchar(100) NOT NULL,
  `notes` longtext,
  `updated_by` varchar(100),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`history_id`),
  KEY `request_id` (`request_id`),
  FOREIGN KEY (`request_id`) REFERENCES `service_requests`(`request_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

$errors = [];

// Execute service_requests table creation
if (!$conn->query($createServiceRequestsSQL)) {
    $errors[] = "Error creating service_requests table: " . $conn->error;
} else {
    echo "✓ service_requests table created/verified<br>";
}

// Execute service_request_history table creation
if (!$conn->query($createHistorySQL)) {
    $errors[] = "Error creating service_request_history table: " . $conn->error;
} else {
    echo "✓ service_request_history table created/verified<br>";
}

if (count($errors) > 0) {
    echo "<h2>Errors:</h2>";
    foreach ($errors as $error) {
        echo "✗ " . $error . "<br>";
    }
} else {
    echo "<h2 style=\"color: green;\">All tables created/verified successfully!</h2>";
}

$conn->close();
?>
