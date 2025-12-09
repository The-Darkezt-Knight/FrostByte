/**
 * Sell Parts Management
 * Handles buyback requests, item submission, and offers
 */

let sellPartsData = {
    buybackRequests: [],
    currentSubmission: {
        componentType: null,
        productName: '',
        purchaseDate: '',
        originalPrice: '',
        condition: null,
        photos: [],
        additionalInfo: ''
    }
};

/**
 * Initialize Sell Parts Module
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeSellParts();
});

function initializeSellParts() {
    setupSellPartsEventHandlers();
    loadBuybackRequests();
}

/**
 * Setup Event Handlers
 */
function setupSellPartsEventHandlers() {
    // Submit Part Button
    const submitPartBtn = document.getElementById('submitPartBtn');
    if (submitPartBtn) {
        submitPartBtn.addEventListener('click', openSubmitPartModal);
    }

    // Component Type Buttons
    document.querySelectorAll('.component-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.component-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            sellPartsData.currentSubmission.componentType = this.dataset.type;
            updateSubmitButtonState();
        });
    });

    // Condition Buttons
    document.querySelectorAll('.condition-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.condition-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            sellPartsData.currentSubmission.condition = this.dataset.condition;
            updateSubmitButtonState();
        });
    });

    // Product Name Input
    const productNameInput = document.getElementById('productNameInput');
    if (productNameInput) {
        productNameInput.addEventListener('input', function() {
            sellPartsData.currentSubmission.productName = this.value;
            updateSubmitButtonState();
        });
    }

    // Purchase Date Input
    const purchaseDateInput = document.getElementById('purchaseDateInput');
    if (purchaseDateInput) {
        purchaseDateInput.addEventListener('change', function() {
            sellPartsData.currentSubmission.purchaseDate = this.value;
        });
    }

    // Original Price Input
    const originalPriceInput = document.getElementById('originalPriceInput');
    if (originalPriceInput) {
        originalPriceInput.addEventListener('input', function() {
            sellPartsData.currentSubmission.originalPrice = this.value;
        });
    }

    // Additional Info Textarea
    const additionalInfoInput = document.getElementById('additionalInfoInput');
    if (additionalInfoInput) {
        additionalInfoInput.addEventListener('input', function() {
            sellPartsData.currentSubmission.additionalInfo = this.value;
        });
    }

    // Photo Upload Buttons
    document.querySelectorAll('.photo-upload-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real implementation, this would trigger file upload
            toastr.info('Photo upload functionality would be implemented here', 'Upload');
        });
    });

    // Submit Button
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitBuybackRequest);
    }
}

/**
 * Update Submit Button State
 */
function updateSubmitButtonState() {
    const submitBtn = document.getElementById('submitBtn');
    const isValid = sellPartsData.currentSubmission.componentType &&
                   sellPartsData.currentSubmission.productName &&
                   sellPartsData.currentSubmission.condition;
    
    if (submitBtn) {
        submitBtn.disabled = !isValid;
    }
}

/**
 * Open Submit Part Modal
 */
function openSubmitPartModal() {
    const modal = document.getElementById('submitPartModal');
    if (modal) {
        modal.classList.add('active');
        // Reset form
        resetSubmitForm();
    }
}

/**
 * Close Submit Part Modal
 */
function closeSubmitPartModal() {
    const modal = document.getElementById('submitPartModal');
    if (modal) {
        modal.classList.remove('active');
        resetSubmitForm();
    }
}

/**
 * Reset Submit Form
 */
function resetSubmitForm() {
    // Reset data
    sellPartsData.currentSubmission = {
        componentType: null,
        productName: '',
        purchaseDate: '',
        originalPrice: '',
        condition: null,
        photos: [],
        additionalInfo: ''
    };

    // Reset UI
    document.querySelectorAll('.component-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.condition-btn').forEach(btn => btn.classList.remove('selected'));
    
    document.getElementById('productNameInput').value = '';
    document.getElementById('purchaseDateInput').value = '';
    document.getElementById('originalPriceInput').value = '';
    document.getElementById('additionalInfoInput').value = '';
    
    updateSubmitButtonState();
}

/**
 * Submit Buyback Request
 */
function submitBuybackRequest() {
    const submission = sellPartsData.currentSubmission;

    // Validate
    if (!submission.componentType || !submission.productName || !submission.condition) {
        toastr.warning('Please fill in all required fields', 'Validation Error');
        return;
    }

    // Create request object
    const request = {
        id: 'BBR-' + Date.now(),
        componentType: submission.componentType,
        productName: submission.productName,
        condition: submission.condition,
        status: 'Under Review',
        submittedDate: new Date().toLocaleDateString(),
        purchaseDate: submission.purchaseDate,
        originalPrice: submission.originalPrice,
        additionalInfo: submission.additionalInfo,
        estimatedValue: generateEstimatedValue(),
        images: 0
    };

    // Add to requests
    sellPartsData.buybackRequests.unshift(request);

    // Save to localStorage
    localStorage.setItem('buybackRequests', JSON.stringify(sellPartsData.buybackRequests));

    toastr.success('Item submitted successfully! We will review it within 24-48 hours.', 'Submission Successful');
    
    closeSubmitPartModal();
    renderBuybackRequests();
}

/**
 * Generate Estimated Value (Mock)
 */
function generateEstimatedValue() {
    const baseValue = Math.random() * 15000 + 5000;
    return Math.round(baseValue / 100) * 100;
}

/**
 * Load Buyback Requests
 */
function loadBuybackRequests() {
    const saved = localStorage.getItem('buybackRequests');
    
    if (saved) {
        sellPartsData.buybackRequests = JSON.parse(saved);
    } else {
        // Load sample data
        sellPartsData.buybackRequests = [
            {
                id: 'BBR-001',
                componentType: 'GPU',
                productName: 'RTX 3080 Ti',
                condition: 'excellent',
                status: 'Completed',
                submittedDate: 'Nov 15, 2025',
                estimatedValue: 18000,
                images: 4,
                paidAmount: 17500,
                offer: null
            },
            {
                id: 'BBR-002',
                componentType: 'CPU',
                productName: 'Intel Core i9-13900K',
                condition: 'good',
                status: 'Offer Received',
                submittedDate: 'Nov 20, 2025',
                estimatedValue: 22000,
                images: 3,
                offer: 20500,
                paidAmount: null
            },
            {
                id: 'BBR-003',
                componentType: 'RAM',
                productName: 'Corsair Vengeance 32GB DDR5',
                condition: 'fair',
                status: 'Under Review',
                submittedDate: 'Dec 5, 2025',
                estimatedValue: 8000,
                images: 2,
                offer: null,
                paidAmount: null
            }
        ];
    }

    renderBuybackRequests();
}

/**
 * Render Buyback Requests
 */
function renderBuybackRequests() {
    const listContainer = document.getElementById('buybackRequestsList');
    
    if (!listContainer) return;

    if (sellPartsData.buybackRequests.length === 0) {
        listContainer.innerHTML = '<p class="empty-state">No buyback requests yet. Submit an item to get started!</p>';
        return;
    }

    listContainer.innerHTML = '';

    sellPartsData.buybackRequests.forEach(request => {
        const card = createBuybackCard(request);
        listContainer.appendChild(card);
    });
}

/**
 * Create Buyback Card
 */
function createBuybackCard(request) {
    const card = document.createElement('div');
    card.className = 'buyback-card';

    let statusBadgeClass = '';
    switch (request.status) {
        case 'Completed':
            statusBadgeClass = 'status-completed';
            break;
        case 'Offer Received':
            statusBadgeClass = 'status-offer-received';
            break;
        case 'Under Review':
            statusBadgeClass = 'status-under-review';
            break;
    }

    let offerSection = '';
    if (request.status === 'Offer Received' && request.offer) {
        offerSection = `
            <div class="offer-section">
                <div class="offer-details">
                    <h5>Our Offer</h5>
                    <p class="offer-amount">₱${request.offer.toLocaleString()}</p>
                </div>
                <i class="fa-solid fa-circle-check offer-icon"></i>
            </div>
        `;
    }

    let paymentSection = '';
    if (request.status === 'Completed' && request.paidAmount) {
        paymentSection = `
            <div class="payment-section">
                <div class="payment-details">
                    <h5>Payment Completed</h5>
                    <p class="payment-amount">₱${request.paidAmount.toLocaleString()}</p>
                </div>
                <i class="fa-solid fa-circle-check payment-icon"></i>
            </div>
        `;
    }

    let actionsHTML = '';
    if (request.status === 'Offer Received') {
        actionsHTML = `
            <div class="buyback-actions">
                <button class="action-btn btn-accept" onclick="acceptOffer('${request.id}')">
                    <i class="fa-solid fa-check"></i>
                    Accept Offer
                </button>
                <button class="action-btn btn-decline" onclick="declineOffer('${request.id}')">
                    <i class="fa-solid fa-xmark"></i>
                    Decline
                </button>
            </div>
        `;
    } else if (request.status === 'Under Review') {
        actionsHTML = `
            <div class="buyback-actions">
                <button class="action-btn btn-waiting" disabled>
                    <i class="fa-solid fa-hourglass-end"></i>
                    Waiting for Appraisal
                </button>
            </div>
        `;
    } else if (request.status === 'Completed') {
        actionsHTML = `
            <div class="buyback-actions">
                <button class="action-btn btn-receipt" onclick="viewReceipt('${request.id}')">
                    <i class="fa-solid fa-receipt"></i>
                    View Receipt
                </button>
            </div>
        `;
    }

    card.innerHTML = `
        <div class="buyback-card-header">
            <div class="buyback-card-title">
                <h4>${request.productName}</h4>
                <span class="status-badge ${statusBadgeClass}">${request.status}</span>
            </div>
            <div class="buyback-card-meta">
                <span><i class="fa-solid fa-hashtag"></i>${request.id}</span>
                <span>•</span>
                <span><i class="fa-solid fa-microchip"></i>${request.componentType}</span>
                <span>•</span>
                <span><i class="fa-solid fa-calendar"></i>Submitted ${request.submittedDate}</span>
            </div>
        </div>
        <div class="buyback-card-body">
            <div class="buyback-details-grid">
                <div class="detail-item">
                    <div class="detail-label">Condition</div>
                    <div class="detail-value">${request.condition.charAt(0).toUpperCase() + request.condition.slice(1)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Estimated Value</div>
                    <div class="detail-value">₱${request.estimatedValue.toLocaleString()}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Photos Uploaded</div>
                    <div class="detail-value">${request.images} images</div>
                </div>
            </div>
            ${offerSection}
            ${paymentSection}
            ${actionsHTML}
        </div>
    `;

    return card;
}

/**
 * Accept Offer
 */
function acceptOffer(requestId) {
    const request = sellPartsData.buybackRequests.find(r => r.id === requestId);
    if (request) {
        request.status = 'Completed';
        request.paidAmount = request.offer;
        request.offer = null;
        
        localStorage.setItem('buybackRequests', JSON.stringify(sellPartsData.buybackRequests));
        toastr.success('Offer accepted! Payment will be processed within 2-3 business days.', 'Offer Accepted');
        renderBuybackRequests();
    }
}

/**
 * Decline Offer
 */
function declineOffer(requestId) {
    const request = sellPartsData.buybackRequests.find(r => r.id === requestId);
    if (request) {
        sellPartsData.buybackRequests = sellPartsData.buybackRequests.filter(r => r.id !== requestId);
        localStorage.setItem('buybackRequests', JSON.stringify(sellPartsData.buybackRequests));
        toastr.info('Offer declined. You can submit another item anytime.', 'Offer Declined');
        renderBuybackRequests();
    }
}

/**
 * View Receipt
 */
function viewReceipt(requestId) {
    const request = sellPartsData.buybackRequests.find(r => r.id === requestId);
    if (request) {
        const receiptHTML = `
            <div style="padding: 20px; text-align: center;">
                <h3>Transaction Receipt</h3>
                <p><strong>Request ID:</strong> ${request.id}</p>
                <p><strong>Item:</strong> ${request.productName}</p>
                <p><strong>Amount Paid:</strong> ₱${request.paidAmount.toLocaleString()}</p>
                <p><strong>Date:</strong> ${request.submittedDate}</p>
            </div>
        `;
        toastr.info(receiptHTML, 'Receipt', { positionClass: 'toast-center-center', closeButton: true });
    }
}

/**
 * Navigation Integration
 */
function goToSellParts() {
    const mainPanel = document.getElementById('main-panel');
    const orders = document.getElementById('orders');
    const cart = document.getElementById('cart');
    const services = document.getElementById('services');
    const sellParts = document.getElementById('sell-parts');
    const accountSettings = document.getElementById('account-settings');

    if (mainPanel) mainPanel.style.display = 'none';
    if (orders) orders.style.display = 'none';
    if (cart) cart.style.display = 'none';
    if (services) services.style.display = 'none';
    if (accountSettings) accountSettings.style.display = 'none';

    if (sellParts) {
        sellParts.style.display = 'block';
        // Scroll to top
        window.scrollTo(0, 0);
    }
}
