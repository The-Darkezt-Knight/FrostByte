// Billing Details Modal Handler
let currentCheckoutData = null;

function openBillingDetails(productData) {
    console.log('Opening billing details for:', productData);
    
    currentCheckoutData = productData;
    
    // Populate order summary
    populateBillingOrderSummary(productData);
    
    // Show modal
    const modal = document.getElementById('billingModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeBillingModal() {
    const modal = document.getElementById('billingModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('billingForm').reset();
    currentCheckoutData = null;
}

function populateBillingOrderSummary(data) {
    // Clear existing items
    const itemsContainer = document.getElementById('billingOrderItems');
    itemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    // Check if this is a cart checkout (multiple items) or single product
    if (data.items && Array.isArray(data.items)) {
        // Cart checkout - multiple items
        data.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const itemHTML = `
                <div class="order-item">
                    <div class="order-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="order-item-details">
                        <div class="order-item-category">${item.category}</div>
                        <div class="order-item-name">${item.name}</div>
                        <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                    </div>
                    <div class="order-item-price">₱${itemTotal.toFixed(2)}</div>
                </div>
            `;
            
            itemsContainer.innerHTML += itemHTML;
        });
    } else {
        // Single product checkout
        const itemHTML = `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${data.image}" alt="${data.name}">
                </div>
                <div class="order-item-details">
                    <div class="order-item-category">${data.category}</div>
                    <div class="order-item-name">${data.name}</div>
                    <div class="order-item-quantity">Quantity: ${data.quantity}</div>
                </div>
                <div class="order-item-price">${data.pricePerUnit}</div>
            </div>
        `;
        
        itemsContainer.innerHTML = itemHTML;
        subtotal = parseFloat(data.subtotal);
    }
    
    // Update totals
    const shipping = parseFloat(data.shipping) || 0;
    const total = subtotal + shipping;
    
    document.getElementById('billingSubtotal').textContent = `₱${subtotal.toFixed(2)}`;
    document.getElementById('billingShipping').textContent = shipping === 0 ? 'Free' : `₱${shipping.toFixed(2)}`;
    document.getElementById('billingTotal').textContent = `₱${total.toFixed(2)}`;
    
    // Store totals for reference
    currentCheckoutData.totalAmount = total;
}

function setupBillingControls() {
    const modal = document.getElementById('billingModal');
    const closeBtn = modal.querySelector('.billing-close-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const placeOrderBtn = modal.querySelector('.place-order-btn');
    const applyCouponBtn = modal.querySelector('.coupon-section button');
    
    console.log('Setting up billing controls:', { closeBtn, cancelBtn, placeOrderBtn, applyCouponBtn });
    
    // Close modal
    closeBtn.addEventListener('click', closeBillingModal);
    cancelBtn.addEventListener('click', closeBillingModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeBillingModal();
        }
    });
    
    // Place order
    placeOrderBtn.addEventListener('click', function(e) {
        console.log('Place order button clicked');
        placeOrder();
    });
    
    // Apply coupon
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', applyCoupon);
    }
}

function validateBillingForm() {
    const form = document.getElementById('billingForm');
    const firstName = document.getElementById('firstName').value.trim();
    const streetAddress = document.getElementById('streetAddress').value.trim();
    const brgy = document.getElementById('brgy').value.trim();
    const town = document.getElementById('town').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!firstName || !streetAddress || !brgy || !town || !phone || !email) {
        toastr.warning('Please fill in all required fields', 'Validation Error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        toastr.error('Please enter a valid email address', 'Invalid Email');
        return false;
    }
    
    // Phone validation (basic)
    if (phone.length < 10) {
        toastr.error('Please enter a valid phone number (minimum 10 digits)', 'Invalid Phone');
        return false;
    }
    
    return true;
}

function placeOrder() {
    console.log('placeOrder function called');
    
    // Get all form values
    const firstName = document.getElementById('firstName').value.trim();
    const streetAddress = document.getElementById('streetAddress').value.trim();
    const brgy = document.getElementById('brgy').value.trim();
    const town = document.getElementById('town').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    
    console.log('Form values:', { firstName, streetAddress, brgy, town, phone, email });
    
    if (!validateBillingForm()) {
        console.log('Form validation failed');
        return;
    }
    
    console.log('Form validation passed');
    
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const saveInfo = document.querySelector('input[name="saveInfo"]').checked;
    
    console.log('Payment method:', paymentMethod);
    console.log('Current checkout data:', currentCheckoutData);
    
    const billingData = {
        firstName: firstName,
        companyName: document.getElementById('companyName').value,
        streetAddress: streetAddress,
        brgy: brgy,
        town: town,
        phone: phone,
        email: email,
        paymentMethod: paymentMethod,
        saveInfo: saveInfo,
        totalAmount: currentCheckoutData.totalAmount
    };
    
    console.log('Placing order with data:', billingData);
    
    // Hide billing modal and show confirmation modal
    document.getElementById('billingModal').classList.remove('show');
    
    // Open order confirmation with both billing and checkout data
    openOrderConfirmation(billingData, currentCheckoutData);
}

function applyCoupon() {
    const couponCode = document.getElementById('couponCode').value.trim();
    
    if (!couponCode) {
        toastr.warning('Please enter a coupon code', 'Coupon Required');
        return;
    }
    
    console.log('Applying coupon:', couponCode);
    
    // TODO: Send to backend to validate coupon
    toastr.info(`Coupon "${couponCode}" applied!`, 'Coupon Applied');
}

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('billingModal');
        if (modal && modal.classList.contains('show')) {
            closeBillingModal();
        }
    }
});

// Initialize billing controls when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupBillingControls();
});
