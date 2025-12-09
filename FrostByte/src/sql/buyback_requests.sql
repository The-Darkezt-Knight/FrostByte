-- Create Buyback Requests Table
CREATE TABLE buyback_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_id VARCHAR(20) UNIQUE NOT NULL,
    customer_id INT,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    component_name VARCHAR(255) NOT NULL,
    component_category VARCHAR(100),
    `condition` VARCHAR(50) NOT NULL,
    user_expected_price DECIMAL(10, 2) NOT NULL,
    our_offer_price DECIMAL(10, 2),
    status ENUM('Pending Review', 'Offer Sent', 'Negotiating', 'Accepted', 'Rejected', 'Completed') DEFAULT 'Pending Review',
    offer_message LONGTEXT,
    notes LONGTEXT,
    submitted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    approved_by INT,
    approved_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_customer_id (customer_id),
    INDEX idx_submitted_date (submitted_date)
);

-- Insert sample data
INSERT INTO buyback_requests (request_id, customer_id, customer_name, customer_email, component_name, component_category, condition, user_expected_price, status, submitted_date) VALUES
('BR-2847', 1, 'Mark Johnson', 'mark@email.com', 'NVIDIA RTX 3090', 'Graphics Card', 'Excellent', 900.00, 'Pending Review', NOW()),
('BR-2846', 2, 'Jennifer Lee', 'jen@email.com', 'AMD Ryzen 7 5800X', 'Processor', 'Good', 250.00, 'Pending Review', NOW() - INTERVAL 1 DAY),
('BR-2845', 3, 'Thomas Brown', 'thomas@email.com', 'G.Skill 16GB DDR4', 'Memory', 'Fair', 60.00, 'Pending Review', NOW() - INTERVAL 2 DAY),
('BR-2844', 4, 'Jessica White', 'jessica@email.com', 'Samsung 860 EVO 500GB', 'Storage', 'Good', 40.00, 'Accepted', NOW() - INTERVAL 3 DAY),
('BR-2843', 5, 'Daniel Garcia', 'daniel@email.com', 'ASUS Prime B450M', 'Motherboard', 'Poor', 80.00, 'Rejected', NOW() - INTERVAL 4 DAY);
