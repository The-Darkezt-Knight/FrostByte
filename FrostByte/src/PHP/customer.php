<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer panel</title>
    <link rel="stylesheet" href="/FrostByte/src/css/side_panel.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/main-panel/customer.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/main-panel/header.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/main-panel/categories.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/main-panel/product-overview.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/billing-details.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/order-confirmation.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/order-success.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/orders/order.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/orders/header.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/orders/orders-new.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/cart/cart.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/cart/cart-new.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/settings/settings.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/services/services.css">
    <link rel="stylesheet" href="/FrostByte/src/css/customer/sell-parts/sell-parts.css">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script src="/FrostByte/src/js/auth/session.js" defer></script>
    <script src="/FrostByte/src/js/customer/customer-panel.js" defer></script>
    <script src="/FrostByte/src/js/customer/shop-products.js" defer></script>
    <script src="/FrostByte/src/js/customer/product-overview.js" defer></script>
    <script src="/FrostByte/src/js/customer/billing-details.js" defer></script>
    <script src="/FrostByte/src/js/customer/order-confirmation.js" defer></script>
    <script src="/FrostByte/src/js/customer/order-success.js" defer></script>
    <script src="/FrostByte/src/js/customer/orders-new.js" defer></script>
    <script src="/FrostByte/src/js/customer/cart-management.js" defer></script>
    <script src="/FrostByte/src/js/customer/services-booking-new.js" defer></script>
    <script src="/FrostByte/src/js/customer/sell-parts-new.js" defer></script>

</head>

<body>
    <aside>
        <header>
            <i class="fa-solid fa-terminal" style="color: #2563eb;"></i>
            <div>
                <p>Customer</p>
                <p id="userNameDisplay">Loading...</p>
            </div>
        </header>
        <main>
            <div class="container" id="main-panel-btn">
                <i class="fa-solid fa-shop" style="color: #2563eb"></i>
                <div>
                    <p class="header">Shop</p>
                    <p class="subheader">Shop and buy products at the best price</p>
                </div>
            </div>

            <div class="container" id="orders-btn">
                <i class="fa-solid fa-box" style="color: #2563eb"></i>
                <div>
                    <p class="header">Orders</p>
                    <p class="subheader">View purchases</p>
                </div>
            </div>

            <div class="container" id="cart-btn">
                <i class="fa-solid fa-shopping-cart" style="color: #2563eb;"></i>
                <div>
                    <p class="header">Cart</p>
                    <p class="subheader">View and manage added to cart products</p>
                </div>
            </div>

            <div class="container" id="services-btn">
                <i class="fa-solid fa-wrench" style="color: #2563eb;"></i>
                <div>
                    <p class="header">Services</p>
                    <p class="subheader">Book services and maintenance</p>
                </div>
            </div>

            <div class="container" id="sell-parts-btn">
                <i class="fa-solid fa-tag" style="color: #2563eb;"></i>
                <div>
                    <p class="header">Sell Parts</p>
                    <p class="subheader">Sell your PC components for cash</p>
                </div>
            </div>

            <div class="container" id="account-settings-btn">
                <i class="fa-solid fa-gear" style="color: #2563eb;"></i>
                <div>
                    <p class="header">Settings</p>
                    <p class="subheader">Configure account settings</p>
                </div>
            </div>
        </main>
        <footer>
            <i class="fa-solid fa-arrow-right-from-bracket" style="color: red;"></i>
            <button onclick="logout()" style="background: none; border: none; color: inherit; cursor: pointer; padding: 0; text-decoration: none;">Sign out</button>
        </footer>
    </aside>

    <div id="content-area">

        <div id="main-panel">
            <div id="header">
                <div id="logo-section">
                    <img src="/FrostByte/resources/images/FrostByte-logo-svg.svg" alt="">
                    <p>FrostByte</p>
                </div>
                <span>
                    <input type="search" placeholder="Can't find what you're looking for?">
                    <ul>
                        <li>Mouse</li>
                        <li>Keyboard</li>
                        <li>Monitor</li>
                        <li>CPU</li>
                    </ul>
                </span>
            </div>
            <!--end of header-->

            <div class="categories">

                <div class="title">
                    <p>Browse with over hundreds of products</p>
                </div>

                <div class="body">
                    <div class="card">
                        <div class="upper">
                            <img src="/FrostByte/resources/images/products/Ryzen 9 9600x.jpg" alt="">
                        </div>
                        <div class="bottom">
                            <p>CPUs</p>
                            <p>Ryzen 9 9600x</p>
                            <p>₱15,999</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="upper">
                            <img src="/FrostByte/resources/images/products/RTX 4090.jpg" alt="">
                        </div>
                        <div class="bottom">
                            <p>GPUs</p>
                            <p>RTX 4090</p>
                            <p>₱89,999</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="upper">
                            <img src="/FrostByte/resources/images/products/Logitech MX Master 3.jpg" alt="">
                        </div>
                        <div class="bottom">
                            <p>Peripherals</p>
                            <p>Logitech MX Master 3</p>
                            <p>₱4,599</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="upper">
                            <img src="/FrostByte/resources/images/products/Gaming Keyboard RGB.jpg" alt="">
                        </div>
                        <div class="bottom">
                            <p>Peripherals</p>
                            <p>Gaming Keyboard RGB</p>
                            <p>₱2,999</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--end of categories-->

            <div class="shelves" id="mouse-section">

                <div class="title">
                    <p>Processors</p>
                </div>

                <div class="body">
                    <div class="card">
                        <div class="upper">
                            <img src="/FrostByte/resources/images/products/Ryzen 9 9600x.jpg" alt="">
                        </div>
                        <div class="bottom">
                            <p>CPUs</p>
                            <p>Ryzen 9 9600x</p>
                            <p>₱15,999</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--end of mouse section-->

            <div class="shelves" id="monitor-section">

                <div class="title">
                    <p>Graphics Cards</p>
                </div>

                <div class="body">
                    <div class="card">
                        <div class="upper">
                            <img src="/FrostByte/resources/images/products/RTX 4090.jpg" alt="">
                        </div>
                        <div class="bottom">
                            <p>GPUs</p>
                            <p>RTX 4090</p>
                            <p>₱89,999</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--end of monitor section-->

            <div class="shelves" id="headset-section">

                <div class="title">
                    <p>Peripherals</p>
                </div>

                <div class="body">
                    <div class="card">
                        <div class="upper">
                            <img src="/FrostByte/resources/images/products/Logitech MX Master 3.jpg" alt="">
                        </div>
                        <div class="bottom">
                            <p>Peripherals</p>
                            <p>Logitech MX Master 3</p>
                            <p>₱4,599</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--end of headset section-->

        </div>
        <!--end of main-panel-->

        <div id="orders">
            <!-- Orders Main View -->
            <div id="orders-main" class="orders-container">
                <div class="orders-header">
                    <h2>My Orders</h2>
                </div>

                <!-- Search and Filters -->
                <div class="orders-controls">
                    <div class="search-box">
                        <i class="fa-solid fa-search"></i>
                        <input type="text" id="ordersSearch" placeholder="Search by order ID...">
                    </div>
                    <div class="status-filters">
                        <button class="status-btn active" data-status="all">All</button>
                        <button class="status-btn" data-status="pending">Pending</button>
                        <button class="status-btn" data-status="to ship">To Ship</button>
                        <button class="status-btn" data-status="out for delivery">Out for Delivery</button>
                        <button class="status-btn" data-status="delivered">Delivered</button>
                        <button class="status-btn" data-status="cancelled">Cancelled</button>
                    </div>
                </div>

                <!-- Orders List -->
                <div class="orders-list" id="ordersList">
                    <p class="empty-state">Loading orders...</p>
                </div>
            </div>
        </div>
        <!--end of orders-->

        <div id="cart">
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="fa-solid fa-shopping-cart"></i>
                </div>
                <h3 class="empty-cart-title">Your cart is empty</h3>
                <p class="empty-cart-message">Start adding products to your cart!</p>
                <button class="empty-cart-btn" onclick="goToShop()">Start Shopping</button>
            </div>
        </div>

        <!--end of cart-->

        <div id="services">
            <!-- Services Main View -->
            <div id="services-main" class="services-container">
                <div class="services-header">
                    <h2>Services & Installation</h2>
                </div>

                <!-- Inline Booking Form -->
                <div class="inline-booking-section">
                    <div class="booking-card">
                        <h3>Book a New Service</h3>
                        <form id="inlineBookingForm" class="inline-booking-form">
                            <!-- Service Type -->
                            <div class="form-group">
                                <label for="serviceType">Service Type *</label>
                                <select id="serviceType" name="serviceType" required>
                                    <option value="">Select a service...</option>
                                    <option value="pc-assembly">PC Assembly (₱1,500)</option>
                                    <option value="office-setup">Office Setup (₱3,000)</option>
                                    <option value="school-lab">School Lab Setup (₱5,000)</option>
                                    <option value="diagnostics">Diagnostics / Repair (₱500)</option>
                                </select>
                            </div>

                            <!-- Date and Time -->
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="serviceDate">Preferred Date *</label>
                                    <input type="date" id="serviceDate" name="serviceDate" required>
                                </div>
                                <div class="form-group">
                                    <label for="serviceTime">Preferred Time *</label>
                                    <select id="serviceTime" name="serviceTime" required>
                                        <option value="">Select time slot...</option>
                                        <option value="09:00 - 11:00">09:00 - 11:00</option>
                                        <option value="11:00 - 13:00">11:00 - 13:00</option>
                                        <option value="14:00 - 16:00">14:00 - 16:00</option>
                                        <option value="16:00 - 18:00">16:00 - 18:00</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Address -->
                            <div class="form-group">
                                <label for="serviceAddress">Address *</label>
                                <textarea id="serviceAddress" name="serviceAddress" placeholder="Enter complete service address..." rows="3" required></textarea>
                            </div>

                            <!-- Contact Number -->
                            <div class="form-group">
                                <label for="serviceContact">Contact Number *</label>
                                <input type="tel" id="serviceContact" name="serviceContact" placeholder="+63 000.000.0000" required>
                            </div>

                            <!-- Additional Notes -->
                            <div class="form-group">
                                <label for="serviceNotes">Additional Notes (Optional)</label>
                                <textarea id="serviceNotes" name="serviceNotes" placeholder="Any special instructions or requirements..." rows="3"></textarea>
                            </div>

                            <button type="submit" class="submit-booking-btn">
                                <i class="fa-solid fa-check"></i>
                                Submit Service Request
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Service Requests List -->
                <div class="service-requests-container">
                    <h3>My Service Requests</h3>
                    <div class="service-requests-list" id="serviceRequestsList">
                        <!-- Service requests will be populated here -->
                        <p class="empty-state">No service requests yet. Book a service to get started!</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sell Parts Section -->
        <div id="sell-parts">
            <!-- Sell Parts Main View -->
            <div id="sell-parts-main" class="sell-parts-container">
                <div class="sell-parts-header">
                    <h2>Sell Your PC Parts</h2>
                    <button class="sell-parts-submit-btn" id="submitPartBtn">
                        <i class="fa-solid fa-plus"></i>
                        Submit New Item
                    </button>
                </div>

                <!-- Buyback Requests List -->
                <div class="sell-parts-requests">
                    <h3>My Buyback Requests</h3>
                    <div id="buybackRequestsList" class="buyback-list">
                        <p class="empty-state">No buyback requests yet. Submit an item to get started!</p>
                    </div>
                </div>
            </div>

            <!-- Submit Item Modal -->
            <div id="submitPartModal" class="submit-part-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Submit Item for Buyback</h2>
                        <button class="modal-close-btn" onclick="closeSubmitPartModal()">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div class="modal-body">
                        <!-- Component Type -->
                        <div class="form-group">
                            <label>Component Type <span class="required">*</span></label>
                            <div class="component-grid">
                                <button type="button" class="component-btn" data-type="CPU">CPU</button>
                                <button type="button" class="component-btn" data-type="GPU">GPU</button>
                                <button type="button" class="component-btn" data-type="RAM">RAM</button>
                                <button type="button" class="component-btn" data-type="Motherboard">Motherboard</button>
                                <button type="button" class="component-btn" data-type="Storage">Storage</button>
                                <button type="button" class="component-btn" data-type="PSU">PSU</button>
                                <button type="button" class="component-btn" data-type="Case">Case</button>
                                <button type="button" class="component-btn" data-type="Monitor">Monitor</button>
                                <button type="button" class="component-btn" data-type="Peripherals">Peripherals</button>
                            </div>
                        </div>

                        <!-- Product Details -->
                        <div class="form-group">
                            <label>Product Name <span class="required">*</span></label>
                            <input type="text" id="productNameInput" placeholder="e.g., NVIDIA GeForce RTX 4090" class="form-input">
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Purchase Date (Optional)</label>
                                <input type="date" id="purchaseDateInput" class="form-input">
                            </div>
                            <div class="form-group">
                                <label>Original Price (Optional)</label>
                                <input type="number" id="originalPriceInput" placeholder="₱ 0.00" class="form-input">
                            </div>
                        </div>

                        <!-- Condition -->
                        <div class="form-group">
                            <label>Condition <span class="required">*</span></label>
                            <div class="condition-grid">
                                <button type="button" class="condition-btn" data-condition="excellent">
                                    <span class="condition-label">Excellent</span>
                                    <span class="condition-desc">Like new, no visible wear</span>
                                </button>
                                <button type="button" class="condition-btn" data-condition="good">
                                    <span class="condition-label">Good</span>
                                    <span class="condition-desc">Minor signs of use, fully functional</span>
                                </button>
                                <button type="button" class="condition-btn" data-condition="fair">
                                    <span class="condition-label">Fair</span>
                                    <span class="condition-desc">Visible wear, but works properly</span>
                                </button>
                                <button type="button" class="condition-btn" data-condition="poor">
                                    <span class="condition-label">Poor</span>
                                    <span class="condition-desc">Heavy wear or minor defects</span>
                                </button>
                            </div>
                        </div>

                        <!-- Asking Price and Contact Phone -->
                        <div class="form-row">
                            <div class="form-group">
                                <label>Asking Price <span class="required">*</span></label>
                                <input type="number" id="askingPriceInput" placeholder="₱ 0.00" class="form-input" step="0.01" min="0">
                            </div>
                            <div class="form-group">
                                <label>Contact Phone <span class="required">*</span></label>
                                <input type="tel" id="contactPhoneInput" placeholder="+63 000.000.0000" class="form-input">
                            </div>
                        </div>

                        <!-- Quantity -->
                        <div class="form-group">
                            <label>Quantity <span class="required">*</span></label>
                            <input type="number" id="quantityInput" placeholder="1" class="form-input" min="1" value="1">
                        </div>

                        <!-- Photos Upload -->
                        <div class="form-group">
                            <label>Product Photos <span class="required">*</span></label>
                            <div class="photo-grid">
                                <button type="button" class="photo-upload-btn" data-index="1">
                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                    <span class="photo-status">Photo 1</span>
                                </button>
                                <button type="button" class="photo-upload-btn" data-index="2">
                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                    <span class="photo-status">Photo 2</span>
                                </button>
                                <button type="button" class="photo-upload-btn" data-index="3">
                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                    <span class="photo-status">Photo 3</span>
                                </button>
                                <button type="button" class="photo-upload-btn" data-index="4">
                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                    <span class="photo-status">Photo 4</span>
                                </button>
                            </div>
                            <p class="form-hint">Upload clear photos from multiple angles (minimum 1 photo required, maximum 4)</p>
                        </div>

                        <!-- Additional Information -->
                        <div class="form-group">
                            <label>Additional Information (Optional)</label>
                            <textarea id="additionalInfoInput" placeholder="Warranty status, included accessories, known issues, etc." class="form-textarea"></textarea>
                        </div>

                        <!-- Info Box -->
                        <div class="info-box">
                            <h4>How it works</h4>
                            <ul>
                                <li>1. Submit your item details and photos</li>
                                <li>2. Our team will review and provide an offer within 24-48 hours</li>
                                <li>3. Accept the offer and schedule a pickup</li>
                                <li>4. Get paid via your preferred payment method</li>
                            </ul>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button class="btn-cancel" onclick="closeSubmitPartModal()">Cancel</button>
                        <button class="btn-submit" id="submitBtn" disabled>Submit for Appraisal</button>
                    </div>
                </div>
            </div>

            <!-- Sell Part Details Modal -->
            <div id="sellPartDetailsModal" class="sell-part-details-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Item Details</h2>
                        <button class="modal-close-btn" onclick="closeSellPartDetailsModal()">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div class="modal-body">
                        <div class="details-grid">
                            <!-- Image Gallery -->
                            <div class="image-gallery">
                                <div class="main-image-container">
                                    <img id="mainImage" src="" alt="Item Image">
                                </div>
                                <div class="thumbnail-images">
                                    <img id="thumb1" class="thumbnail" onclick="changeMainImage(this)" style="display:none;">
                                    <img id="thumb2" class="thumbnail" onclick="changeMainImage(this)" style="display:none;">
                                    <img id="thumb3" class="thumbnail" onclick="changeMainImage(this)" style="display:none;">
                                    <img id="thumb4" class="thumbnail" onclick="changeMainImage(this)" style="display:none;">
                                </div>
                            </div>

                            <!-- Item Information -->
                            <div class="item-info">
                                <div class="info-row">
                                    <span class="info-label">Request ID:</span>
                                    <span class="info-value" id="detailRequestId">-</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Product Name:</span>
                                    <span class="info-value" id="detailProductName">-</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Category:</span>
                                    <span class="info-value" id="detailCategory">-</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Condition:</span>
                                    <span class="info-value" id="detailCondition">-</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Asking Price:</span>
                                    <span class="info-value price" id="detailPrice">-</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Quantity:</span>
                                    <span class="info-value" id="detailQuantity">-</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Contact Phone:</span>
                                    <span class="info-value" id="detailPhone">-</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Status:</span>
                                    <span class="info-value" id="detailStatus">-</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Submitted:</span>
                                    <span class="info-value" id="detailDate">-</span>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="description-section" id="descriptionSection" style="display:none;">
                            <h3>Description</h3>
                            <p id="detailDescription">-</p>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button class="btn-cancel" onclick="closeSellPartDetailsModal()">Close</button>
                        <button class="btn-cancel danger" id="detailCancelBtn" onclick="confirmCancelSellPart()" style="display:none;">
                            <i class="fa-solid fa-trash"></i> Cancel Request
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="account-settings">
            <div id="container">
                <h2 class="settings-title">Account Settings</h2>

                <!-- Profile Info -->
                <div class="settings-card">
                    <h3 class="card-title">Profile Information</h3>
                    <div class="card-content">
                        <label for="full-name">Full Name</label>
                        <input type="text" id="full-name" placeholder="Enter name">

                        <label for="settings-email">Email Address</label>
                        <input type="email" id="settings-email" placeholder="Enter email">

                        <label for="settings-phone">Phone Number</label>
                        <input type="text" id="settings-phone" placeholder="Enter phone number">

                        <button class="save-btn">Save Changes</button>
                    </div>
                </div>

                <!-- Change Password -->
                <div class="settings-card">
                    <h3 class="card-title">Change Password</h3>
                    <div class="card-content">
                        <label for="current-password">Current Password</label>
                        <input type="password" id="current-password">

                        <label for="new-password">New Password</label>
                        <input type="password" id="new-password">

                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password">

                        <button class="save-btn">Update Password</button>
                    </div>
                </div>

                <!-- Notifications -->
                <div class="settings-card">
                    <h3 class="card-title">Notifications</h3>
                    <div class="card-content">
                        <label>
                            <input type="checkbox" checked>
                            Receive promotional emails
                        </label>
                        <label>
                            <input type="checkbox">
                            Receive order updates via SMS
                        </label>
                        <label>
                            <input type="checkbox" checked>
                            Notify me about new products
                        </label>

                        <button class="save-btn">Save Preferences</button>
                    </div>
                </div>
            </div>
        </div>
        <!--end of account-settings-->
    </div>

    <!-- Product Overview Modal -->
    <div id="productModal" class="product-modal">
        <button class="close-product-modal">&times;</button>
        <div class="product-modal-content">
            <!-- Left side - Product Image -->
            <div class="product-modal-image">
                <img id="modal-product-image" src="" alt="Product Image">
            </div>

            <!-- Right side - Product Details -->
            <div class="product-modal-details">
                <p id="modal-product-category" class="product-modal-category"></p>
                <h2 id="modal-product-title" class="product-modal-title"></h2>

                <div class="product-modal-rating">
                    <span id="modal-product-rating" class="stars"></span>
                </div>

                <div class="product-modal-price-section">
                    <span id="modal-product-price" class="product-modal-price"></span>
                    <span id="modal-product-stock" class="product-modal-stock"></span>
                </div>

                <p id="modal-product-description" class="product-modal-description"></p>

                <!-- Quantity Selector -->
                <div class="quantity-section">
                    <label>Quantity:</label>
                    <div class="quantity-selector">
                        <button id="decreaseQuantity">−</button>
                        <input type="number" id="quantityInput" value="1" min="1">
                        <button id="increaseQuantity">+</button>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="action-buttons">
                    <button id="addToCartBtn" class="btn-add-to-cart">
                        <i class="fa-solid fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button id="buyNowBtn" class="btn-buy-now">
                        Buy Now
                    </button>
                </div>

                <!-- Wishlist Button -->
                <button id="wishlistBtn" class="btn-wishlist" title="Add to Wishlist">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Billing Details Modal -->
    <div id="billingModal">
        <button class="billing-close-btn">&times;</button>
        <div class="billing-container">
            <!-- Left Column - Billing Form -->
            <div class="billing-form-section">
                <h2>Billing Details</h2>
                <form id="billingForm">
                    <div class="form-group">
                        <label for="firstName">First Name <span style="color: #ef4444;">*</span></label>
                        <input type="text" id="firstName" name="firstName" placeholder="John" required>
                    </div>

                    <div class="form-group">
                        <label for="companyName">Company Name (Optional)</label>
                        <input type="text" id="companyName" name="companyName" placeholder="Your Company">
                    </div>

                    <div class="form-group">
                        <label for="streetAddress">Street Address <span style="color: #ef4444;">*</span></label>
                        <input type="text" id="streetAddress" name="streetAddress" placeholder="123 Main Street" required>
                    </div>

                    <div class="form-group">
                        <label for="brgy">Brgy <span style="color: #ef4444;">*</span></label>
                        <input type="text" id="brgy" name="brgy" placeholder="Barangay" required>
                    </div>

                    <div class="form-group">
                        <label for="town">Town/City <span style="color: #ef4444;">*</span></label>
                        <input type="text" id="town" name="town" placeholder="Manila" required>
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone Number <span style="color: #ef4444;">*</span></label>
                        <input type="tel" id="phone" name="phone" placeholder="+63 9XX XXX XXXX" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email Address <span style="color: #ef4444;">*</span></label>
                        <input type="email" id="email" name="email" placeholder="email@example.com" required>
                    </div>

                    <div class="form-group">
                        <label>Payment Method <span style="color: #ef4444;">*</span></label>
                        <div class="payment-methods">
                            <div class="payment-method">
                                <input type="radio" id="bankPayment" name="paymentMethod" value="bank" required>
                                <label for="bankPayment">
                                    <span>Bank Transfer</span>
                                </label>
                                <div class="payment-icons">
                                    <span style="font-size: 12px; color: #6b7280;">Visa, Mastercard, etc.</span>
                                </div>
                            </div>
                            <div class="payment-method">
                                <input type="radio" id="codPayment" name="paymentMethod" value="cod" required>
                                <label for="codPayment">
                                    <span>Cash on Delivery</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="checkbox-group">
                        <input type="checkbox" id="saveInfo" name="saveInfo">
                        <label for="saveInfo">Save this information for faster check-out next time</label>
                    </div>
                </form>
            </div>

            <!-- Right Column - Order Summary -->
            <div class="billing-summary-section">
                <h2>Order Summary</h2>
                
                <div class="order-summary">
                    <div id="billingOrderItems">
                        <!-- Items will be populated here -->
                    </div>

                    <div class="order-totals">
                        <div class="total-row subtotal">
                            <span>Subtotal:</span>
                            <span id="billingSubtotal">₱0.00</span>
                        </div>
                        <div class="total-row shipping">
                            <span>Shipping:</span>
                            <span id="billingShipping">Free</span>
                        </div>
                        <div class="total-row total">
                            <span>Total:</span>
                            <span class="amount" id="billingTotal">₱0.00</span>
                        </div>
                    </div>

                    <div class="coupon-section">
                        <input type="text" id="couponCode" placeholder="Coupon Code">
                        <button type="button">Apply Coupon</button>
                    </div>
                </div>

                <div class="action-buttons">
                    <button type="button" class="place-order-btn">Place Order</button>
                    <button type="button" class="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Order Confirmation Modal -->
    <div id="orderConfirmationModal">
        <button class="confirmation-close-btn">&times;</button>
        <div class="confirmation-container">
            <!-- Header -->
            <div class="confirmation-header">
                <h1>Review Your Order</h1>
                <p>Please verify your details and order information before confirming</p>
            </div>

            <!-- Billing Information -->
            <div class="confirmation-section">
                <h3 class="section-title">Delivery Address</h3>
                <div class="billing-info-grid">
                    <div class="info-item">
                        <span class="info-label">Full Name</span>
                        <span class="info-value" id="confirmFirstName">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Company Name</span>
                        <span class="info-value" id="confirmCompanyName">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Street Address</span>
                        <span class="info-value" id="confirmStreetAddress">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Barangay</span>
                        <span class="info-value" id="confirmBrgy">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Town/City</span>
                        <span class="info-value" id="confirmTown">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Phone Number</span>
                        <span class="info-value" id="confirmPhone">-</span>
                    </div>
                    <div class="info-item" style="grid-column: 1 / -1;">
                        <span class="info-label">Email Address</span>
                        <span class="info-value" id="confirmEmail">-</span>
                    </div>
                </div>
            </div>

            <!-- Order Items -->
            <div class="confirmation-section">
                <h3 class="section-title">Order Items</h3>
                <div class="confirmation-items" id="confirmationOrderItems">
                    <!-- Items will be populated here -->
                </div>
            </div>

            <!-- Payment Method -->
            <div class="confirmation-section">
                <h3 class="section-title">Payment Method</h3>
                <div class="payment-method-display">
                    <span id="paymentMethodDisplay"></span>
                    <div class="payment-method-text">
                        <div class="payment-method-label">Payment Method</div>
                        <div class="payment-method-value" id="paymentMethodValue">-</div>
                    </div>
                </div>
            </div>

            <!-- Order Summary -->
            <div class="confirmation-section">
                <h3 class="section-title">Order Summary</h3>
                <div class="confirmation-totals">
                    <div class="total-row subtotal">
                        <span>Subtotal</span>
                        <span id="confirmSubtotal">₱0.00</span>
                    </div>
                    <div class="total-row shipping">
                        <span>Shipping</span>
                        <span id="confirmShipping">Free</span>
                    </div>
                    <div class="total-row total">
                        <span>Total Amount</span>
                        <span class="amount" id="confirmTotal">₱0.00</span>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="confirmation-buttons">
                <button type="button" class="confirm-btn">Order Now</button>
                <button type="button" class="cancel-btn">Cancel</button>
            </div>
        </div>
    </div>

    <!-- Order Success Modal -->
    <div id="orderSuccessModal">
        <div class="success-container">
            <!-- Success Icon with Animated Dots -->
            <div class="success-icon-container">
                <div class="success-dots">
                    <div class="success-dot"></div>
                    <div class="success-dot"></div>
                    <div class="success-dot"></div>
                    <div class="success-dot"></div>
                    <div class="success-dot"></div>
                    <div class="success-dot"></div>
                </div>
                <div class="success-icon">
                    <i class="fa-solid fa-check"></i>
                </div>
            </div>

            <!-- Success Message -->
            <div class="success-message">
                <h2 class="success-title">Thank you for ordering!</h2>
                <p class="success-description">Your order has been confirmed and will be processed soon. We'll send you an email with your order details and tracking information.</p>
                <div class="order-number">Order Number: ORD-1234567890</div>
            </div>

            <!-- Action Buttons -->
            <div class="success-buttons">
                <button class="view-order-btn" onclick="closeSuccessAndViewOrder()">View Order</button>
                <button class="continue-shopping-btn" onclick="continueShopping()">Continue Shopping</button>
            </div>
        </div>
    </div>

</body>

</html>
