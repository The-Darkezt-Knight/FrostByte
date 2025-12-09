-- Database Updates for Orders, Services, and Sell Parts Approval System
-- December 9, 2025

-- ============================================
-- 1. ORDERS TABLE - Add Rejection Support
-- ============================================
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS rejection_reason VARCHAR(500) AFTER status,
ADD COLUMN IF NOT EXISTS admin_notes TEXT AFTER rejection_reason,
ADD COLUMN IF NOT EXISTS approved_by VARCHAR(50) AFTER admin_notes,
ADD COLUMN IF NOT EXISTS rejected_by VARCHAR(50) AFTER approved_by,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP NULL AFTER rejected_by,
ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMP NULL AFTER approved_at;

-- Update status enum to include 'rejected'
ALTER TABLE orders MODIFY COLUMN `status` ENUM('pending','processing','shipped','delivered','cancelled','refunded','rejected') DEFAULT 'pending';

-- ============================================
-- 2. SERVICE_REQUESTS TABLE - Add Approval/Rejection & Technician Assignment
-- ============================================
ALTER TABLE service_requests 
ADD COLUMN IF NOT EXISTS admin_status ENUM('pending_approval','approved','rejected','scheduled','in_progress','completed') DEFAULT 'pending_approval' AFTER `status`,
ADD COLUMN IF NOT EXISTS rejection_reason VARCHAR(500) AFTER admin_status,
ADD COLUMN IF NOT EXISTS technician_id VARCHAR(50) AFTER rejection_reason,
ADD COLUMN IF NOT EXISTS technician_name VARCHAR(100) AFTER technician_id,
ADD COLUMN IF NOT EXISTS scheduled_date DATE AFTER technician_name,
ADD COLUMN IF NOT EXISTS scheduled_time TIME AFTER scheduled_date,
ADD COLUMN IF NOT EXISTS approved_by VARCHAR(50) AFTER scheduled_time,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP NULL AFTER approved_by,
ADD COLUMN IF NOT EXISTS rejected_by VARCHAR(50) AFTER approved_at,
ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMP NULL AFTER rejected_by,
ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMP NULL AFTER rejected_at;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_service_admin_status ON service_requests(admin_status);
CREATE INDEX IF NOT EXISTS idx_service_technician ON service_requests(technician_id);

-- ============================================
-- 3. SELL_PARTS_REQUESTS TABLE - Update for Approval & Offer Workflow
-- ============================================
ALTER TABLE sell_parts_requests 
MODIFY COLUMN `status` ENUM('pending','processing','approved','rejected','offered','accepted','completed','archived') DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS admin_evaluation VARCHAR(500) AFTER `status`,
ADD COLUMN IF NOT EXISTS offer_price DECIMAL(10,2) AFTER admin_evaluation,
ADD COLUMN IF NOT EXISTS approved_by VARCHAR(50) AFTER offer_price,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP NULL AFTER approved_by,
ADD COLUMN IF NOT EXISTS offered_at TIMESTAMP NULL AFTER approved_at,
ADD COLUMN IF NOT EXISTS customer_response_at TIMESTAMP NULL AFTER offered_at,
ADD COLUMN IF NOT EXISTS quality_check_date DATE AFTER customer_response_at,
ADD COLUMN IF NOT EXISTS quality_check_notes TEXT AFTER quality_check_date,
ADD COLUMN IF NOT EXISTS pickup_scheduled_date DATE AFTER quality_check_notes,
ADD COLUMN IF NOT EXISTS pickup_completed_at TIMESTAMP NULL AFTER pickup_scheduled_date;

-- Update status enum to support full workflow
ALTER TABLE sell_parts_requests MODIFY COLUMN `status` ENUM('pending','processing','approved','rejected','offered','accepted','completed','archived') DEFAULT 'pending';

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_sell_parts_status ON sell_parts_requests(`status`);
CREATE INDEX IF NOT EXISTS idx_sell_parts_offer ON sell_parts_requests(offer_price);

-- ============================================
-- 4. CREATE APPROVAL_HISTORY TABLE (Audit Trail)
-- ============================================
CREATE TABLE IF NOT EXISTS approval_history (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `request_type` ENUM('order','service','sell_part') NOT NULL,
  `request_id` VARCHAR(50) NOT NULL,
  `user_id` VARCHAR(50) NOT NULL,
  `admin_id` VARCHAR(50) NOT NULL,
  `action` ENUM('approved','rejected','assigned','modified') NOT NULL,
  `reason` VARCHAR(500),
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_request (request_type, request_id),
  INDEX idx_admin (admin_id),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. CREATE TECHNICIANS TABLE (If not exists)
-- ============================================
CREATE TABLE IF NOT EXISTS technicians (
  `technician_id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(50),
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100),
  `phone` VARCHAR(20),
  `specialization` VARCHAR(100),
  `status` ENUM('active','inactive','on_leave') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 6. CREATE TECHNICIAN_SCHEDULE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS technician_schedule (
  `schedule_id` INT AUTO_INCREMENT PRIMARY KEY,
  `technician_id` VARCHAR(50) NOT NULL,
  `service_request_id` VARCHAR(50),
  `scheduled_date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME,
  `status` ENUM('scheduled','in_progress','completed','cancelled') DEFAULT 'scheduled',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (technician_id) REFERENCES technicians(technician_id),
  FOREIGN KEY (service_request_id) REFERENCES service_requests(request_id),
  INDEX idx_technician_date (technician_id, scheduled_date),
  INDEX idx_service (service_request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 7. CREATE OFFERS TABLE (For Sell Parts Workflow)
-- ============================================
CREATE TABLE IF NOT EXISTS offers (
  `offer_id` VARCHAR(50) PRIMARY KEY,
  `sell_part_request_id` VARCHAR(50) NOT NULL,
  `user_id` VARCHAR(50) NOT NULL,
  `offer_price` DECIMAL(10,2) NOT NULL,
  `admin_notes` TEXT,
  `status` ENUM('pending','accepted','rejected','expired') DEFAULT 'pending',
  `customer_response` ENUM('accepted','rejected') DEFAULT NULL,
  `response_date` TIMESTAMP NULL,
  `expires_at` TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sell_part_request_id) REFERENCES sell_parts_requests(request_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  INDEX idx_user (user_id),
  INDEX idx_status (status),
  INDEX idx_sell_part (sell_part_request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Success Message
-- ============================================
-- All database migrations completed successfully!
-- New tables: approval_history, technicians, technician_schedule, offers
-- Updated tables: orders, service_requests, sell_parts_requests
