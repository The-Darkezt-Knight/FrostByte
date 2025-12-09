// Shopping Cart Management
let shoppingCart = [];

// Initialize cart from localStorage
function initializeCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        shoppingCart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Add product to cart
function addProductToCart(productData) {
    console.log('Adding to cart:', productData);
    
    const quantity = parseInt(productData.quantity) || 1;
    
    // Check if product already exists in cart
    const existingItem = shoppingCart.find(item => item.productId === productData.productId);
    
    if (existingItem) {
        // Update quantity if product already in cart
        existingItem.quantity += quantity;
        console.log('Updated quantity for existing product');
    } else {
        // Add new product to cart
        shoppingCart.push({
            productId: productData.productId,
            name: productData.name,
            category: productData.category,
            price: parseFloat(productData.pricePerUnit.replace('₱', '').trim()),
            image: productData.image,
            quantity: quantity
        });
        console.log('Added new product to cart');
    }
    
    // Save to localStorage
    saveCartToStorage();
    
    // Update display
    updateCartDisplay();
    
    // Show notification
    toastr.success(`${productData.name} added to cart!`, 'Added to Cart');
}

// Remove product from cart
function removeFromCart(productId) {
    shoppingCart = shoppingCart.filter(item => item.productId !== productId);
    saveCartToStorage();
    updateCartDisplay();
    toastr.info('Item removed from cart', 'Removed');
}

// Update product quantity in cart
function updateCartItemQuantity(productId, newQuantity) {
    const item = shoppingCart.find(item => item.productId === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCartToStorage();
            updateCartDisplay();
        }
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

// Get cart total
function getCartTotal() {
    return shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    return shoppingCart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart');
    
    if (!cartContainer) return;
    
    if (shoppingCart.length === 0) {
        showEmptyCart();
        return;
    }
    
    // Clear existing items
    cartContainer.innerHTML = '';
    
    // Add cart items
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'cart-items';
    
    shoppingCart.forEach(item => {
        const cartItem = createCartItemElement(item);
        itemsContainer.appendChild(cartItem);
    });
    
    cartContainer.appendChild(itemsContainer);
    
    // Add summary section
    const summaryContainer = createCartSummary();
    cartContainer.appendChild(summaryContainer);
}

// Create cart item element
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-category">${item.category}</p>
            <p class="cart-item-price">₱${parseFloat(item.price).toFixed(2)}</p>
        </div>
        <div class="cart-item-quantity">
            <button class="qty-btn minus" onclick="updateCartItemQuantity('${item.productId}', ${item.quantity - 1})">
                <i class="fa-solid fa-minus"></i>
            </button>
            <input type="number" class="qty-input" value="${item.quantity}" 
                   onchange="updateCartItemQuantity('${item.productId}', this.value)" min="1">
            <button class="qty-btn plus" onclick="updateCartItemQuantity('${item.productId}', ${item.quantity + 1})">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <div class="cart-item-total">
            ₱${(item.price * item.quantity).toFixed(2)}
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.productId}')">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;
    return cartItem;
}

// Create cart summary
function createCartSummary() {
    const total = getCartTotal();
    const itemCount = getCartItemCount();
    
    const summary = document.createElement('div');
    summary.className = 'cart-summary';
    summary.innerHTML = `
        <div class="cart-summary-content">
            <div class="summary-row">
                <span>Subtotal (${itemCount} item${itemCount !== 1 ? 's' : ''}):</span>
                <span class="summary-value">₱${total.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span class="summary-value">FREE</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span class="summary-value">₱${total.toFixed(2)}</span>
            </div>
        </div>
        <div class="cart-actions">
            <button class="continue-shopping-btn" onclick="goToShop()">Continue Shopping</button>
            <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
        </div>
    `;
    return summary;
}

// Show empty cart message
function showEmptyCart() {
    const cartContainer = document.getElementById('cart');
    if (!cartContainer) return;
    
    cartContainer.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-icon">
                <i class="fa-solid fa-shopping-cart"></i>
            </div>
            <h3 class="empty-cart-title">Your cart is empty</h3>
            <p class="empty-cart-message">Start adding products to your cart!</p>
            <button class="empty-cart-btn" onclick="goToShop()">Start Shopping</button>
        </div>
    `;
}

// Navigate to shop
function goToShop() {
    const mainPanelBtn = document.getElementById('main-panel-btn');
    if (mainPanelBtn) {
        mainPanelBtn.click();
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (shoppingCart.length === 0) {
        toastr.warning('Your cart is empty', 'Empty Cart');
        return;
    }
    
    // Calculate totals
    const subtotal = getCartTotal();
    const shipping = 0; // Free shipping
    const total = subtotal + shipping;
    
    // Prepare checkout data with all cart items
    const checkoutData = {
        items: shoppingCart,
        subtotal: subtotal.toFixed(2),
        shipping: shipping,
        total: total.toFixed(2),
        itemCount: getCartItemCount()
    };
    
    console.log('Proceeding to checkout with cart data:', checkoutData);
    
    // Open billing details modal with cart items
    openBillingDetailsFromCart(checkoutData);
}

// Open billing details modal for cart checkout
function openBillingDetailsFromCart(checkoutData) {
    // Store cart checkout data globally for order creation
    window.cartCheckoutData = checkoutData;
    
    // Scroll to top
    $('html, body').animate({ scrollTop: 0 }, 300);
    
    // Call the existing openBillingDetails function
    // This ensures all billing form setup is consistent
    openBillingDetails(checkoutData);
    
    console.log('Billing modal opened for cart checkout with', checkoutData.itemCount, 'items');
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
});
