// Order Management Table Handler
document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
    setupFilters();
    setupModalHandlers();
});

function loadOrders() {
    fetch('/FrostByte/src/PHP/api/get_admin_orders.php')
        .then(response => response.json())
        .then(data => {
            console.log('Orders data:', data);
            if (data.success) {
                populateOrdersTable(data.orders);
                updateOrderStats(data.stats);
            } else {
                console.error('Error loading orders:', data.message);
                if (typeof toastr !== 'undefined') {
                    toastr.error('Failed to load orders', 'Error');
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (typeof toastr !== 'undefined') {
                toastr.error('An error occurred while loading orders', 'Error');
            }
        });
}

function populateOrdersTable(orders) {
    const tbody = document.getElementById('orders-tbody');
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 30px;">No orders found</td></tr>';
        return;
    }

    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        const statusClass = `status-badge ${order.status}`;
        const dateObj = new Date(order.order_date);
        const formattedDate = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        row.innerHTML = `
            <td>${order.order_id}</td>
            <td>${order.customer_name}</td>
            <td>${order.total_items}</td>
            <td>$${parseFloat(order.total_amount).toFixed(2)}</td>
            <td>${order.payment_method || 'Not specified'}</td>
            <td><span class="${statusClass}">${order.status.replace('_', ' ')}</span></td>
            <td>${formattedDate}</td>
            <td>
                <div class="action-icons">
                    <a href="#" class="view-order-btn" data-order-id="${order.order_id}" title="View Details"><i class="fa-solid fa-eye"></i></a>
                    <a href="#" title="Download"><i class="fa-solid fa-download"></i></a>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Use event delegation for click handlers
    tbody.addEventListener('click', function(e) {
        const viewBtn = e.target.closest('.view-order-btn');
        if (viewBtn) {
            e.preventDefault();
            const orderId = viewBtn.getAttribute('data-order-id');
            console.log('Opening modal for order:', orderId);
            openOrderDetailsModal(orderId);
        }
    });
}

function updateOrderStats(stats) {
    document.getElementById('total-orders').textContent = stats.total.toLocaleString();
    document.getElementById('pending-payment').textContent = stats.pending_payment;
    document.getElementById('processing').textContent = stats.processing;
    document.getElementById('shipped').textContent = stats.shipped;
    document.getElementById('delivered').textContent = stats.delivered;
}

function setupFilters() {
    const searchInput = document.getElementById('search-orders');
    const statusFilter = document.getElementById('filter-status');
    const paymentFilter = document.getElementById('filter-payment');
    const sortBy = document.getElementById('sort-by');

    searchInput.addEventListener('input', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    paymentFilter.addEventListener('change', applyFilters);
    sortBy.addEventListener('change', applyFilters);
}

function applyFilters() {
    const searchTerm = document.getElementById('search-orders').value.toLowerCase();
    const statusFilter = document.getElementById('filter-status').value;
    const paymentFilter = document.getElementById('filter-payment').value;
    const sortBy = document.getElementById('sort-by').value;

    const rows = Array.from(document.querySelectorAll('#orders-tbody tr'));

    let visibleRows = rows.filter(row => {
        if (row.textContent.includes('No orders found')) return true;

        const orderId = row.cells[0].textContent.toLowerCase();
        const customer = row.cells[1].textContent.toLowerCase();
        const status = row.cells[5].textContent.toLowerCase();
        const payment = row.cells[4].textContent.toLowerCase();

        // Search filter
        const matchesSearch = orderId.includes(searchTerm) || customer.includes(searchTerm);

        // Status filter
        const matchesStatus = !statusFilter || status.includes(statusFilter.replace('_', ' '));

        // Payment filter
        const matchesPayment = !paymentFilter || payment.includes(paymentFilter);

        return matchesSearch && matchesStatus && matchesPayment;
    });

    // Apply sorting
    visibleRows.sort((a, b) => {
        if (a.textContent.includes('No orders found')) return -1;
        if (b.textContent.includes('No orders found')) return 1;

        let aValue, bValue;

        switch(sortBy) {
            case 'oldest':
                aValue = new Date(a.cells[6].textContent);
                bValue = new Date(b.cells[6].textContent);
                return aValue - bValue;
            case 'highest':
                aValue = parseFloat(a.cells[3].textContent.replace('$', ''));
                bValue = parseFloat(b.cells[3].textContent.replace('$', ''));
                return bValue - aValue;
            case 'lowest':
                aValue = parseFloat(a.cells[3].textContent.replace('$', ''));
                bValue = parseFloat(b.cells[3].textContent.replace('$', ''));
                return aValue - bValue;
            case 'newest':
            default:
                aValue = new Date(a.cells[6].textContent);
                bValue = new Date(b.cells[6].textContent);
                return bValue - aValue;
        }
    });

    // Show/hide rows
    const tbody = document.getElementById('orders-tbody');
    const allRows = tbody.querySelectorAll('tr');

    allRows.forEach(row => {
        row.style.display = 'none';
    });

    if (visibleRows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 30px;">No orders match your filters</td></tr>';
    } else {
        visibleRows.forEach(row => {
            row.style.display = '';
        });
    }
}

// Modal Handlers
function setupModalHandlers() {
    const modal = document.getElementById('order-details-modal');
    const closeBtn = document.getElementById('close-order-modal');
    const closeOrderBtn = document.getElementById('close-order-btn');
    const approveBtn = document.getElementById('approve-order-btn');

    closeBtn.addEventListener('click', closeOrderDetailsModal);
    closeOrderBtn.addEventListener('click', closeOrderDetailsModal);
    approveBtn.addEventListener('click', approveOrder);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeOrderDetailsModal();
        }
    });
}

function openOrderDetailsModal(orderId) {
    const modal = document.getElementById('order-details-modal');
    
    if (!modal) {
        console.error('Modal element not found');
        if (typeof toastr !== 'undefined') {
            toastr.error('Modal not found', 'Error');
        }
        return;
    }
    
    console.log('Fetching order details for:', orderId);
    
    // Fetch detailed order information
    fetch(`/FrostByte/src/PHP/api/get_order_details.php?order_id=${orderId}`)
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Order details received:', data);
            if (data.success) {
                populateOrderModal(data.order);
                modal.classList.add('show');
            } else {
                if (typeof toastr !== 'undefined') {
                    toastr.error(data.message || 'Failed to load order details', 'Error');
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (typeof toastr !== 'undefined') {
                toastr.error('An error occurred while loading order details: ' + error.message, 'Error');
            }
        });
}

function populateOrderModal(order) {
    // Set header info
    document.getElementById('modal-order-id').textContent = order.order_id;
    document.getElementById('modal-order-date').textContent = new Date(order.order_date).toLocaleString();
    
    const statusBadge = document.getElementById('modal-order-status');
    statusBadge.textContent = order.status.replace('_', ' ');
    statusBadge.className = `status-badge ${order.status}`;

    // Set customer info
    document.getElementById('modal-customer-name').textContent = order.customer_name || 'N/A';
    document.getElementById('modal-customer-email').textContent = order.email || 'N/A';
    document.getElementById('modal-shipping-address').textContent = order.shipping_address || 'N/A';

    // Set order items
    const itemsList = document.getElementById('modal-items-list');
    itemsList.innerHTML = '';
    
    if (order.items && order.items.length > 0) {
        order.items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'item';
            itemEl.innerHTML = `
                <div class="item-icon">
                    <i class="fa-solid fa-box"></i>
                </div>
                <div class="item-details">
                    <p class="item-name">${item.product_name}</p>
                    <p class="item-info">Qty: ${item.quantity}</p>
                </div>
                <div class="item-price">$${parseFloat(item.price).toFixed(2)}</div>
            `;
            itemsList.appendChild(itemEl);
        });
    }

    // Set order summary
    document.getElementById('modal-subtotal').textContent = `$${parseFloat(order.subtotal || 0).toFixed(2)}`;
    document.getElementById('modal-shipping').textContent = `$${parseFloat(order.shipping || 0).toFixed(2)}`;
    document.getElementById('modal-tax').textContent = `$${parseFloat(order.tax || 0).toFixed(2)}`;
    document.getElementById('modal-total').textContent = `$${parseFloat(order.total_amount).toFixed(2)}`;

    // Store order ID for approval
    document.getElementById('approve-order-btn').setAttribute('data-order-id', order.order_id);
}

function closeOrderDetailsModal() {
    const modal = document.getElementById('order-details-modal');
    modal.classList.remove('show');
}

function approveOrder() {
    const orderId = document.getElementById('approve-order-btn').getAttribute('data-order-id');
    
    fetch('/FrostByte/src/PHP/api/approve_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id: orderId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (typeof toastr !== 'undefined') {
                toastr.success('Order approved successfully!', 'Success');
            }
            closeOrderDetailsModal();
            loadOrders();
            updateOrderStats(data.stats);
        } else {
            if (typeof toastr !== 'undefined') {
                toastr.error(data.message || 'Failed to approve order', 'Error');
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        if (typeof toastr !== 'undefined') {
            toastr.error('An error occurred while approving the order', 'Error');
        }
    });
}
