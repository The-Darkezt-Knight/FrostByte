// Customer Shop - Load Products from Database
document.addEventListener('DOMContentLoaded', function() {
    loadShopProducts();
});

function loadShopProducts() {
    $.ajax({
        url: '../PHP/api/get_customer_products.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Products fetched from API:', data);
            if (data.by_category) {
                populateShop(data.by_category);
                // Attach click listeners AFTER products are loaded
                setupProductCardListeners();
            }
        },
        error: function(error) {
            console.error('Error fetching products:', error);
        }
    });
}

function setupProductCardListeners() {
    const cards = document.querySelectorAll('#main-panel .card');
    console.log(`Setting up click listeners for ${cards.length} product cards`);
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Product card clicked:', this.getAttribute('data-product-name'));
            openProductOverview(this);
        });
    });
}

function populateShop(categorizedProducts) {
    // Get the main panel
    const mainPanel = document.getElementById('main-panel');
    
    // Get all existing shelves sections
    const shelves = document.querySelectorAll('#main-panel .shelves');
    
    shelves.forEach(shelf => {
        // Get the category from the title
        const titleElement = shelf.querySelector('.title p');
        const shelfCategory = titleElement.textContent.trim();
        
        // Get the body where cards will be added
        const body = shelf.querySelector('.body');
        
        // Clear existing cards (keep the structure)
        body.innerHTML = '';
        
        // Check if we have products for this category
        if (categorizedProducts[shelfCategory]) {
            const products = categorizedProducts[shelfCategory];
            
            // Create cards for each product
            products.forEach(product => {
                const card = createProductCard(product);
                body.appendChild(card);
            });
        }
    });
    
    // Create shelves for categories that don't have a section yet
    const existingCategories = Array.from(document.querySelectorAll('#main-panel .shelves .title p'))
        .map(el => el.textContent.trim());
    
    for (const category in categorizedProducts) {
        if (!existingCategories.includes(category)) {
            // Create new shelf section
            const newShelf = createShelfSection(category, categorizedProducts[category]);
            mainPanel.appendChild(newShelf);
        }
    }
    
    // Also handle the categories section at the top
    populateCategoriesSection(categorizedProducts);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Ensure we have valid values
    const productId = product.product_id || '';
    const productName = product.product_name || '';
    const category = product.category || '';
    const price = product.price || '0';
    const stock = product.stock || '0';
    
    // Use image_path from database (already resolved by API)
    let productImage = product.image_path || getProductImage(category, productName);
    
    // Ensure we have a valid image path
    if (!productImage) {
        productImage = '/FrostByte/resources/images/background.avif';
    }
    
    // Generate star rating (random for now, can be updated with real data)
    const rating = (Math.random() * 1.5 + 4.2).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 400 + 50);
    
    // Determine stock status
    const isLowStock = stock < 10;
    const stockText = stock > 0 ? `${stock} in stock` : 'Out of stock';
    
    // Set innerHTML FIRST
    card.innerHTML = `
        <div class="upper">
            <img src="${productImage}" alt="${productName}">
            ${isLowStock && stock > 0 ? '<div class="stock-badge">Low Stock</div>' : ''}
            <div class="icons">
                <button class="icon-btn" title="Add to wishlist">
                    <i class="fa-regular fa-heart"></i>
                </button>
                <button class="icon-btn" title="Quick view">
                    <i class="fa-regular fa-eye"></i>
                </button>
                <button class="icon-btn" title="Add to cart">
                    <i class="fa-solid fa-shopping-cart"></i>
                </button>
            </div>
        </div>
        <div class="bottom">
            <p>${category}</p>
            <p>${productName}</p>
            <div class="rating">
                <span class="stars">★ ${rating}</span>
                <span class="count">(${reviewCount})</span>
            </div>
            <div class="stock-info">
                <span class="price">₱${parseFloat(price).toFixed(2)}</span>
                <span class="in-stock">${stockText}</span>
            </div>
        </div>
    `;
    
    // Set data attributes AFTER innerHTML (important!)
    card.setAttribute('data-product-id', productId);
    card.setAttribute('data-product-name', productName);
    card.setAttribute('data-product-category', category);
    card.setAttribute('data-product-price', price);
    card.setAttribute('data-product-stock', stock);
    card.setAttribute('data-product-status', product.status || 'active');
    
    console.log('Creating card with data:', { productId, productName, category, price, stock, image: productImage });
    
    return card;
}

function createShelfSection(category, products) {
    const shelf = document.createElement('div');
    shelf.className = 'shelves';
    shelf.innerHTML = `
        <div class="title">
            <p>${category}</p>
        </div>
        <div class="body"></div>
    `;
    
    const body = shelf.querySelector('.body');
    products.forEach(product => {
        const card = createProductCard(product);
        body.appendChild(card);
    });
    
    return shelf;
}

function populateCategoriesSection(categorizedProducts) {
    const categoriesBody = document.querySelector('.categories .body');
    
    if (!categoriesBody) return;
    
    categoriesBody.innerHTML = '';
    
    // Get unique categories
    const categories = Object.keys(categorizedProducts);
    
    categories.forEach(category => {
        const products = categorizedProducts[category];
        if (products.length > 0) {
            const firstProduct = products[0];
            
            // Use database image_path if available, otherwise fall back to category mapping
            const productImage = firstProduct.image_path || getProductImage(category, firstProduct.product_name);
            
            // Generate star rating
            const rating = (Math.random() * 1.5 + 4.2).toFixed(1);
            const reviewCount = Math.floor(Math.random() * 400 + 50);
            
            // Determine stock status
            const stock = firstProduct.stock || '0';
            const isLowStock = stock < 10;
            const stockText = stock > 0 ? `${stock} in stock` : 'Out of stock';
            
            const card = document.createElement('div');
            card.className = 'card';
            
            // Set innerHTML FIRST
            card.innerHTML = `
                <div class="upper">
                    <img src="${productImage}" alt="${category}">
                    ${isLowStock && stock > 0 ? '<div class="stock-badge">Low Stock</div>' : ''}
                    <div class="icons">
                        <button class="icon-btn" title="Add to wishlist">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                        <button class="icon-btn" title="Quick view">
                            <i class="fa-regular fa-eye"></i>
                        </button>
                        <button class="icon-btn" title="Add to cart">
                            <i class="fa-solid fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
                <div class="bottom">
                    <p>${category}</p>
                    <p>${firstProduct.product_name}</p>
                    <div class="rating">
                        <span class="stars">★ ${rating}</span>
                        <span class="count">(${reviewCount})</span>
                    </div>
                    <div class="stock-info">
                        <span class="price">₱${parseFloat(firstProduct.price).toFixed(2)}</span>
                        <span class="in-stock">${stockText}</span>
                    </div>
                </div>
            `;
            
            // Set data attributes AFTER innerHTML
            card.setAttribute('data-product-id', firstProduct.product_id);
            card.setAttribute('data-product-name', firstProduct.product_name);
            card.setAttribute('data-product-category', category);
            card.setAttribute('data-product-price', firstProduct.price);
            card.setAttribute('data-product-stock', firstProduct.stock);
            card.setAttribute('data-product-status', firstProduct.status || 'active');
            
            categoriesBody.appendChild(card);
        }
    });
}

function getProductImage(category, productName) {
    // Construct image path from product name
    // The images are stored in /resources/images/products/ with the product name as filename
    if (productName) {
        // Try multiple extensions in order of preference
        const encodedName = encodeURIComponent(productName);
        // We'll use jpg as primary, but the server will handle if file has different extension
        return `/FrostByte/resources/images/products/${encodedName}.jpg`;
    }
    return '/FrostByte/resources/images/background.avif';
}

// Helper function to create proper image src with fallback
function getImageSrcWithFallback(productPath, productName) {
    // If path is provided, use it
    if (productPath && productPath.trim()) {
        return productPath;
    }
    // Otherwise generate from product name
    return getProductImage('', productName);
}
