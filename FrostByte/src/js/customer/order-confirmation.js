// Order Confirmation Modal Handler
let currentConfirmationData = null;

// Configure toastr options
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": 300,
    "hideDuration": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

function openOrderConfirmation(billingData, checkoutData) {
    console.log('Opening order confirmation with:', { billingData, checkoutData });
    
    currentConfirmationData = {
        billing: billingData,
        checkout: checkoutData
    };
    
    // Populate confirmation details
    populateConfirmationDetails(billingData, checkoutData);
    
    // Show modal
    const modal = document.getElementById('orderConfirmationModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeConfirmationModal() {
    const modal = document.getElementById('orderConfirmationModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    currentConfirmationData = null;
}

function populateConfirmationDetails(billingData, checkoutData) {
    // Billing Information
    document.getElementById('confirmFirstName').textContent = billingData.firstName;
    document.getElementById('confirmCompanyName').textContent = billingData.companyName || 'N/A';
    document.getElementById('confirmStreetAddress').textContent = billingData.streetAddress;
    document.getElementById('confirmBrgy').textContent = billingData.brgy;
    document.getElementById('confirmTown').textContent = billingData.town;
    document.getElementById('confirmPhone').textContent = billingData.phone;
    document.getElementById('confirmEmail').textContent = billingData.email;
    
    // Payment Method
    const paymentMethodDisplay = document.getElementById('paymentMethodDisplay');
    const paymentMethodValue = document.getElementById('paymentMethodValue');
    
    if (billingData.paymentMethod === 'bank') {
        paymentMethodDisplay.innerHTML = '<i class="fa-solid fa-building-columns"></i>';
        paymentMethodValue.textContent = 'Bank Transfer';
    } else if (billingData.paymentMethod === 'cod') {
        paymentMethodDisplay.innerHTML = '<i class="fa-solid fa-money-bills"></i>';
        paymentMethodValue.textContent = 'Cash on Delivery';
    }
    
    // Order Items
    const itemsContainer = document.getElementById('confirmationOrderItems');
    itemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    // Check if this is a cart checkout (multiple items) or single product
    if (checkoutData.items && Array.isArray(checkoutData.items)) {
        // Cart checkout - multiple items
        checkoutData.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const itemHTML = `
                <div class="confirmation-item">
                    <div class="confirmation-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="confirmation-item-details">
                        <div class="confirmation-item-header">
                            <div class="confirmation-item-info">
                                <div class="confirmation-item-category">${item.category}</div>
                                <div class="confirmation-item-name">${item.name}</div>
                            </div>
                            <div class="confirmation-item-price">₱${itemTotal.toFixed(2)}</div>
                        </div>
                        <div class="confirmation-item-qty">Quantity: <strong>${item.quantity}</strong></div>
                    </div>
                </div>
            `;
            
            itemsContainer.innerHTML += itemHTML;
        });
    } else {
        // Single product checkout
        const itemHTML = `
                <div class="confirmation-item">
                    <div class="confirmation-item-image">
                        <img src="${checkoutData.image}" alt="${checkoutData.name}">
                    </div>
                    <div class="confirmation-item-details">
                        <div class="confirmation-item-header">
                            <div class="confirmation-item-info">
                                <div class="confirmation-item-category">${checkoutData.category}</div>
                                <div class="confirmation-item-name">${checkoutData.name}</div>
                            </div>
                            <div class="confirmation-item-price">${checkoutData.pricePerUnit}</div>
                        </div>
                        <div class="confirmation-item-qty">Quantity: <strong>${checkoutData.quantity}</strong></div>
                    </div>
                </div>
            `;
        
        itemsContainer.innerHTML = itemHTML;
        subtotal = parseFloat(checkoutData.subtotal);
    }
    
    // Order Totals
    const shipping = parseFloat(checkoutData.shipping) || 0;
    const total = subtotal + shipping;
    
    document.getElementById('confirmSubtotal').textContent = `₱${subtotal.toFixed(2)}`;
    document.getElementById('confirmShipping').textContent = shipping === 0 ? 'Free' : `₱${shipping.toFixed(2)}`;
    document.getElementById('confirmTotal').textContent = `₱${total.toFixed(2)}`;
}

function setupConfirmationControls() {
    const modal = document.getElementById('orderConfirmationModal');
    const closeBtn = document.querySelector('.confirmation-close-btn');
    const cancelBtn = document.querySelector('.confirmation-buttons .cancel-btn');
    const confirmBtn = document.querySelector('.confirmation-buttons .confirm-btn');
    
    // Close modal
    closeBtn.addEventListener('click', closeConfirmationModal);
    cancelBtn.addEventListener('click', closeConfirmationModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeConfirmationModal();
        }
    });
    
    // Confirm order
    confirmBtn.addEventListener('click', finalizeOrder);
}

function finalizeOrder() {
    console.log('Finalizing order with data:', currentConfirmationData);
    
    // Prepare data for API
    const orderPayload = {
        firstName: currentConfirmationData.billing.firstName,
        companyName: currentConfirmationData.billing.companyName,
        streetAddress: currentConfirmationData.billing.streetAddress,
        brgy: currentConfirmationData.billing.brgy,
        town: currentConfirmationData.billing.town,
        phone: currentConfirmationData.billing.phone,
        email: currentConfirmationData.billing.email,
        paymentMethod: currentConfirmationData.billing.paymentMethod,
        checkoutData: currentConfirmationData.checkout
    };
    
    // Send to backend API
    fetch('/FrostByte/src/PHP/api/create_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.message || 'Failed to create order');
            });
        }
        return response.json();
    })
    .then(result => {
        console.log('Order created successfully:', result);
        
        // Close confirmation modal
        closeConfirmationModal();
        
        // Reset billing modal
        const billingModal = document.getElementById('billingModal');
        billingModal.classList.remove('show');
        document.getElementById('billingForm').reset();
        
        // Clear shopping cart after successful order
        if (window.shoppingCart) {
            window.shoppingCart = [];
            localStorage.removeItem('shoppingCart');
            console.log('Shopping cart cleared after successful order');
        }
        
        // Show success modal with order data
        showOrderSuccess(result.order_data);
    })
    .catch(error => {
        console.error('Error creating order:', error);
        // Show error notification using toastr
        toastr.error(error.message || 'Failed to place order. Please try again.', 'Order Error');
    });
}

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('orderConfirmationModal');
        if (modal && modal.classList.contains('show')) {
            closeConfirmationModal();
        }
    }
});

// Initialize confirmation controls when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupConfirmationControls();
});
