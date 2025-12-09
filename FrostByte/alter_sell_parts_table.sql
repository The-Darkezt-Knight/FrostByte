-- SQL Query to ALTER existing sell_parts_requests table to add image columns

-- First, drop the old image_path column if it exists
ALTER TABLE sell_parts_requests 
DROP COLUMN IF EXISTS image_path;

-- Then add the new image path columns
ALTER TABLE sell_parts_requests 
ADD COLUMN image_path_1 VARCHAR(255) AFTER contact_phone,
ADD COLUMN image_path_2 VARCHAR(255) AFTER image_path_1,
ADD COLUMN image_path_3 VARCHAR(255) AFTER image_path_2,
ADD COLUMN image_path_4 VARCHAR(255) AFTER image_path_3;
