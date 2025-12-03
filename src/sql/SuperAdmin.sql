--User Management 
-- Query for total registered users
SELECT COUNT(*) AS total_registered_users 
FROM users;

-- Query for active users in the last 30 days   
SELECT COUNT(*) AS active_users_last_30_days
FROM users
WHERE role = 'customer' AND last_active >= NOW() - INTERVAL 30 DAY;   

--Query for new customers registered in the last 7 days
SELECT COUNT(*) AS new_customers_last_7_days
FROM users
WHERE role = 'customer' AND registered_at >= NOW() - INTERVAL 7 DAY;


--Admin Administration
-- Query for total admin users
SELECT COUNT(*) AS total_admin_users
FROM users
WHERE role = 'admin';

--Query for total technician within the admin
SELECT COUNT(*) AS total_technicians
FROM users
WHERE role = 'technician';

--Query for total Support Staff within the admin
SELECT COUNT(*) AS total_support_staff
FROM users
WHERE role = 'support_staff';

--Query for total Managers within the admin
SELECT COUNT(*) AS total_managers
FROM users
WHERE role = 'manager';