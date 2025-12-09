-- SQL Query to create sell_parts_requests table

CREATE TABLE IF NOT EXISTS sell_parts_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id VARCHAR(50) UNIQUE NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    part_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    `condition` VARCHAR(30) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT DEFAULT 1,
    description LONGTEXT,
    contact_phone VARCHAR(20),
    image_path_1 VARCHAR(255),
    image_path_2 VARCHAR(255),
    image_path_3 VARCHAR(255),
    image_path_4 VARCHAR(255),
    `status` ENUM('pending', 'processing', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_status (`status`),
    INDEX idx_created_at (created_at)
);
