-- Fresh FrostByte Database Schema
-- Updated with proper service_requests and technician_schedule structure
-- Generated: December 9, 2025

-- Drop existing database
DROP DATABASE IF EXISTS `frostbyte`;

-- Create database
CREATE DATABASE `frostbyte` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `frostbyte`;

-- ========================================
-- 1. USERS TABLE (Core)
-- ========================================
CREATE TABLE `users` (
  `user_id` varchar(50) NOT NULL PRIMARY KEY,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `role` enum('superadmin','admin','technician','user') DEFAULT 'user',
  `status` enum('active','suspended','onReview') DEFAULT 'active',
  `orders` int(11) DEFAULT 0,
  `total_spent` decimal(10,2) DEFAULT 0.00,
  `join_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_active` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `idx_email` (`email`),
  KEY `idx_role` (`role`),
  KEY `idx_status` (`status`),
  KEY `idx_join_date` (`join_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 2. PRODUCTS TABLE
-- ========================================
CREATE TABLE `products` (
  `product_id` varchar(50) NOT NULL PRIMARY KEY,
  `product_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `status` enum('active','inactive','discontinued') DEFAULT 'active',
  `image_path` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `idx_category` (`category`),
  KEY `idx_status` (`status`),
  FULLTEXT KEY `ft_search` (`product_name`,`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 3. ORDERS TABLE
-- ========================================
CREATE TABLE `orders` (
  `order_id` varchar(50) NOT NULL PRIMARY KEY,
  `user_id` varchar(50) DEFAULT NULL,
  `customer` varchar(100) DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `product_id` varchar(50) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `status` enum('pending','processing','shipped','delivered','cancelled','refunded') DEFAULT 'pending',
  `payment_method` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT 'pending',
  `shipping_address` text DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `product_id` (`product_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_status` (`status`),
  KEY `idx_date` (`date`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 4. SERVICE REQUESTS TABLE (Updated)
-- ========================================
CREATE TABLE `service_requests` (
  `request_id` varchar(50) NOT NULL PRIMARY KEY,
  `customer_id` varchar(50) NOT NULL,
  `service_type` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `priority` enum('Low','Medium','High','Critical') DEFAULT 'Medium',
  `status` enum('Pending','Scheduled','In Progress','Completed','Cancelled') DEFAULT 'Pending',
  `location` varchar(255) DEFAULT NULL,
  `preferred_date` date DEFAULT NULL,
  `preferred_time` time DEFAULT NULL,
  `confirmed_date` date DEFAULT NULL,
  `confirmed_time` time DEFAULT NULL,
  `assigned_technician_id` varchar(50) DEFAULT NULL,
  `assigned_by` varchar(50) DEFAULT NULL,
  `scheduled_at` timestamp NULL DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `idx_customer_id` (`customer_id`),
  KEY `idx_assigned_technician_id` (`assigned_technician_id`),
  KEY `idx_assigned_by` (`assigned_by`),
  KEY `idx_status` (`status`),
  KEY `idx_priority` (`priority`),
  KEY `idx_scheduled_at` (`scheduled_at`),
  FOREIGN KEY (`customer_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`assigned_technician_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL,
  FOREIGN KEY (`assigned_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 5. TECHNICIAN SCHEDULE TABLE (Updated)
-- ========================================
CREATE TABLE `technician_schedule` (
  `schedule_id` varchar(50) NOT NULL PRIMARY KEY,
  `service_request_id` varchar(50) NOT NULL,
  `technician_id` varchar(50) NOT NULL,
  `scheduled_date` date NOT NULL,
  `scheduled_time` time NOT NULL,
  `status` enum('scheduled','in_progress','completed','cancelled') DEFAULT 'scheduled',
  `completion_notes` text DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `idx_technician_date` (technician_id, scheduled_date),
  KEY `idx_service` (service_request_id),
  KEY `idx_status` (status),
  FOREIGN KEY (`service_request_id`) REFERENCES `service_requests`(`request_id`) ON DELETE CASCADE,
  FOREIGN KEY (`technician_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 6. SERVICE REQUEST HISTORY TABLE
-- ========================================
CREATE TABLE `service_request_history` (
  `history_id` varchar(50) NOT NULL PRIMARY KEY,
  `request_id` varchar(50) NOT NULL,
  `old_status` varchar(50) DEFAULT NULL,
  `new_status` varchar(50) NOT NULL,
  `changed_by` varchar(50) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  KEY `idx_request_id` (`request_id`),
  KEY `changed_by` (`changed_by`),
  FOREIGN KEY (`request_id`) REFERENCES `service_requests`(`request_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 7. SELL PARTS REQUESTS TABLE
-- ========================================
CREATE TABLE `sell_parts_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `request_id` varchar(50) NOT NULL UNIQUE,
  `user_id` varchar(50),
  `customer_name` varchar(100) NOT NULL,
  `part_name` varchar(150) NOT NULL,
  `category` varchar(50) NOT NULL,
  `condition` varchar(30) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `description` longtext DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `image_path_1` varchar(255) DEFAULT NULL,
  `image_path_2` varchar(255) DEFAULT NULL,
  `image_path_3` varchar(255) DEFAULT NULL,
  `image_path_4` varchar(255) DEFAULT NULL,
  `status` enum('pending','processing','approved','rejected','archived') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- ========================================
-- 8. SYSTEM CONFIG TABLE
-- ========================================
CREATE TABLE `system_config` (
  `config_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `config_key` varchar(100) NOT NULL UNIQUE,
  `config_value` text DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 9. SYSTEM LOGS TABLE
-- ========================================
CREATE TABLE `system_logs` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `error_id` varchar(50) DEFAULT NULL,
  `error_type` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `resolved` tinyint(1) DEFAULT 0,
  KEY `idx_error_type` (`error_type`),
  KEY `idx_timestamp` (`timestamp`),
  KEY `idx_resolved` (`resolved`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 10. DATABASE TABLES INFO TABLE
-- ========================================
CREATE TABLE `database_tables_info` (
  `table_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `table_name` varchar(100) UNIQUE,
  `row_count` int(11) DEFAULT 0,
  `table_size` varchar(50) DEFAULT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 11. VIEWS
-- ========================================
CREATE VIEW `customer_stats` AS
SELECT 
  u.user_id,
  u.fullname AS name,
  u.email,
  COUNT(o.order_id) AS orders,
  COALESCE(SUM(o.amount), 0) AS total_spent,
  u.join_date,
  u.status
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE u.role IN ('user', 'technician')
GROUP BY u.user_id, u.fullname, u.email, u.join_date, u.status;

CREATE VIEW `order_stats` AS
SELECT 
  CAST(o.date AS DATE) AS order_date,
  COUNT(o.order_id) AS total_orders,
  SUM(o.amount) AS daily_revenue,
  o.status
FROM orders o
GROUP BY CAST(o.date AS DATE), o.status;

CREATE VIEW `product_stats` AS
SELECT 
  p.product_id,
  p.product_name,
  p.category,
  p.price,
  p.stock,
  COUNT(o.order_id) AS times_ordered,
  SUM(o.quantity) AS total_quantity_sold
FROM products p
LEFT JOIN orders o ON p.product_id = o.product_id
GROUP BY p.product_id, p.product_name, p.category, p.price, p.stock;

-- ========================================
-- 12. SEED DATA - USERS
-- ========================================
INSERT INTO `users` (`user_id`, `fullname`, `email`, `password`, `gender`, `city`, `role`, `status`, `orders`, `total_spent`, `join_date`, `created_at`, `updated_at`) VALUES
-- Super Admin
('USR-001', 'Jose Raphael Pido', 'jose@frostbyte.com', '123123', 'Male', 'Manila', 'superadmin', 'active', 0, 0.00, '2025-12-02 15:04:05', '2025-12-02 15:04:05', '2025-12-05 10:53:17'),
-- Admins (Support Staff)
('USR-002', 'Gwyneth Hilary Laurino', 'gwyneth@frostbyte.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Female', 'Cebu', 'admin', 'active', 0, 0.00, '2025-12-02 15:04:05', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('USR-12472e7cf440', 'Admin User', 'admin@frostbyte.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Admin City', 'admin', 'active', 0, 0.00, '2025-12-05 14:30:11', '2025-12-05 14:30:11', '2025-12-05 14:30:11'),
-- Technicians
('USR-005', 'Michael Brown', 'michael@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Male', 'Chicago', 'technician', 'active', 0, 0.00, '2025-11-02 15:04:05', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('USR-006', 'Sarah Johnson', 'sarah.johnson@frostbyte.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Female', 'Bacolod', 'technician', 'active', 0, 0.00, '2025-11-15 15:04:05', '2025-11-15 15:04:05', '2025-11-15 15:04:05'),
('USR-007', 'John Smith', 'john.smith@frostbyte.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Male', 'Cebu', 'technician', 'active', 0, 0.00, '2025-11-20 15:04:05', '2025-11-20 15:04:05', '2025-11-20 15:04:05'),
('USR-008', 'Maria Santos', 'maria.santos@frostbyte.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Female', 'Manila', 'technician', 'active', 0, 0.00, '2025-12-01 15:04:05', '2025-12-01 15:04:05', '2025-12-01 15:04:05'),
-- Regular Users/Customers
('USR-003', 'John Doe', 'john@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Male', 'New York', 'user', 'active', 0, 0.00, '2025-09-02 15:04:05', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('USR-004', 'Sarah Chen', 'sarah@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Female', 'Los Angeles', 'user', 'active', 0, 0.00, '2025-06-02 15:04:05', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('USR-6932b62dcdaf0', 'Traumerei Lopobia', 'traum@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Bacolod', 'user', 'active', 0, 0.00, '2025-12-05 03:38:37', '2025-12-05 03:38:37', '2025-12-05 03:38:37'),
('USR-6932b7e5bfc26', 'John Bryan Pinaga', 'bry@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Murcia', 'user', 'active', 0, 0.00, '2025-12-05 03:45:57', '2025-12-05 03:45:57', '2025-12-05 03:45:57'),
('USR-6933e0d9e252b', 'Glenn Dale Gealon', 'gert@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Bacolod', 'user', 'active', 0, 0.00, '2025-12-06 00:52:57', '2025-12-06 00:52:57', '2025-12-06 00:52:57'),
('USR-6933ecd17815c', 'Joseph Dela Rama', 'joseph@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Talisay', 'user', 'active', 0, 0.00, '2025-12-06 01:44:01', '2025-12-06 01:44:01', '2025-12-06 01:44:01'),
('USR-6933f7266eb3c', 'Vicente Dimagiba', 'vince@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Bacolod', 'user', 'active', 0, 0.00, '2025-12-06 02:28:06', '2025-12-06 02:28:06', '2025-12-06 02:28:06');

-- ========================================
-- 13. SEED DATA - PRODUCTS
-- ========================================
INSERT INTO `products` (`product_id`, `product_name`, `description`, `category`, `price`, `stock`, `status`, `image_path`, `created_at`, `updated_at`) VALUES
('PROD-001', 'Ryzen 9 9600x', 'High-performance processor', 'Processor', 28000.00, 16, 'active', 'resources/images/products/Ryzen 9 9600x.jpg', '2025-12-02 15:04:05', '2025-12-05 09:14:05'),
('PROD-002', 'RTX 4090', 'Premium graphics card', 'Graphics Card', 85000.00, 0, 'active', 'resources/images/products/RTX 4090.jpg', '2025-12-02 15:04:05', '2025-12-04 15:06:42'),
('PROD-003', 'Gaming Keyboard RGB', 'Mechanical gaming keyboard with RGB lighting', 'Keyboards', 5000.00, 12, 'active', 'resources/images/products/Gaming Keyboard RGB.jpg', '2025-12-02 15:04:05', '2025-12-05 09:14:05'),
('PROD-004', 'Logitech MX Master 3', 'Professional mouse', 'Mouse', 4500.00, 8, 'active', 'resources/images/products/Logitech MX Master 3.jpg', '2025-12-02 15:04:05', '2025-12-06 15:07:21'),
('PROD-006', 'Intel Core i7-12700F', NULL, 'Processor', 19990.00, 23, 'active', 'resources/images/products/Intel Core i7-12700F.jpg', '2025-12-03 17:54:22', '2025-12-04 13:37:20'),
('PROD-007', 'ASUS TUF B550-Plus', NULL, 'Motherboard', 8990.00, 9, 'active', 'resources/images/products/ASUS TUF B550-Plus.jpg', '2025-12-04 03:06:44', '2025-12-05 14:19:19'),
('PROD-008', 'Corsair Vengeance 16GB DDR4', NULL, 'Memory', 3450.00, 37, 'active', 'resources/images/products/Corsair Vengeance 16GB DDR4.jpg', '2025-12-04 07:24:42', '2025-12-06 10:16:36'),
('PROD-009', 'Cooler Master MWE 650W', NULL, 'Power Supply', 2850.00, 13, 'active', 'resources/images/products/Cooler Master MWE 650W.jpg', '2025-12-04 14:39:26', '2025-12-05 09:14:05'),
('PROD-010', 'Seagate Barracuda 2TB', NULL, 'HDD', 3290.00, 24, 'active', 'resources/images/products/Seagate Barracuda 2TB.jpg', '2025-12-04 14:54:22', '2025-12-06 07:56:37');

-- ========================================
-- 14. SEED DATA - SERVICE REQUESTS (Example)
-- ========================================
INSERT INTO `service_requests` (`request_id`, `customer_id`, `service_type`, `description`, `priority`, `status`, `location`, `preferred_date`, `preferred_time`, `created_at`, `updated_at`) VALUES
('SRV-20251209001', 'USR-6932b7e5bfc26', 'PC Assembly', 'Customer needs PC assembly and configuration', 'Medium', 'Pending', 'Murcia', '2025-12-12', '14:00:00', '2025-12-09 09:20:46', '2025-12-09 09:20:46'),
('SRV-20251209002', 'USR-6933e0d9e252b', 'Repairs', 'Computer motherboard repair needed', 'High', 'Pending', 'Bacolod', '2025-12-13', '10:00:00', '2025-12-09 10:15:20', '2025-12-09 10:15:20');

-- ========================================
-- 15. SEED DATA - SYSTEM CONFIG
-- ========================================
INSERT INTO `system_config` (`config_key`, `config_value`, `description`, `created_at`, `updated_at`) VALUES
('site_name', 'FrostByte', 'Application site name', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('site_url', 'http://localhost/FrostByte', 'Application URL', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('default_language', 'english', 'Default language', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('currency', 'PHP', 'Default currency', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('timezone', 'UTC+8', 'System timezone', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('maintenance_mode', '0', 'Maintenance mode flag', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('max_upload_size', '10485760', 'Max file upload size in bytes', '2025-12-02 15:04:05', '2025-12-02 15:04:05');

COMMIT;
