// Orders Management Admin Panel JavaScript
// File: /FrostByte/src/js/admin/orders-management.js

let currentRejectOrderId = null;

/**
 * View order details
 */
function viewOrderDetails(orderId) {
    fetch(`api/get_orders.php?order_id=${orderId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.orders.length > 0) {
                const order = data.orders[0];
                displayOrderDetails(order);
                document.getElementById('orderDetailsModal').classList.add('show');
            } else {
                showAlert('Order not found', 'error');
            }
        })
        .catch(error => {
            console.error('Error fetching order:', error);
            showAlert('Error loading order details', 'error');
        });
}

/**
 * Display order details in modal
 */
function displayOrderDetails(order) {
    const body = document.getElementById('orderDetailsBody');
    
    const statusBadgeClass = `status-${order.status}`;
    const rejectionInfo = order.status === 'rejected' ? `
        <div class="info-section rejection-info">
            <h4>Rejection Details</h4>
            <div class="info-row">
                <span class="label">Reason:</span>
                <span class="value">${order.rejection_reason || 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="label">Rejected By:</span>
                <span class="value">${order.rejected_by || 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="label">Rejected At:</span>
                <span class="value">${formatDate(order.rejected_at) || 'N/A'}</span>
            </div>
        </div>
    ` : '';

    const approvalInfo = order.status === 'processing' ? `
        <div class="info-section approval-info">
            <h4>Approval Details</h4>
            <div class="info-row">
                <span class="label">Approved By:</span>
                <span class="value">${order.approved_by || 'N/A'}</span>
            </div>
            <div class="info-row">
                <span class="label">Approved At:</span>
                <span class="value">${formatDate(order.approved_at) || 'N/A'}</span>
            </div>
        </div>
    ` : '';

    body.innerHTML = `
        <div class="details-grid">
            <div class="details-column">
                <div class="info-section">
                    <h4>Order Information</h4>
                    <div class="info-row">
                        <span class="label">Order ID:</span>
                        <span class="value">${order.order_id}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Status:</span>
                        <span class="value">
                            <span class="status-badge ${statusBadgeClass}">
                                ${capitalizeFirst(order.status)}
                            </span>
                        </span>
                    </div>
                    <div class="info-row">
                        <span class="label">Order Date:</span>
                        <span class="value">${formatDate(order.created_at)}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h4>Customer Information</h4>
                    <div class="info-row">
                        <span class="label">Name:</span>
                        <span class="value">${order.customer}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Email:</span>
                        <span class="value">${order.email}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Phone:</span>
                        <span class="value">${order.phone}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Company:</span>
                        <span class="value">${order.company_name || 'N/A'}</span>
                    </div>
                </div>
            </div>

            <div class="details-column">
                <div class="info-section">
                    <h4>Product & Payment</h4>
                    <div class="info-row">
                        <span class="label">Product:</span>
                        <span class="value">${order.product}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Quantity:</span>
                        <span class="value">${order.quantity}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Amount:</span>
                        <span class="value amount">PKR ${parseFloat(order.amount).toLocaleString('en-PK', {maximumFractionDigits: 2})}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Payment Method:</span>
                        <span class="value">${capitalizeFirst(order.payment_method)}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Payment Status:</span>
                        <span class="value">
                            <span class="status-badge status-${order.payment_status}">
                                ${capitalizeFirst(order.payment_status)}
                            </span>
                        </span>
                    </div>
                </div>

                <div class="info-section">
                    <h4>Shipping</h4>
                    <div class="info-row">
                        <span class="label">Address:</span>
                        <span class="value">${order.shipping_address || 'N/A'}</span>
                    </div>
                </div>

                ${rejectionInfo}
                ${approvalInfo}
            </div>
        </div>
    `;
}

/**
 * Approve order
 */
function approveOrder(orderId) {
    if (!confirm('Are you sure you want to approve this order?')) {
        return;
    }

    const formData = new FormData();
    formData.append('action', 'approve');
    formData.append('order_id', orderId);

    fetch('api/manage_order.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('Order approved successfully', 'success');
            setTimeout(() => location.reload(), 1500);
        } else {
            showAlert(data.message || 'Failed to approve order', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Error approving order', 'error');
    });
}

/**
 * Show reject modal
 */
function showRejectModal(orderId) {
    currentRejectOrderId = orderId;
    document.getElementById('rejectForm').reset();
    document.getElementById('rejectModal').classList.add('show');
}

/**
 * Close reject modal
 */
function closeRejectModal() {
    currentRejectOrderId = null;
    document.getElementById('rejectModal').classList.remove('show');
}

/**
 * Handle reject form submission
 */
document.getElementById('rejectForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const rejectionReason = document.getElementById('rejectionReason').value.trim();
    const adminNotes = document.getElementById('adminNotes').value.trim();

    if (!rejectionReason) {
        showAlert('Please provide a rejection reason', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('action', 'reject');
    formData.append('order_id', currentRejectOrderId);
    formData.append('rejection_reason', rejectionReason);
    formData.append('admin_notes', adminNotes);

    fetch('api/manage_order.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('Order rejected successfully', 'success');
            closeRejectModal();
            setTimeout(() => location.reload(), 1500);
        } else {
            showAlert(data.message || 'Failed to reject order', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Error rejecting order', 'error');
    });
});

/**
 * Close order details modal
 */
function closeOrderDetails() {
    document.getElementById('orderDetailsModal').classList.remove('show');
}

/**
 * Format date to readable format
 */
function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Capitalize first letter
 */
function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Show alert message
 */
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 4px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => alertDiv.remove(), 4000);
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const detailsModal = document.getElementById('orderDetailsModal');
    const rejectModal = document.getElementById('rejectModal');
    
    if (event.target === detailsModal) {
        closeOrderDetails();
    }
    if (event.target === rejectModal) {
        closeRejectModal();
    }
});
