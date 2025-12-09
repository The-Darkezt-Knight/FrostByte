// Product Overview Modal Handler
document.addEventListener('DOMContentLoaded', function() {
    setupModalControls();
});

// Note: setupProductCardListeners is called from shop-products.js AFTER products are loaded

function openProductOverview(cardElement) {
    console.log('openProductOverview called');
    console.log('Card element:', cardElement);
    console.log('Card HTML:', cardElement.innerHTML);
    console.log('Card data attributes:', {
        id: cardElement.getAttribute('data-product-id'),
        name: cardElement.getAttribute('data-product-name'),
        category: cardElement.getAttribute('data-product-category'),
        price: cardElement.getAttribute('data-product-price'),
        stock: cardElement.getAttribute('data-product-stock')
    });
    
    // Get product data from the card's data attributes
    const productId = cardElement.getAttribute('data-product-id');
    const productName = cardElement.getAttribute('data-product-name');
    const category = cardElement.getAttribute('data-product-category');
    const price = cardElement.getAttribute('data-product-price');
    const stock = cardElement.getAttribute('data-product-stock');
    const imageUrl = cardElement.querySelector('.upper img').src;
    
    console.log('Extracted values - Stock value:', stock, 'Type:', typeof stock, 'Parsed:', parseInt(stock));
    
    // Populate modal with data
    populateModal({
        id: productId,
        image: imageUrl,
        category: category,
        name: productName,
        price: '₱' + parseFloat(price).toFixed(2),
        stock: parseInt(stock),
        description: `Experience premium quality with our ${productName}. Designed for professionals and enthusiasts alike, this product delivers exceptional performance and reliability.`,
        rating: 4.8,
        reviews: 342
    });
    
    // Show modal
    const modal = document.getElementById('productModal');
    console.log('Modal element:', modal);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function populateModal(data) {
    console.log('populateModal called with data:', data);
    console.log('Stock value in modal:', data.stock, 'Type:', typeof data.stock);
    
    // Image
    document.getElementById('modal-product-image').src = data.image;
    
    // Category
    document.getElementById('modal-product-category').textContent = data.category;
    
    // Title
    const titleElement = document.getElementById('modal-product-title');
    titleElement.textContent = data.name;
    titleElement.setAttribute('data-product-id', data.id);
    
    // Rating
    document.getElementById('modal-product-rating').innerHTML = 
        `<span class="stars">★★★★☆</span> ${data.rating} (${data.reviews} reviews)`;
    
    // Price
    document.getElementById('modal-product-price').textContent = data.price;
    
    // Stock
    const stockElement = document.getElementById('modal-product-stock');
    console.log('Checking stock - Value:', data.stock, 'Is > 0?', data.stock > 0);
    
    if (data.stock > 0) {
        stockElement.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.stock} units in stock`;
        stockElement.classList.remove('out-of-stock');
        // Enable buy buttons
        document.getElementById('addToCartBtn').disabled = false;
        document.getElementById('buyNowBtn').disabled = false;
        console.log('Buttons enabled - Stock > 0');
    } else {
        stockElement.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Out of stock`;
        stockElement.classList.add('out-of-stock');
        // Disable buy buttons
        document.getElementById('addToCartBtn').disabled = true;
        document.getElementById('buyNowBtn').disabled = true;
        console.log('Buttons disabled - Stock = 0 or less');
    }
    
    // Description
    document.getElementById('modal-product-description').textContent = data.description;
    
    // Reset quantity
    document.getElementById('quantityInput').value = 1;
}

function setupModalControls() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-product-modal');
    const decreaseBtn = document.getElementById('decreaseQuantity');
    const increaseBtn = document.getElementById('increaseQuantity');
    const quantityInput = document.getElementById('quantityInput');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    const wishlistBtn = document.getElementById('wishlistBtn');
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Quantity controls
    decreaseBtn.addEventListener('click', decreaseQuantity);
    increaseBtn.addEventListener('click', increaseQuantity);
    quantityInput.addEventListener('change', validateQuantity);
    
    // Action buttons
    addToCartBtn.addEventListener('click', addToCart);
    buyNowBtn.addEventListener('click', buyNow);
    wishlistBtn.addEventListener('click', toggleWishlist);
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    let value = parseInt(input.value) || 1;
    if (value > 1) {
        input.value = value - 1;
    }
}

function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    let value = parseInt(input.value) || 1;
    input.value = value + 1;
}

function validateQuantity() {
    const input = document.getElementById('quantityInput');
    let value = parseInt(input.value) || 1;
    
    if (value < 1) {
        input.value = 1;
    } else if (value > 999) {
        input.value = 999;
    }
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantityInput').value) || 1;
    const productId = document.getElementById('modal-product-title').getAttribute('data-product-id');
    const productName = document.getElementById('modal-product-title').textContent;
    const category = document.getElementById('modal-product-category').textContent;
    const priceText = document.getElementById('modal-product-price').textContent;
    const imageUrl = document.getElementById('modal-product-image').src;
    
    console.log(`Adding to cart: ${quantity}x ${productName}`);
    
    const cartItemData = {
        productId: productId,
        name: productName,
        category: category,
        pricePerUnit: priceText,
        image: imageUrl,
        quantity: quantity
    };
    
    // Add to cart
    addProductToCart(cartItemData);
    
    // Close modal
    closeModal();
}

function buyNow() {
    const quantity = parseInt(document.getElementById('quantityInput').value) || 1;
    const productId = document.getElementById('modal-product-title').getAttribute('data-product-id');
    const productName = document.getElementById('modal-product-title').textContent;
    const category = document.getElementById('modal-product-category').textContent;
    const priceText = document.getElementById('modal-product-price').textContent;
    const price = parseFloat(priceText.replace('₱', '').trim());
    const imageUrl = document.getElementById('modal-product-image').src;
    
    const subtotal = price * quantity;
    
    const checkoutData = {
        productId: productId,
        name: productName,
        category: category,
        quantity: quantity,
        pricePerUnit: priceText,
        image: imageUrl,
        subtotal: subtotal.toFixed(2),
        shipping: 0  // Free shipping for now
    };
    
    console.log(`Processing buy now: ${quantity}x ${productName}`);
    
    // Close product modal
    closeModal();
    
    // Open billing details modal
    openBillingDetails(checkoutData);
}

function toggleWishlist() {
    const btn = document.getElementById('wishlistBtn');
    btn.classList.toggle('active');
    
    if (btn.classList.contains('active')) {
        console.log('Added to wishlist');
    } else {
        console.log('Removed from wishlist');
    }
}

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('productModal');
        if (modal.classList.contains('show')) {
            closeModal();
        }
    }
});
