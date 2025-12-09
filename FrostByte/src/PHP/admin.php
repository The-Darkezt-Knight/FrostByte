<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/FrostByte/src/css/side_panel.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
    <link rel="stylesheet" href="/FrostByte/src/css/admin/admin.css">
    <link rel="stylesheet" href="/FrostByte/src/css/admin/cards.css">
    <link rel="stylesheet" href="/FrostByte/src/css/admin/admin-table.css">
    <link rel="stylesheet" href="/FrostByte/src/css/admin/nav.css">
    <link rel="stylesheet" href="/FrostByte/src/css/admin/product-management-add-product.css">
    <link rel="stylesheet" href="/FrostByte/src/css/admin/order-management-new.css">
    <link rel="stylesheet" href="/FrostByte/src/css/admin/order-details-modal.css">
    <link rel="stylesheet" href="/FrostByte/src/css/admin/schedule-technician/technician-schedule.css">
    <link rel="stylesheet" href="/FrostByte/src/css/admin/technician-schedule-new.css">
    <link rel="stylesheet" href="/FrostByte/src/css/admin/buyback-management.css">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <script src="/FrostByte/src/js/auth/session.js" defer></script>
    <script src="/FrostByte/src/js/admin/admin-panel.js" defer></script>
    <script src="/FrostByte/src/js/admin/overview_order_list_table.js" defer></script>
    <script src="/FrostByte/src/js/admin/product-management-product-list-table.js" defer></script>
    <script src="/FrostByte/src/js/admin/product-filter.js" defer></script>
    <script src="/FrostByte/src/js/admin/product-management-add-product.js" defer></script>
    <script src="/FrostByte/src/js/admin/order-management.js" defer></script>
    <script src="/FrostByte/src/js/admin/create-task.js" defer></script>
    <script src="/FrostByte/src/js/admin/technician-schedule.js" defer></script>
    <script src="/FrostByte/src/js/admin/buyback-management.js" defer></script>
</head>

<body>
    <aside>
        <header>
            <i class="fa-solid fa-terminal" style="color: #2563eb;"></i>
            <div>
                <p>Console Admin</p>
                <p id="userNameDisplay">Loading...</p>
            </div>
        </header>
        <main>
            <div class="container" id="overview-btn">
                <i class="fa-solid fa-chart-line" style="color: #2563eb"></i>
                <div>
                    <p class="header">Overview</p>
                    <p class="subheader">Dashboards and analytics</p>
                </div>
            </div>

            <div class="container" id="product-management-btn">
                <i class="fa-solid fa-warehouse" style="color: #2563eb"></i>
                <div>
                    <p class="header">Product Management</p>
                    <p class="subheader">Manage inventory and products</p>
                </div>
            </div>
            <ul class="submenu" id="product-management-submenu">
                <li><i class="fa-solid fa-circle"></i>Products</li>
                <li><i class="fa-solid fa-circle"></i>Categories & Brands</li>
                <li><i class="fa-solid fa-circle"></i>Stock Management</li>
                <li><i class="fa-solid fa-circle"></i>Used Components</li>
            </ul>

            <div class="container" id="order-management-btn">
                <i class="fa-solid fa-square-binary" style="color: #2563eb;"></i>
                <div>
                    <p class="header">Order Management</p>
                    <p class="subheader">Process and track orders</p>
                </div>
            </div>

            <div class="container" id="technician-schedule-btn">
                <i class="fa-solid fa-screwdriver-wrench" style="color: #2563eb;"></i>
                <div>
                    <p class="header">Technician Schedule</p>
                    <p class="subheader">Schedule repairs and setups</p>
                </div>
            </div>

            <div class="container" id="buyback-btn">
                <i class="fa-solid fa-tag" style="color: #2563eb;"></i>
                <div>
                    <p class="header">Buy Back</p>
                    <p class="subheader">Manage customer buyback requests</p>
                </div>
            </div>
        </main>
        <footer>
            <i class="fa-solid fa-arrow-right-from-bracket" style="color: red;"></i>
            <button onclick="logout()" style="background: none; border: none; color: inherit; cursor: pointer; padding: 0; text-decoration: none;">Sign out</button>
        </footer>
    </aside>

    <div id="content-area">
        <div id="overview">
            <div class="header">
                <div class="cards" id="card1">
                    <div class="heading">
                        <p>Total orders</p>
                        <p>0</p>
                    </div>
                    <div class="subheading">

                    </div>
                </div>

                <div class="cards" id="card2">
                    <div class="heading">
                        <p>Products</p>
                        <p>0</p>
                    </div>
                    <div class="subheading">

                    </div>
                </div>

                <div class="cards" id="card3">
                    <div class="heading">
                        <p>Revenue</p>
                        <p>0</p>
                    </div>
                    <div class="subheading">

                    </div>
                </div>

                <div class="cards" id="card4">
                    <div class="heading">
                        <p>Pending tasks</p>
                        <p>0</p>
                    </div>
                    <div class="subheading">

                    </div>
                </div>

            </div>
            <!--end of header-->

            <div class="table-list">
                <table id="order-list">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--end of overview table-->
        </div>
        <!--end of overview-->

        <div id="order-management">
            <!-- Stats Cards Header - Matching Overview pattern -->
            <div class="header">
                <div class="cards" id="card1">
                    <div class="heading">
                        <p>Total Orders</p>
                        <p id="total-orders">0</p>
                    </div>
                </div>

                <div class="cards" id="card2">
                    <div class="heading">
                        <p>Pending Payment</p>
                        <p id="pending-payment">0</p>
                    </div>
                </div>

                <div class="cards" id="card3">
                    <div class="heading">
                        <p>Processing</p>
                        <p id="processing">0</p>
                    </div>
                </div>

                <div class="cards" id="card4">
                    <div class="heading">
                        <p>Shipped</p>
                        <p id="shipped">0</p>
                    </div>
                </div>

                <div class="cards" id="card5">
                    <div class="heading">
                        <p>Delivered</p>
                        <p id="delivered">0</p>
                    </div>
                </div>
            </div>

            <!-- Filter Section -->
            <div class="filter-section">
                <input type="search" id="search-orders" placeholder="Search orders...">
                
                <select id="filter-status">
                    <option value="">All Status</option>
                    <option value="pending_payment">Pending Payment</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <select id="filter-payment">
                    <option value="">All Payments</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="other">Other</option>
                </select>

                <select id="sort-by">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Amount</option>
                    <option value="lowest">Lowest Amount</option>
                </select>
            </div>

            <!-- Orders Table -->
            <div class="table-container">
                <table id="orders-table" class="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="orders-tbody">
                        <!-- Orders will be populated here -->
                    </tbody>
                </table>
            </div>

            <!-- Order Details Modal -->
            <div id="order-details-modal" class="order-modal">
                <div class="order-modal-content">
                    <div class="order-modal-header">
                        <h2>Order Details</h2>
                        <button class="order-modal-close" id="close-order-modal">&times;</button>
                    </div>

                    <div class="order-modal-body">
                        <!-- Order Header Info -->
                        <div class="order-header-info">
                            <div class="info-group">
                                <label>Order ID</label>
                                <p id="modal-order-id">ORD-1847</p>
                            </div>
                            <div class="info-group">
                                <label>Date</label>
                                <p id="modal-order-date">2021-11-27 14:32</p>
                            </div>
                            <div class="info-group">
                                <label>Status</label>
                                <p id="modal-order-status" class="status-badge pending_payment">Pending Payment</p>
                            </div>
                        </div>

                        <!-- Customer Information -->
                        <div class="section">
                            <h3>Customer Information</h3>
                            <div class="info-row">
                                <label>Name:</label>
                                <p id="modal-customer-name">James Mitchell</p>
                            </div>
                            <div class="info-row">
                                <label>Email:</label>
                                <p id="modal-customer-email">james.mitchell@gmail.com</p>
                            </div>
                            <div class="info-row">
                                <label>Shipping Address:</label>
                                <p id="modal-shipping-address">1122 Rose Street Suite 360<br>Los Angeles, CA 94107</p>
                            </div>
                        </div>

                        <!-- Order Items -->
                        <div class="section">
                            <h3>Order Items</h3>
                            <div class="items-list" id="modal-items-list">
                                <!-- Items will be populated here -->
                            </div>
                        </div>

                        <!-- Order Summary -->
                        <div class="section">
                            <h3>Order Summary</h3>
                            <div class="summary-row">
                                <label>Subtotal:</label>
                                <p id="modal-subtotal">$1,249</p>
                            </div>
                            <div class="summary-row">
                                <label>Shipping:</label>
                                <p id="modal-shipping">$15</p>
                            </div>
                            <div class="summary-row">
                                <label>Tax:</label>
                                <p id="modal-tax">$101</p>
                            </div>
                            <div class="summary-row total">
                                <label>Total:</label>
                                <p id="modal-total">$1,365</p>
                            </div>
                        </div>
                    </div>

                    <div class="order-modal-footer">
                        <button class="btn-secondary" id="close-order-btn">Close</button>
                        <button class="btn-primary" id="approve-order-btn">Approve Order</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="technician-schedule" class="technician-schedule-container">
            <!-- Header -->
            <div class="schedule-header">
                <div>
                    <h1 class="schedule-title">Technician Schedule Management</h1>
                    <p class="schedule-subtitle">Manage service assignments and technician schedules</p>
                </div>
            </div>

            <!-- Stats -->
            <div class="schedule-stats">
                <div class="stat-card">
                    <div class="stat-label">Scheduled Today</div>
                    <div class="stat-value" id="stat-today">0</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">In Progress</div>
                    <div class="stat-value" id="stat-progress">0</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Completed</div>
                    <div class="stat-value" id="stat-completed">0</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Pending Assignment</div>
                    <div class="stat-value" id="stat-pending">0</div>
                </div>
            </div>

            <!-- Filters -->
            <div class="schedule-filters">
                <select id="filter-status" class="filter-select">
                    <option value="all">All Status</option>
                    <option value="pending">Pending Assignment</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <select id="filter-technician" class="filter-select">
                    <option value="all">All Technicians</option>
                    <option value="tech1">John Smith</option>
                    <option value="tech2">Sarah Johnson</option>
                    <option value="tech3">Mike Davis</option>
                </select>
                <select id="filter-date" class="filter-select">
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>
                <button id="add-schedule-btn" class="btn-add-schedule">
                    <span>+ Schedule Service</span>
                </button>
            </div>

            <!-- Schedules Table -->
            <div class="schedule-table-wrapper">
                <div class="schedule-table-container">
                    <table class="schedule-table">
                        <thead>
                            <tr>
                                <th>Service ID</th>
                                <th>Customer</th>
                                <th>Service Type</th>
                                <th>Scheduled Date</th>
                                <th>Time</th>
                                <th>Technician</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="schedule-body">
                            <!-- Populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Schedule Details Modal -->
            <div id="schedule-modal" class="modal-overlay">
                <div class="schedule-modal">
                    <div class="modal-header">
                        <h2>Service Schedule Details</h2>
                        <button class="modal-close" onclick="closeScheduleModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <!-- Customer Info -->
                        <div class="info-section">
                            <h3>Customer Information</h3>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Customer Name</span>
                                    <span class="info-value" id="modal-customer-name">-</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Contact Email</span>
                                    <span class="info-value" id="modal-customer-email">-</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Phone</span>
                                    <span class="info-value" id="modal-customer-phone">-</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Address</span>
                                    <span class="info-value" id="modal-customer-address">-</span>
                                </div>
                            </div>
                        </div>

                        <!-- Service Details -->
                        <div class="info-section">
                            <h3>Service Details</h3>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Service Type</span>
                                    <span class="info-value" id="modal-service-type">-</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Description</span>
                                    <span class="info-value" id="modal-service-desc">-</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Priority</span>
                                    <span class="info-value" id="modal-service-priority">-</span>
                                </div>
                            </div>
                        </div>

                        <!-- Schedule Info -->
                        <div class="info-section">
                            <h3>Schedule Information</h3>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Scheduled Date</span>
                                    <span class="info-value" id="modal-schedule-date">-</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Time</span>
                                    <span class="info-value" id="modal-schedule-time">-</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Current Technician</span>
                                    <span class="info-value" id="modal-technician">-</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Status</span>
                                    <span class="info-value" id="modal-status">-</span>
                                </div>
                            </div>
                        </div>

                        <!-- Technician Assignment -->
                        <div class="info-section">
                            <h3>Assign Technician</h3>
                            <div class="form-group">
                                <label>Select Technician</label>
                                <select id="modal-technician-select" class="form-control">
                                    <option value="">Choose a technician...</option>
                                    <option value="tech1">John Smith - HVAC Specialist</option>
                                    <option value="tech2">Sarah Johnson - Electrical</option>
                                    <option value="tech3">Mike Davis - Plumbing</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Admin Notes</label>
                                <textarea id="modal-admin-notes" class="form-control" placeholder="Add internal notes..."></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button class="btn-secondary" onclick="closeScheduleModal()">Cancel</button>
                        <button class="btn-danger" onclick="markScheduleStatus('cancelled')">Cancel Schedule</button>
                        <button class="btn-primary" onclick="assignTechnician()">Assign & Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="buyback" style="display: none;">
            <div class="buyback-container">
                <div class="buyback-header">
                    <h1>Buy Back Management</h1>
                    <p>Manage customer buyback requests and approvals</p>
                </div>

                <!-- Stats Section -->
                <div class="buyback-stats">
                    <div class="stat-card">
                        <div class="stat-label">Pending</div>
                        <div class="stat-value" id="stat-pending">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Approved</div>
                        <div class="stat-value" id="stat-offer-sent">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Completed</div>
                        <div class="stat-value" id="stat-accepted">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Rejected</div>
                        <div class="stat-value" id="stat-rejected">0</div>
                    </div>
                </div>

                <!-- Filters Section -->
                <div class="buyback-filters">
                    <select id="filter-status" class="filter-select">
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <select id="filter-condition" class="filter-select">
                        <option value="">All Conditions</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>
                    <input type="text" id="filter-search" class="filter-search" placeholder="Search by customer name or component...">
                </div>

                <!-- Table Section -->
                <div class="buyback-table-wrapper">
                    <table id="buyback-table" class="buyback-table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Customer</th>
                                <th>Component</th>
                                <th>Condition</th>
                                <th>Asking Price</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="buyback-tbody">
                            <tr>
                                <td colspan="9" style="text-align: center; padding: 20px;">Loading requests...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Buyback Detail Modal -->
        <div id="buyback-modal" class="buyback-modal">
            <div class="buyback-modal-content">
                <div class="modal-header">
                    <div>
                        <h2>Product Review & Approval</h2>
                        <p style="color: #6b7280; font-size: 13px; margin: 5px 0 0 0;">Review customer product submission</p>
                    </div>
                    <button id="close-modal-btn" class="close-btn" onclick="closeBuybackModal()">&times;</button>
                </div>

                <div class="modal-body">
                    <!-- Product Images Section -->
                    <div class="section">
                        <h3>Product Images</h3>
                        <div class="image-gallery">
                            <div class="main-image">
                                <img id="modal-main-image" src="" alt="Product" style="width: 100%; height: 100%; object-fit: contain; background: #f3f4f6;">
                            </div>
                            <div class="thumbnail-container">
                                <img class="thumbnail" id="thumb-1" src="" alt="Thumbnail 1" onclick="setMainImage(this)">
                                <img class="thumbnail" id="thumb-2" src="" alt="Thumbnail 2" onclick="setMainImage(this)">
                                <img class="thumbnail" id="thumb-3" src="" alt="Thumbnail 3" onclick="setMainImage(this)">
                                <img class="thumbnail" id="thumb-4" src="" alt="Thumbnail 4" onclick="setMainImage(this)">
                            </div>
                        </div>
                    </div>

                    <!-- Customer Info -->
                    <div class="section">
                        <h3>Customer Information</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <label>Name</label>
                                <p id="modal-customer-name" style="font-weight: 600;"></p>
                            </div>
                            <div class="info-item">
                                <label>Contact Phone</label>
                                <p id="modal-customer-email" style="font-weight: 600;"></p>
                            </div>
                        </div>
                    </div>

                    <!-- Product Details -->
                    <div class="section">
                        <h3>Product Details</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <label>Product Name</label>
                                <p id="modal-component-name" style="font-weight: 600;"></p>
                            </div>
                            <div class="info-item">
                                <label>Category</label>
                                <p id="modal-component-category" style="font-weight: 600;"></p>
                            </div>
                        </div>
                        <div class="info-grid" style="margin-top: 15px;">
                            <div class="info-item">
                                <label>Condition</label>
                                <p id="modal-condition" style="font-weight: 600; display: inline-block;"></p>
                            </div>
                            <div class="info-item">
                                <label>Quantity</label>
                                <p id="modal-quantity" style="font-weight: 600;"></p>
                            </div>
                        </div>
                    </div>

                    <!-- Product Description -->
                    <div class="section">
                        <h3>Product Description</h3>
                        <div class="description-box">
                            <p id="modal-description" style="margin: 0; line-height: 1.6; color: #374151;"></p>
                        </div>
                    </div>

                    <!-- Pricing Section -->
                    <div class="section">
                        <h3>Pricing & Offer</h3>
                        <div class="pricing-box">
                            <div class="price-item">
                                <label>Customer Asking Price</label>
                                <p id="modal-expected-price" style="font-size: 20px; font-weight: 700; color: #3b82f6;"></p>
                            </div>
                            <div class="price-item">
                                <label>Your Offer Price</label>
                                <div class="offer-price-input">
                                    <span style="font-size: 16px; font-weight: 600; color: #4b5563;">$</span>
                                    <input type="number" id="modal-offer-price" class="offer-input" placeholder="Enter your offer" step="0.01" min="0">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Technician Notes -->
                    <div class="section">
                        <h3>Technician Notes & Decision</h3>
                        <div class="form-group">
                            <label>Current Status</label>
                            <p id="modal-status" class="status-badge" style="display: inline-block;"></p>
                        </div>
                        <div class="form-group">
                            <label>Internal Notes (Optional)</label>
                            <textarea id="modal-offer-message" class="form-textarea" placeholder="Add inspection notes, reasons for rejection, or offer justification..."></textarea>
                        </div>
                    </div>

                    <!-- Decision Summary -->
                    <div class="section" style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                        <h3 style="margin-top: 0;">Decision Guide</h3>
                        <ul style="margin: 10px 0; padding-left: 20px; color: #6b7280; font-size: 13px;">
                            <li><strong>Approve:</strong> Accept the product at the price you enter above</li>
                            <li><strong>Reject:</strong> Decline the product (add reason in notes)</li>
                            <li>All decisions are logged with timestamp and technician name</li>
                        </ul>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeBuybackModal()">Close</button>
                    <button class="btn-danger" onclick="rejectBuybackRequest()">
                        <i class="fa-solid fa-times" style="margin-right: 5px;"></i>Reject Product
                    </button>
                    <button class="btn-primary" onclick="approveBuybackRequest()">
                        <i class="fa-solid fa-check" style="margin-right: 5px;"></i>Approve & Set Offer
                    </button>
                </div>
            </div>
        </div>

        <div id="product-management">
            <div id="products" style="display: none;">
                <nav>
                    <i id="search-icon" class="fa-solid fa-magnifying-glass" style="color: #2563eb;"></i>
                    <input type="search" placeholder="Search for a product...">

                    <select name="type" id="type">
                        <option value="allRoles">All types</option>
                        <option value="superadmin">Processor</option>
                        <option value="admin">Keyboards</option>
                        <option value="technician">Mouse</option>
                        <option value="user">Monitor</option>
                    </select>
                    <select name="status" id="status">
                        <option value="allStatus">All status</option>
                        <option value="active">Active</option>
                        <option value="suspended">Out of stock</option>
                    </select>
                    <button id="add-product">
                        <i class="fa-solid fa-boxes-stacked" style="color: white"></i>
                        Add product
                    </button>
                </nav>
                <!--end of product management nav-->

                <div id="table-header"
                    style="display: flex; justify-content: flex-end; align-items: center; padding: 15px 20px; gap: 10px;">
                    <button id="refresh-product-table"
                        style="height: 2.6rem; padding: 0 20px; background-color: skyblue; border: none; border-radius: 7px; color: white; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-rotate-right"></i>
                        Refresh
                    </button>
                </div>

                <div class="table-list">
                    <table id="product-list">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--end of table div-->

                <div id="add-user" class="insert-user">
                    <form method="POST" action="#" id="sign-up" enctype="multipart/form-data">
                        <div id="header">
                            <p>Add products to the shelves</p>
                        </div>
                        <div id="user-body">
                            <label for="productname">Product name</label>
                            <input type="text" id="productname" name="productname" placeholder="Enter product name" required>
                            <p></p>

                            <label for="category">Category</label>
                            <input type="text" id="category" name="category" placeholder="Enter category" required>
                            <p></p>

                            <label for="quantity">Quantity</label>
                            <input type="text" id="quantity" name="quantity" placeholder="Enter quantity" required>
                            <p></p>

                            <label for="price">Price</label>
                            <input type="text" id="price" name="price" placeholder="Enter price" required>
                            <p></p>

                            <label for="product_image">Product Image</label>
                            <input type="file" id="product_image" name="product_image" accept="image/*" required>
                            <p style="font-size: 12px; color: #6b7280;">Supported formats: JPG, PNG, GIF, WebP, AVIF (Max 5MB)</p>
                            <p></p>

                            <div id="submit-area">
                                <button type="submit">Add product</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!--end of add product panel-->
            </div>

            <div id="categories-brands" style="display: none;">
                <p>Categories & Brands content will go here</p>
            </div>

            <div id="stock-management" style="display: none;">
                <p>Stock Management content will go here</p>
            </div>

            <div id="used-components" style="display: none;">
                <p>Used Components content will go here</p>
            </div>
        </div>
        <!--end of product management-->
    </div>
    <!--end of content area-->
</body>

</html>
