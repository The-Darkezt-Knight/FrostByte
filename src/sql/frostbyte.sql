-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2025 at 08:43 AM
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
  `shipping_address` text DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `customer`, `product`, `product_id`, `amount`, `quantity`, `status`, `payment_method`, `shipping_address`, `date`, `created_at`, `updated_at`) VALUES
('ORD-001', 'USR-003', 'John Doe', 'Ryzen 9 9600x', 'PROD-001', 28000.00, 1, 'delivered', NULL, NULL, '2025-11-17 15:04:05', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('ORD-002', 'USR-004', 'Sarah Chen', 'RTX 4090', 'PROD-002', 85000.00, 1, 'shipped', NULL, NULL, '2025-11-27 15:04:05', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('ORD-003', 'USR-003', 'John Doe', 'Gaming Keyboard RGB', 'PROD-003', 5000.00, 2, 'processing', NULL, NULL, '2025-11-30 15:04:05', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('ORD-004', 'USR-005', 'Michael Brown', '4K Monitor 32inch', 'PROD-005', 25000.00, 1, 'pending', NULL, NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('ORD-005', 'USR-004', 'Sarah Chen', 'Logitech MX Master 3', 'PROD-004', 4500.00, 1, 'delivered', NULL, NULL, '2025-11-02 15:04:05', '2025-12-02 15:04:05', '2025-12-02 15:04:05');

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
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `description`, `category`, `price`, `stock`, `status`, `image_url`, `created_at`, `updated_at`) VALUES
('PROD-001', 'Ryzen 9 9600x', 'High-performance processor', 'Processor', 28000.00, 20, 'active', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('PROD-002', 'RTX 4090', 'Premium graphics card', 'Graphics Card', 85000.00, 5, 'active', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('PROD-003', 'Gaming Keyboard RGB', 'Mechanical gaming keyboard with RGB lighting', 'Keyboards', 5000.00, 15, 'active', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('PROD-004', 'Logitech MX Master 3', 'Professional mouse', 'Mouse', 4500.00, 12, 'active', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('PROD-005', '4K Monitor 32inch', 'Ultra HD display', 'Monitor', 25000.00, 8, 'active', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05');

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
  `technician_id` varchar(50) DEFAULT NULL,
  `order_id` varchar(50) DEFAULT NULL,
  `scheduled_date` datetime DEFAULT NULL,
  `status` enum('scheduled','in-progress','completed','cancelled') DEFAULT 'scheduled',
  `notes` text DEFAULT NULL,
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
('USR-001', 'Jose Raphael Pido', 'jose@frostbyte.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Male', 'Manila', 'superadmin', 'active', 0, 0.00, '2025-12-02 15:04:05', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('USR-002', 'Gwyneth Hilary Laurino', 'gwyneth@frostbyte.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Female', 'Cebu', 'admin', 'active', 0, 0.00, '2025-12-02 15:04:05', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('USR-003', 'John Doe', 'john@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Male', 'New York', 'user', 'active', 0, 0.00, '2025-09-02 15:04:05', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('USR-004', 'Sarah Chen', 'sarah@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Female', 'Los Angeles', 'user', 'active', 0, 0.00, '2025-06-02 15:04:05', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05'),
('USR-005', 'Michael Brown', 'michael@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Male', 'Chicago', 'technician', 'active', 0, 0.00, '2025-11-02 15:04:05', NULL, '2025-12-02 15:04:05', '2025-12-02 15:04:05');

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
  ADD KEY `order_id` (`order_id`),
  ADD KEY `idx_technician_id` (`technician_id`),
  ADD KEY `idx_scheduled_date` (`scheduled_date`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_role` (`role`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_join_date` (`join_date`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `database_tables_info`
--
ALTER TABLE `database_tables_info`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `system_config`
--
ALTER TABLE `system_config`
  MODIFY `config_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `system_logs`
--
ALTER TABLE `system_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL;

--
-- Constraints for table `technician_schedule`
--
ALTER TABLE `technician_schedule`
  ADD CONSTRAINT `technician_schedule_ibfk_1` FOREIGN KEY (`technician_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `technician_schedule_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
