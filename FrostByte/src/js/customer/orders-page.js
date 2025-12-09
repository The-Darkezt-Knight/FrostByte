// Orders Page Handler
let allOrders = [];
let filteredOrders = [];
let currentStatusFilter = 'all';

// Initialize orders page
function initializeOrdersPage() {
    console.log('Initializing orders page');
    fetchCustomerOrders();
    setupOrdersControls();
}

// Fetch orders from backend
function fetchCustomerOrders() {
    // Get user_id from session or use default
    const userId = 'USR-001'; // TODO: Get from session
    
    console.log('Fetching orders for user:', userId);
    
    fetch(`/FrostByte/src/PHP/api/get_orders.php?user_id=${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log('Orders fetched:', data);
            
            if (data.success && data.orders) {
                allOrders = data.orders;
                filteredOrders = allOrders;
                displayOrders(filteredOrders);
                setupStatusFilters();
            } else {
                showEmptyOrders();
            }
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            toastr.error('Failed to load orders', 'Error');
            showEmptyOrders();
        });
}

// Setup order controls (search, filters)
function setupOrdersControls() {
    const searchInput = document.getElementById('ordersSearch');
    if (searchInput) {
        searchInput.addEventListener('input', searchOrders);
    }
}

// Setup status filter buttons
function setupStatusFilters() {
    const filterBtns = document.querySelectorAll('.status-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const status = this.getAttribute('data-status');
            filterOrdersByStatus(status);
        });
    });
}

// Filter orders by status
function filterOrdersByStatus(status) {
    currentStatusFilter = status;
    
    // Update button states
    const filterBtns = document.querySelectorAll('.status-btn');
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-status') === status) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filter orders
    if (status === 'all') {
        filteredOrders = allOrders;
    } else {
        filteredOrders = allOrders.filter(order => order.status.toLowerCase() === status.toLowerCase());
    }
    
    displayOrders(filteredOrders);
}

// Search orders
function searchOrders(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (!searchTerm) {
        if (currentStatusFilter === 'all') {
            filteredOrders = allOrders;
        } else {
            filteredOrders = allOrders.filter(order => order.status.toLowerCase() === currentStatusFilter.toLowerCase());
        }
    } else {
        filteredOrders = allOrders.filter(order => {
            const matchesSearch = order.order_id.toLowerCase().includes(searchTerm) ||
                                 order.product.toLowerCase().includes(searchTerm);
            const matchesStatus = currentStatusFilter === 'all' || 
                                 order.status.toLowerCase() === currentStatusFilter.toLowerCase();
            return matchesSearch && matchesStatus;
        });
    }
    
    displayOrders(filteredOrders);
}

// Display orders
function displayOrders(orders) {
    const ordersList = document.getElementById('ordersList');
    
    if (!ordersList) {
        console.error('Orders list container not found');
        return;
    }
    
    if (orders.length === 0) {
        showEmptyOrders();
        return;
    }
    
    ordersList.innerHTML = '';
    
    orders.forEach(order => {
        const orderCard = createOrderCard(order);
        ordersList.appendChild(orderCard);
    });
}

// Create order card element
function createOrderCard(order) {
    const card = document.createElement('div');
    card.className = 'order-card';
    
    // Format date
    const orderDate = new Date(order.date || order.created_at);
    const formattedDate = orderDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    
    // Determine status badge styling
    const statusClass = `order-status-badge ${order.status.toLowerCase().replace(' ', '-')}`;
    const statusText = order.status.charAt(0).toUpperCase() + order.status.slice(1);
    
    card.innerHTML = `
        <div class="order-card-header">
            <div class="order-id-section">
                <div class="order-id">${order.order_id}</div>
                <div class="order-date">Placed on ${formattedDate}</div>
            </div>
            <div class="${statusClass}">${statusText}</div>
        </div>
        
        <div class="order-items">
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${order.product_image || '/resources/images/placeholder.jpg'}" alt="${order.product}">
                </div>
                <div class="order-item-details">
                    <p class="order-item-name">${order.product}</p>
                    <p class="order-item-category">${order.category || 'Product'}</p>
                    <p class="order-item-qty">Qty: <strong>${order.quantity}</strong></p>
                </div>
                <div class="order-item-price">₱${parseFloat(order.amount).toFixed(2)}</div>
            </div>
        </div>
        
        <div class="order-card-footer">
            <div class="order-total">
                <div class="order-total-label">Total</div>
                <div class="order-total-amount">₱${parseFloat(order.amount).toFixed(2)}</div>
            </div>
            <button class="view-details-btn" onclick="viewOrderDetails('${order.order_id}')">View Details</button>
        </div>
    `;
    
    return card;
}

// Show empty orders state
function showEmptyOrders() {
    const ordersList = document.getElementById('ordersList');
    
    if (!ordersList) return;
    
    ordersList.innerHTML = `
        <div class="empty-orders">
            <div class="empty-orders-icon">
                <i class="fa-solid fa-inbox"></i>
            </div>
            <div class="empty-orders-title">No Orders Yet</div>
            <div class="empty-orders-message">You haven't placed any orders yet. Start shopping now!</div>
            <button class="empty-orders-btn" onclick="goToShop()">Continue Shopping</button>
        </div>
    `;
}

// View order details
function viewOrderDetails(orderId) {
    const order = allOrders.find(o => o.order_id === orderId);
    if (order) {
        console.log('Viewing order:', order);
        toastr.info('Order details view coming soon!', 'View Details');
    }
}

// Navigate to shop
function goToShop() {
    const mainPanelBtn = document.getElementById('main-panel-btn');
    if (mainPanelBtn) {
        mainPanelBtn.click();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeOrdersPage();
});
