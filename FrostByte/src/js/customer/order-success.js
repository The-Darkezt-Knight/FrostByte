// Order Success Modal
function showOrderSuccess(orderData) {
    const successModal = document.getElementById('orderSuccessModal');
    const orderNumberElement = document.querySelector('.order-number');
    
    // Generate order number (timestamp-based)
    const orderNumber = 'ORD-' + Date.now();
    
    // Update order number display
    if (orderNumberElement) {
        orderNumberElement.textContent = `Order Number: ${orderNumber}`;
    }
    
    // Show modal
    if (successModal) {
        successModal.classList.add('show');
    }
}

function closeSuccessModal() {
    const successModal = document.getElementById('orderSuccessModal');
    if (successModal) {
        successModal.classList.remove('show');
    }
}

function closeSuccessAndViewOrder() {
    closeSuccessModal();
    
    // Navigate to orders page
    // This will trigger the orders button click
    const ordersBtn = document.getElementById('orders-btn');
    if (ordersBtn) {
        ordersBtn.click();
    }
}

function continueShopping() {
    closeSuccessModal();
    
    // Close any open modals
    const orderConfirmationModal = document.getElementById('orderConfirmationModal');
    if (orderConfirmationModal) {
        orderConfirmationModal.classList.remove('show');
    }
    
    // Navigate back to shop
    const mainPanelBtn = document.getElementById('main-panel-btn');
    if (mainPanelBtn) {
        mainPanelBtn.click();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Close modal on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const successModal = document.getElementById('orderSuccessModal');
        if (successModal && successModal.classList.contains('show')) {
            closeSuccessModal();
        }
    }
});

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const successModal = document.getElementById('orderSuccessModal');
    if (event.target === successModal) {
        closeSuccessModal();
    }
});
