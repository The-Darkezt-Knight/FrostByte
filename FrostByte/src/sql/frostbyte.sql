-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2025 at 08:36 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `frostbyte`
--

-- --------------------------------------------------------

--
-- Table structure for table `buyback_requests`
--

CREATE TABLE `buyback_requests` (
  `id` int(11) NOT NULL,
  `request_id` varchar(20) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `component_name` varchar(255) NOT NULL,
  `component_category` varchar(100) DEFAULT NULL,
  `condition` varchar(50) NOT NULL,
  `user_expected_price` decimal(10,2) NOT NULL,
  `our_offer_price` decimal(10,2) DEFAULT NULL,
  `status` enum('Pending Review','Offer Sent','Negotiating','Accepted','Rejected','Completed') DEFAULT 'Pending Review',
  `offer_message` longtext DEFAULT NULL,
  `notes` longtext DEFAULT NULL,
  `submitted_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `approved_by` int(11) DEFAULT NULL,
  `approved_date` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `customer_stats`
-- (See below for the actual view)
--
CREATE TABLE `customer_stats` (
`user_id` varchar(50)
,`name` varchar(100)
,`email` varchar(100)
,`orders` bigint(21)
,`total_spent` decimal(32,2)
,`join_date` timestamp
,`status` enum('active','suspended','onReview')
);

-- --------------------------------------------------------

--
-- Table structure for table `database_tables_info`
--

CREATE TABLE `database_tables_info` (
  `table_id` int(11) NOT NULL,
  `table_name` varchar(100) DEFAULT NULL,
  `row_count` int(11) DEFAULT 0,
  `table_size` varchar(50) DEFAULT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` varchar(50) NOT NULL,
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `customer`, `product`, `product_id`, `amount`, `quantity`, `status`, `payment_method`, `phone`, `email`, `company_name`, `payment_status`, `shipping_address`, `date`, `created_at`, `updated_at`) VALUES
('ORD-1765252263-0', 'USR-6932b7e5bfc26', 'Bryan', 'Gaming Keyboard RGB', 'PROD-003', 5000.00, 1, 'processing', 'cod', '09123456789', 'bry@gmail.com', '', 'pending', 'Baris, Brgy. Abo Abo, Bacolod', '2025-12-08 20:51:03', '2025-12-08 20:51:03', '2025-12-09 03:52:02'),
('ORD-1765257898-0', 'USR-6937b26996652', 'Alvin', 'Seagate Barracuda 2TB', 'PROD-010', 3290.00, 1, 'processing', 'cod', '09123456789', 'alvin@gmail.com', '', 'pending', 'Baris, Brgy. Mailum, Kabankalan', '2025-12-08 22:24:58', '2025-12-08 22:24:58', '2025-12-09 05:27:24');

-- --------------------------------------------------------

--
-- Stand-in structure for view `order_stats`
-- (See below for the actual view)
--
CREATE TABLE `order_stats` (
`order_date` date
,`total_orders` bigint(21)
,`daily_revenue` decimal(32,2)
,`status` enum('pending','processing','shipped','delivered','cancelled','refunded')
);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` varchar(50) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `status` enum('active','inactive','discontinued') DEFAULT 'active',
  `image_path` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `description`, `category`, `price`, `stock`, `status`, `image_path`, `image_url`, `created_at`, `updated_at`) VALUES
('PROD-001', 'Ryzen 9 9600x', 'High-performance processor', 'Processor', 28000.00, 16, 'active', 'resources/images/products/Ryzen 9 9600x.jpg', NULL, '2025-12-02 15:04:05', '2025-12-05 09:14:05'),
('PROD-002', 'RTX 4090', 'Premium graphics card', 'Graphics Card', 85000.00, 0, 'active', 'resources/images/products/RTX 4090.jpg', NULL, '2025-12-02 15:04:05', '2025-12-04 15:06:42'),
('PROD-003', 'Gaming Keyboard RGB', 'Mechanical gaming keyboard with RGB lighting', 'Keyboards', 5000.00, 11, 'active', 'resources/images/products/Gaming Keyboard RGB.jpg', NULL, '2025-12-02 15:04:05', '2025-12-09 03:51:03'),
('PROD-004', 'Logitech MX Master 3', 'Professional mouse', 'Mouse', 4500.00, 8, 'active', 'resources/images/products/Logitech MX Master 3.jpg', NULL, '2025-12-02 15:04:05', '2025-12-06 15:07:21'),
('PROD-006', 'Intel Core i7-12700F', NULL, 'Processor', 19990.00, 23, 'active', 'resources/images/products/Intel Core i7-12700F.jpg', NULL, '2025-12-03 17:54:22', '2025-12-04 13:37:20'),
('PROD-007', 'ASUS TUF B550-Plus', NULL, 'Motherboard', 8990.00, 9, 'active', 'resources/images/products/ASUS TUF B550-Plus.jpg', NULL, '2025-12-04 03:06:44', '2025-12-05 14:19:19'),
('PROD-008', 'Corsair Vengeance 16GB DDR4', NULL, 'Memory', 3450.00, 37, 'active', 'resources/images/products/Corsair Vengeance 16GB DDR4.jpg', NULL, '2025-12-04 07:24:42', '2025-12-06 10:16:36'),
('PROD-009', 'Cooler Master MWE 650W', NULL, 'Power Supply', 2850.00, 13, 'active', 'resources/images/products/Cooler Master MWE 650W.jpg', NULL, '2025-12-04 14:39:26', '2025-12-05 09:14:05'),
('PROD-010', 'Seagate Barracuda 2TB', NULL, 'HDD', 3290.00, 23, 'active', 'resources/images/products/Seagate Barracuda 2TB.jpg', NULL, '2025-12-04 14:54:22', '2025-12-09 05:24:58');

-- --------------------------------------------------------

--
-- Stand-in structure for view `product_stats`
-- (See below for the actual view)
--
CREATE TABLE `product_stats` (
`product_id` varchar(50)
,`product_name` varchar(255)
,`category` varchar(100)
,`price` decimal(10,2)
,`stock` int(11)
,`times_ordered` bigint(21)
,`total_quantity_sold` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Table structure for table `sell_parts_requests`
--

CREATE TABLE `sell_parts_requests` (
  `id` int(11) NOT NULL,
  `request_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `sell_parts_requests`
--

INSERT INTO `sell_parts_requests` (`id`, `request_id`, `user_id`, `customer_name`, `part_name`, `category`, `condition`, `price`, `quantity`, `description`, `contact_phone`, `image_path_1`, `image_path_2`, `image_path_3`, `image_path_4`, `status`, `created_at`, `updated_at`) VALUES
(0, 'SP-20251209072903-471c9611', 'USR-6932b7e5bfc26', 'John Bryan Pinaga', 'Samsung 970 EVO Plus 1TB', 'RAM', 'excellent', 4000.00, 1, '', '09123456789', 'resources/images/sell-parts/SP-20251209072903-471c9611_1.webp', '', '', '', 'pending', '2025-12-09 06:29:03', '2025-12-09 06:29:03');

-- --------------------------------------------------------

--
-- Table structure for table `service_requests`
--

CREATE TABLE `service_requests` (
  `request_id` varchar(50) NOT NULL,
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_requests`
--

INSERT INTO `service_requests` (`request_id`, `customer_id`, `service_type`, `description`, `priority`, `status`, `location`, `preferred_date`, `preferred_time`, `confirmed_date`, `confirmed_time`, `assigned_technician_id`, `assigned_by`, `scheduled_at`, `notes`, `created_at`, `updated_at`) VALUES
('SRV-20251208102046-76ade5', 'USR-6932b7e5bfc26', 'pc-assembly', NULL, 'Medium', 'Scheduled', 'Villamonte, Bacolod City', '2025-12-12', '14:00:00', NULL, NULL, 'USR-006', 'USR-12472e7cf440', '2025-12-09 03:54:22', '', '2025-12-08 09:20:46', '2025-12-09 03:54:22'),
('SRV-20251209045300-1b4d1f', 'USR-6932b7e5bfc26', 'pc-assembly', NULL, 'Medium', 'Scheduled', 'Bata, Bacolod City', '2025-12-11', '11:00:00', NULL, NULL, 'USR-006', 'USR-12472e7cf440', '2025-12-09 03:54:14', '', '2025-12-09 03:53:00', '2025-12-09 03:54:14'),
('SRV-20251209062555-8bca76', 'USR-6937b26996652', 'pc-assembly', NULL, 'Medium', 'Scheduled', 'Kabankalan', '2025-12-11', '09:00:00', NULL, NULL, 'USR-006', 'USR-12472e7cf440', '2025-12-09 05:26:51', '', '2025-12-09 05:25:55', '2025-12-09 05:26:51');

-- --------------------------------------------------------

--
-- Table structure for table `service_request_history`
--

CREATE TABLE `service_request_history` (
  `history_id` varchar(50) NOT NULL,
  `request_id` varchar(50) NOT NULL,
  `old_status` varchar(50) DEFAULT NULL,
  `new_status` varchar(50) NOT NULL,
  `changed_by` varchar(50) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system_config`
--

CREATE TABLE `system_config` (
  `config_id` int(11) NOT NULL,
  `config_key` varchar(100) NOT NULL,
  `config_value` text DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `system_config`
--

INSERT INTO `system_config` (`config_id`, `config_key`, `config_value`, `description`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'site_name', 'FrostByte', 'Application site name', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
(2, 'site_url', 'http://localhost/FrostByte', 'Application URL', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
(3, 'default_language', 'english', 'Default language', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
(4, 'currency', 'USD', 'Default currency', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
(5, 'timezone', 'UTC', 'System timezone', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
(6, 'maintenance_mode', '0', 'Maintenance mode flag', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
(7, 'max_upload_size', '10485760', 'Max file upload size in bytes', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05');

-- --------------------------------------------------------

--
-- Table structure for table `system_logs`
--

CREATE TABLE `system_logs` (
  `log_id` int(11) NOT NULL,
  `error_id` varchar(50) DEFAULT NULL,
  `error_type` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `resolved` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `technician_schedule`
--

CREATE TABLE `technician_schedule` (
  `schedule_id` varchar(50) NOT NULL,
  `service_request_id` varchar(50) NOT NULL,
  `technician_id` varchar(50) NOT NULL,
  `scheduled_date` date NOT NULL,
  `scheduled_time` time NOT NULL,
  `status` enum('scheduled','in_progress','completed','cancelled') DEFAULT 'scheduled',
  `completion_notes` text DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(50) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `fullname`, `email`, `password`, `gender`, `city`, `role`, `status`, `orders`, `total_spent`, `join_date`, `last_active`, `created_at`, `updated_at`) VALUES
('USR-002', 'Gwyneth Hilary Laurino', 'gwyneth@frostbyte.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Female', 'Cebu', 'admin', 'active', 0, 0.00, '2025-12-02 15:04:05', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('USR-003', 'John Doe', 'john@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Male', 'New York', 'user', 'active', 0, 0.00, '2025-09-02 15:04:05', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('USR-004', 'Sarah Chen', 'sarah@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Female', 'Los Angeles', 'user', 'active', 0, 0.00, '2025-06-02 15:04:05', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('USR-005', 'Michael Brown', 'michael@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Male', 'Chicago', 'technician', 'active', 0, 0.00, '2025-11-02 15:04:05', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('USR-006', 'Sarah Johnson', 'sarah.johnson@frostbyte.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Female', 'Bacolod', 'technician', 'active', 0, 0.00, '2025-11-15 15:04:05', NULL, '2025-11-15 15:04:05', '2025-11-15 15:04:05'),
('USR-007', 'John Smith', 'john.smith@frostbyte.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Male', 'Cebu', 'technician', 'active', 0, 0.00, '2025-11-20 15:04:05', NULL, '2025-11-20 15:04:05', '2025-11-20 15:04:05'),
('USR-008', 'Maria Santos', 'maria.santos@frostbyte.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Female', 'Manila', 'technician', 'active', 0, 0.00, '2025-12-01 15:04:05', NULL, '2025-12-01 15:04:05', '2025-12-01 15:04:05'),
('USR-12472e7cf440', 'Admin User', 'admin@frostbyte.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Admin City', 'admin', 'active', 0, 0.00, '2025-12-05 14:30:11', NULL, '2025-12-05 14:30:11', '2025-12-05 14:30:11'),
('USR-53f0bc48c4f5', 'Super Admin', 'superadmin@frostbyte.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Admin City', 'superadmin', 'active', 0, 0.00, '2025-12-05 14:25:07', NULL, '2025-12-05 14:25:07', '2025-12-05 14:25:07'),
('USR-6932b62dcdaf0', 'Traumerei Lopobia', 'traum@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Bacolod', 'user', 'active', 0, 0.00, '2025-12-05 03:38:37', NULL, '2025-12-05 03:38:37', '2025-12-05 03:38:37'),
('USR-6932b7e5bfc26', 'John Bryan Pinaga', 'bry@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Murcia', 'user', 'active', 0, 0.00, '2025-12-05 03:45:57', NULL, '2025-12-05 03:45:57', '2025-12-05 03:45:57'),
('USR-6933e0d9e252b', 'Glenn Dale Gealon', 'gert@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Bacolod', 'user', 'active', 0, 0.00, '2025-12-06 00:52:57', NULL, '2025-12-06 00:52:57', '2025-12-06 00:52:57'),
('USR-6933ecd17815c', 'Joseph Dela Rama', 'joseph@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Talisay', 'user', 'active', 0, 0.00, '2025-12-06 01:44:01', NULL, '2025-12-06 01:44:01', '2025-12-06 01:44:01'),
('USR-6933f7266eb3c', 'Vicente Dimagiba', 'vince@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Bacolod', 'user', 'active', 0, 0.00, '2025-12-06 02:28:06', NULL, '2025-12-06 02:28:06', '2025-12-06 02:28:06'),
('USR-6937b26996652', 'Alvin Mahilig', 'alvin@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 'Male', 'Kabankalan', 'user', 'active', 0, 0.00, '2025-12-08 22:23:53', NULL, '2025-12-08 22:23:53', '2025-12-08 22:23:53');

-- --------------------------------------------------------

--
-- Structure for view `customer_stats`
--
DROP TABLE IF EXISTS `customer_stats`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `customer_stats`  AS SELECT `u`.`user_id` AS `user_id`, `u`.`fullname` AS `name`, `u`.`email` AS `email`, count(`o`.`order_id`) AS `orders`, coalesce(sum(`o`.`amount`),0) AS `total_spent`, `u`.`join_date` AS `join_date`, `u`.`status` AS `status` FROM (`users` `u` left join `orders` `o` on(`u`.`user_id` = `o`.`user_id`)) WHERE `u`.`role` in ('user','technician') GROUP BY `u`.`user_id`, `u`.`fullname`, `u`.`email`, `u`.`join_date`, `u`.`status` ;

-- --------------------------------------------------------

--
-- Structure for view `order_stats`
--
DROP TABLE IF EXISTS `order_stats`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `order_stats`  AS SELECT cast(`o`.`date` as date) AS `order_date`, count(`o`.`order_id`) AS `total_orders`, sum(`o`.`amount`) AS `daily_revenue`, `o`.`status` AS `status` FROM `orders` AS `o` GROUP BY cast(`o`.`date` as date), `o`.`status` ;

-- --------------------------------------------------------

--
-- Structure for view `product_stats`
--
DROP TABLE IF EXISTS `product_stats`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `product_stats`  AS SELECT `p`.`product_id` AS `product_id`, `p`.`product_name` AS `product_name`, `p`.`category` AS `category`, `p`.`price` AS `price`, `p`.`stock` AS `stock`, count(`o`.`order_id`) AS `times_ordered`, sum(`o`.`quantity`) AS `total_quantity_sold` FROM (`products` `p` left join `orders` `o` on(`p`.`product_id` = `o`.`product_id`)) GROUP BY `p`.`product_id`, `p`.`product_name`, `p`.`category`, `p`.`price`, `p`.`stock` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buyback_requests`
--
ALTER TABLE `buyback_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `request_id` (`request_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_customer_id` (`customer_id`),
  ADD KEY `idx_submitted_date` (`submitted_date`);

--
-- Indexes for table `database_tables_info`
--
ALTER TABLE `database_tables_info`
  ADD PRIMARY KEY (`table_id`),
  ADD UNIQUE KEY `unique_table_name` (`table_name`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_date` (`date`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_status` (`status`);
ALTER TABLE `products` ADD FULLTEXT KEY `ft_search` (`product_name`,`description`);

--
-- Indexes for table `sell_parts_requests`
--
ALTER TABLE `sell_parts_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `request_id` (`request_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `service_requests`
--
ALTER TABLE `service_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `idx_customer_id` (`customer_id`),
  ADD KEY `idx_assigned_technician_id` (`assigned_technician_id`),
  ADD KEY `idx_assigned_by` (`assigned_by`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_priority` (`priority`),
  ADD KEY `idx_scheduled_at` (`scheduled_at`);

--
-- Indexes for table `service_request_history`
--
ALTER TABLE `service_request_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `changed_by` (`changed_by`),
  ADD KEY `idx_request_id` (`request_id`);

--
-- Indexes for table `system_config`
--
ALTER TABLE `system_config`
  ADD PRIMARY KEY (`config_id`),
  ADD UNIQUE KEY `config_key` (`config_key`);

--
-- Indexes for table `system_logs`
--
ALTER TABLE `system_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `idx_error_type` (`error_type`),
  ADD KEY `idx_timestamp` (`timestamp`),
  ADD KEY `idx_resolved` (`resolved`);

--
-- Indexes for table `technician_schedule`
--
ALTER TABLE `technician_schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `idx_technician_date` (`technician_id`,`scheduled_date`),
  ADD KEY `idx_service` (`service_request_id`),
  ADD KEY `idx_status` (`status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buyback_requests`
--
ALTER TABLE `buyback_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
