-- Update sell_parts_requests table to add 'archived' status to enum
ALTER TABLE sell_parts_requests MODIFY COLUMN `status` ENUM('pending','processing','approved','rejected','archived') DEFAULT 'pending';
