/**
 * Orders Management
 * Handles displaying and filtering customer orders
 */

let allOrders = [];
let currentFilterStatus = 'all';
let currentSearchQuery = '';

/**
 * Initialize Orders Module
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('Orders module initializing');
    initializeOrdersPage();
});

/**
 * Initialize Orders Page
 */
function initializeOrdersPage() {
    console.log('initializeOrdersPage called');
    
    // Set up search input
    const searchInput = document.getElementById('ordersSearch');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }

    // Set up filter buttons
    const filterButtons = document.querySelectorAll('.status-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleStatusFilter);
    });

    // Load orders from database
    loadOrders();
}

/**
 * Load Orders from Database
 */
function loadOrders() {
    const ordersList = document.getElementById('ordersList');
    if (!ordersList) return;

    ordersList.innerHTML = '<p class="empty-state">Loading orders...</p>';

    fetch('/FrostByte/src/PHP/api/get_orders.php')
        .then(response => {
            console.log('Orders API response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Orders data received:', data);
            
            // Handle both direct array and wrapped response formats
            allOrders = Array.isArray(data) ? data : (data.data || []);
            
            console.log('Total orders:', allOrders.length);
            
            if (!allOrders || allOrders.length === 0) {
                ordersList.innerHTML = '<p class="empty-state">No orders found. Start shopping!</p>';
                return;
            }

            displayOrders();
        })
        .catch(error => {
            console.error('Error loading orders:', error);
            ordersList.innerHTML = '<p class="empty-state">Error loading orders</p>';
        });
}

/**
 * Handle Search Input
 */
function handleSearchInput(e) {
    currentSearchQuery = e.target.value.toLowerCase();
    applyFilters();
}

/**
 * Handle Status Filter
 */
function handleStatusFilter(e) {
    // Remove active class from all buttons
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to clicked button
    e.target.classList.add('active');
    
    currentFilterStatus = e.target.getAttribute('data-status');
    applyFilters();
}

/**
 * Apply Filters and Display Orders
 */
function applyFilters() {
    const filteredOrders = allOrders.filter(order => {
        // Filter by status
        const matchesStatus = currentFilterStatus === 'all' || 
                            order.status.toLowerCase() === currentFilterStatus.toLowerCase();
        
        // Filter by search query
        const matchesSearch = order.order_id.toLowerCase().includes(currentSearchQuery);
        
        return matchesStatus && matchesSearch;
    });

    displayOrders(filteredOrders);
}

/**
 * Display Orders
 */
function displayOrders(orders = allOrders) {
    const ordersList = document.getElementById('ordersList');
    
    if (!orders || orders.length === 0) {
        ordersList.innerHTML = '<p class="empty-state">No orders found</p>';
        return;
    }

    ordersList.innerHTML = '';

    orders.forEach(order => {
        const card = createOrderCard(order);
        ordersList.appendChild(card);
    });
}

/**
 * Create Order Card
 */
function createOrderCard(order) {
    const card = document.createElement('div');
    card.className = 'order-card';

    // Format date
    let formattedDate = 'N/A';
    try {
        const orderDate = new Date(order.created_at);
        formattedDate = orderDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        formattedDate = order.created_at || 'N/A';
    }

    // Get status class
    const statusClass = order.status.toLowerCase().replace(/\s+/g, '-');
    
    // Format total
    const formattedTotal = `₱${(order.total || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    // Create items HTML - condensed version
    let itemsHtml = '';
    if (order.items && Array.isArray(order.items) && order.items.length > 0) {
        // Show only first 2 items to keep card compact
        const displayItems = order.items.slice(0, 2);
        itemsHtml = displayItems.map(item => `
            <div class="order-item">
                <div class="order-item-info">
                    <div class="order-item-image">
                        <img src="${item.product_image || '/FrostByte/resources/images/placeholder.png'}" alt="${item.product_name || 'Product'}">
                    </div>
                    <div class="order-item-details">
                        <div class="order-item-name">${item.product_name || 'Product'}</div>
                        <div class="order-item-qty">x${item.quantity || 1}</div>
                    </div>
                </div>
                <div class="order-item-price">₱${(item.price || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>
        `).join('');
        
        // Add "more items" indicator if there are more
        if (order.items.length > 2) {
            itemsHtml += `<div class="order-item" style="padding: 5px 0; opacity: 0.7; font-size: 11px; color: #6b7280;"><em>+${order.items.length - 2} more item(s)</em></div>`;
        }
    }

    // Create action buttons
    let actionsHtml = `
        <button class="view-details" onclick="viewOrderDetails('${order.order_id}')">View Details</button>
    `;

    // Add reorder button for delivered orders
    if (order.status.toLowerCase() === 'delivered') {
        actionsHtml += `
            <button class="reorder" onclick="showReorderConfirmation('${order.order_id}')">Reorder</button>
        `;
    }

    card.innerHTML = `
        <div class="order-card-header">
            <div class="order-card-info">
                <div class="order-card-id">
                    <div class="id">${order.order_id}</div>
                    <div class="date">${formattedDate}</div>
                </div>
                <span class="order-status-badge ${statusClass}">${order.status}</span>
            </div>
            <div class="order-card-total">
                <div class="label">Total</div>
                <div class="amount">${formattedTotal}</div>
            </div>
        </div>

        <div class="order-items">
            <div class="order-items-list">
                ${itemsHtml}
            </div>
        </div>

        <div class="order-card-actions">
            ${actionsHtml}
        </div>
    `;

    return card;
}

/**
 * View Order Details
 */
function viewOrderDetails(orderId) {
    console.log('Viewing order details:', orderId);
    // TODO: Implement order detail view
    toastr.info('Order details view coming soon');
}

/**
 * Show Reorder Confirmation
 */
function showReorderConfirmation(orderId) {
    const order = allOrders.find(o => o.order_id === orderId);
    if (!order) return;

    // Show confirmation modal
    const modal = document.createElement('div');
    modal.className = 'reorder-modal active';
    modal.id = `reorder-modal-${orderId}`;
    modal.innerHTML = `
        <div class="reorder-modal-content">
            <div class="reorder-modal-icon">
                <i class="fa-solid fa-exclamation"></i>
            </div>
            <h3>Reorder Confirmation</h3>
            <p>Are you sure you want to add all items from this order back to your cart? This will not complete the order immediately.</p>
            <div class="reorder-modal-actions">
                <button class="cancel" onclick="closeReorderModal('${orderId}')">Cancel</button>
                <button class="confirm" onclick="confirmReorder('${orderId}')">Confirm Reorder</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

/**
 * Close Reorder Modal
 */
function closeReorderModal(orderId) {
    const modal = document.getElementById(`reorder-modal-${orderId}`);
    if (modal) {
        modal.remove();
    }
}

/**
 * Confirm Reorder
 */
function confirmReorder(orderId) {
    const order = allOrders.find(o => o.order_id === orderId);
    if (!order || !order.items) {
        toastr.error('Order not found');
        return;
    }

    console.log('Reordering items from order:', orderId);

    // Add all items to cart
    let addedCount = 0;
    if (Array.isArray(order.items)) {
        order.items.forEach(item => {
            // TODO: Implement add to cart logic
            console.log(`Adding to cart: ${item.product_id} x ${item.quantity}`);
            addedCount++;
        });
    }

    closeReorderModal(orderId);
    toastr.success(`${addedCount} items added to your cart!`);
}
