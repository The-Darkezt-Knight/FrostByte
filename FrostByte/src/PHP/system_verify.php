<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>FrostByte Service System - Verification</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        h1 { color: #0390dc; border-bottom: 2px solid #0390dc; padding-bottom: 10px; }
        .check { margin: 15px 0; padding: 12px; border-left: 4px solid #e5e7eb; background: #f9fafb; }
        .check.pass { border-left-color: #22c55e; background: #dcfce7; }
        .check.fail { border-left-color: #ef4444; background: #fee2e2; }
        .check.info { border-left-color: #0390dc; background: #dbeafe; }
        .status { font-weight: bold; }
        .pass { color: #166534; }
        .fail { color: #991b1b; }
        .info { color: #0c4a6e; }
        code { background: #f3f4f6; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
        .section { margin: 20px 0; }
        .buttons { margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap; }
        .btn { padding: 10px 20px; background: #0390dc; color: white; border: none; border-radius: 6px; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn:hover { background: #0280c7; }
        .btn.secondary { background: #e5e7eb; color: #1f2937; }
        .btn.secondary:hover { background: #d1d5db; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 FrostByte Service System - Verification</h1>

        <div class="section">
            <h2>System Status Checks</h2>

            <?php
            // Check 1: Database Connection
            echo '<div class="check ';
            require_once 'src/PHP/db_connect.php';
            if (isset($conn) && !$conn->connect_error) {
                echo 'pass"><span class="status pass">✓ PASS</span>: Database connection successful';
                $db_ok = true;
            } else {
                echo 'fail"><span class="status fail">✗ FAIL</span>: Database connection failed';
                $db_ok = false;
            }
            echo '</div>';

            if ($db_ok) {
                // Check 2: service_requests table
                echo '<div class="check ';
                $result = $conn->query("SHOW TABLES LIKE 'service_requests'");
                if ($result && $result->num_rows > 0) {
                    echo 'pass"><span class="status pass">✓ PASS</span>: service_requests table exists';
                    
                    // Count records
                    $count = $conn->query("SELECT COUNT(*) as cnt FROM service_requests");
                    $row = $count->fetch_assoc();
                    echo ' (' . $row['cnt'] . ' records)';
                } else {
                    echo 'fail"><span class="status fail">✗ FAIL</span>: service_requests table NOT found';
                }
                echo '</div>';

                // Check 3: service_request_history table
                echo '<div class="check ';
                $result = $conn->query("SHOW TABLES LIKE 'service_request_history'");
                if ($result && $result->num_rows > 0) {
                    echo 'pass"><span class="status pass">✓ PASS</span>: service_request_history table exists';
                } else {
                    echo 'fail"><span class="status fail">✗ FAIL</span>: service_request_history table NOT found';
                }
                echo '</div>';

                // Check 4: Sample data
                echo '<div class="check info"><span class="status info">ℹ INFO</span>: Recent service requests:';
                $result = $conn->query("SELECT request_id, customer_id, service_type, status FROM service_requests ORDER BY created_at DESC LIMIT 5");
                if ($result && $result->num_rows > 0) {
                    echo '<ul style="margin: 10px 0;">';
                    while ($row = $result->fetch_assoc()) {
                        echo '<li>Request #' . $row['request_id'] . ' - ' . $row['service_type'] . ' (' . $row['status'] . ')</li>';
                    }
                    echo '</ul>';
                } else {
                    echo '<p style="margin: 10px 0; color: #6b7280;">No service requests found. Create one using the customer booking form.</p>';
                }
                echo '</div>';
            }

            // Check 5: Session
            echo '<div class="check ';
            if (isset($_SESSION['user_id'])) {
                echo 'pass"><span class="status pass">✓ PASS</span>: Session active (User: ' . $_SESSION['user_id'] . ')';
            } else {
                echo 'info"><span class="status info">ℹ INFO</span>: No session. <a href="index.php">Login first</a>';
            }
            echo '</div>';

            // Check 6: API files
            $apis = [
                'create_service_request.php',
                'get_service_requests.php',
                'assign_technician.php',
                'get_technicians.php',
                'cancel_service_request.php',
                'check_session.php'
            ];
            
            foreach ($apis as $api) {
                echo '<div class="check ';
                $path = 'src/PHP/api/' . $api;
                if (file_exists($path)) {
                    echo 'pass"><span class="status pass">✓ PASS</span>: ' . $api . ' exists';
                } else {
                    echo 'fail"><span class="status fail">✗ FAIL</span>: ' . $api . ' NOT found';
                }
                echo '</div>';
            }
            ?>
        </div>

        <div class="section">
            <h2>Quick Actions</h2>
            <div class="buttons">
                <a href="src/PHP/index.php" class="btn">🔐 Login</a>
                <a href="src/PHP/customer.php" class="btn">📦 Customer Dashboard</a>
                <a href="src/PHP/admin.php" class="btn">⚙️ Admin Dashboard</a>
                <a href="src/PHP/test_db.php" class="btn secondary">🔍 Check Database</a>
                <a href="src/PHP/test_get_requests.php" class="btn secondary">📊 View Requests (API)</a>
            </div>
        </div>

        <div class="section">
            <h2>Testing Workflow</h2>
            <ol>
                <li><strong>Login</strong> as a customer</li>
                <li><strong>Navigate</strong> to Services section</li>
                <li><strong>Click</strong> "Book New Service"</li>
                <li><strong>Fill</strong> the 4-step booking form</li>
                <li><strong>Confirm</strong> booking</li>
                <li><strong>See</strong> success notification</li>
                <li><strong>Login</strong> as admin</li>
                <li><strong>Go to</strong> Technician Schedule</li>
                <li><strong>See</strong> new service request</li>
                <li><strong>Click</strong> "Assign" button</li>
                <li><strong>Select</strong> technician from cards</li>
                <li><strong>Confirm</strong> assignment</li>
                <li><strong>Verify</strong> status updates</li>
            </ol>
        </div>

        <div class="section">
            <h2>Database Status</h2>
            <?php
            if ($db_ok) {
                $tables = $conn->query("SHOW TABLES");
                echo '<p>Total tables in database: <strong>' . $tables->num_rows . '</strong></p>';
                echo '<p>Service tables:</p>';
                echo '<ul>';
                echo '<li>service_requests - ';
                $count = $conn->query("SELECT COUNT(*) as cnt FROM service_requests")->fetch_assoc();
                echo $count['cnt'] . ' records</li>';
                echo '<li>service_request_history - ';
                $count = $conn->query("SELECT COUNT(*) as cnt FROM service_request_history")->fetch_assoc();
                echo $count['cnt'] . ' records</li>';
                echo '</ul>';
                $conn->close();
            }
            ?>
        </div>
    </div>
</body>
</html>
