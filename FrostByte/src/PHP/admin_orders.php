<!-- Orders Management Admin Panel -->
<!-- File: /FrostByte/src/PHP/admin_orders.php -->
<?php
session_start();

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: ../login & signup/index.html');
    exit();
}

require_once 'config/Database.php';
$db = new Database();
$conn = $db->connect();

// Fetch orders by status
$status = $_GET['status'] ?? 'pending';
$validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'rejected', 'cancelled', 'refunded'];
$status = in_array($status, $validStatuses) ? $status : 'pending';

$query = "SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $status);
$stmt->execute();
$ordersResult = $stmt->get_result();
$orders = $ordersResult->fetch_all(MYSQLI_ASSOC);

// Get order statistics
$statsQuery = "
    SELECT 
        status,
        COUNT(*) as count
    FROM orders
    GROUP BY status
";
$statsResult = $conn->query($statsQuery);
$stats = [];
while ($row = $statsResult->fetch_assoc()) {
    $stats[$row['status']] = $row['count'];
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orders Management - Admin Panel</title>
    <link rel="stylesheet" href="../css/admin/admin.css">
    <link rel="stylesheet" href="../css/admin/orders-management.css">
</head>
<body>
    <div class="admin-container">
        <!-- Navigation -->
        <nav class="admin-nav">
            <div class="nav-header">
                <h2>FrostByte Admin</h2>
            </div>
            <ul class="nav-menu">
                <li><a href="admin.html">Dashboard</a></li>
                <li><a href="admin_orders.php" class="active">Orders</a></li>
                <li><a href="admin_services.php">Services</a></li>
                <li><a href="admin_sell_parts.php">Sell Parts</a></li>
            </ul>
        </nav>

        <!-- Main Content -->
        <div class="admin-content">
            <div class="content-header">
                <h1>Orders Management</h1>
                <p>Manage and approve customer orders</p>
            </div>

            <!-- Status Filter Tabs -->
            <div class="status-tabs">
                <?php 
                $tabs = ['pending', 'processing', 'shipped', 'delivered', 'rejected', 'cancelled'];
                foreach ($tabs as $tab): 
                    $count = $stats[$tab] ?? 0;
                    $isActive = $tab === $status ? 'active' : '';
                ?>
                    <a href="?status=<?php echo $tab; ?>" class="status-tab <?php echo $isActive; ?>">
                        <span class="tab-name"><?php echo ucfirst($tab); ?></span>
                        <span class="tab-count"><?php echo $count; ?></span>
                    </a>
                <?php endforeach; ?>
            </div>

            <!-- Orders Table -->
            <div class="orders-table-container">
                <table class="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($orders)): ?>
                            <tr>
                                <td colspan="7" class="empty-message">No orders found</td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($orders as $order): ?>
                                <tr class="order-row" data-order-id="<?php echo htmlspecialchars($order['order_id']); ?>">
                                    <td class="order-id"><?php echo htmlspecialchars($order['order_id']); ?></td>
                                    <td class="customer-name"><?php echo htmlspecialchars($order['customer']); ?></td>
                                    <td class="product-name"><?php echo htmlspecialchars($order['product']); ?></td>
                                    <td class="amount">PKR <?php echo number_format($order['amount'], 2); ?></td>
                                    <td class="date"><?php echo date('M d, Y', strtotime($order['created_at'])); ?></td>
                                    <td class="status">
                                        <span class="status-badge status-<?php echo $order['status']; ?>">
                                            <?php echo ucfirst($order['status']); ?>
                                        </span>
                                    </td>
                                    <td class="actions">
                                        <button class="btn-view" onclick="viewOrderDetails('<?php echo $order['order_id']; ?>')">
                                            View
                                        </button>
                                        <?php if ($order['status'] === 'pending'): ?>
                                            <button class="btn-approve" onclick="approveOrder('<?php echo $order['order_id']; ?>')">
                                                Approve
                                            </button>
                                            <button class="btn-reject" onclick="showRejectModal('<?php echo $order['order_id']; ?>')">
                                                Reject
                                            </button>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Order Details Modal -->
    <div id="orderDetailsModal" class="modal">
        <div class="modal-content order-details-modal">
            <div class="modal-header">
                <h2>Order Details</h2>
                <button class="close-btn" onclick="closeOrderDetails()">&times;</button>
            </div>
            <div class="modal-body" id="orderDetailsBody">
                <!-- Dynamically loaded -->
            </div>
        </div>
    </div>

    <!-- Reject Modal -->
    <div id="rejectModal" class="modal">
        <div class="modal-content reject-modal">
            <div class="modal-header">
                <h2>Reject Order</h2>
                <button class="close-btn" onclick="closeRejectModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="rejectForm">
                    <div class="form-group">
                        <label for="rejectionReason">Reason for Rejection</label>
                        <textarea id="rejectionReason" name="rejection_reason" required 
                                  placeholder="Explain why you are rejecting this order..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="adminNotes">Admin Notes (Optional)</label>
                        <textarea id="adminNotes" name="admin_notes" 
                                  placeholder="Add internal notes..."></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="closeRejectModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Confirm Rejection</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="../js/admin/orders-management.js"></script>
</body>
</html>
