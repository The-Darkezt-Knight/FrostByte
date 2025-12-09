// Buy Back Management Script

let currentBuybackId = null;
let allBuybackRequests = [];
let filteredRequests = [];

document.addEventListener('DOMContentLoaded', function() {
    // Load buyback requests on page load
    loadBuybackRequests();

    // Event listeners for filters
    const filterStatus = document.getElementById('filter-status');
    const filterCondition = document.getElementById('filter-condition');
    const filterSearch = document.getElementById('filter-search');
    
    if (filterStatus) filterStatus.addEventListener('change', filterBuybackRequests);
    if (filterCondition) filterCondition.addEventListener('change', filterBuybackRequests);
    if (filterSearch) filterSearch.addEventListener('input', filterBuybackRequests);

    // Modal close button
    const closeModalBtn = document.getElementById('close-modal-btn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeBuybackModal);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('buyback-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBuybackModal();
            }
        });
    }
});

// Load buyback requests from database
function loadBuybackRequests() {
    fetch('/FrostByte/src/PHP/api/get_buyback_requests.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                allBuybackRequests = data.data;
                filteredRequests = [...allBuybackRequests];
                displayBuybackRequests(filteredRequests);
                updateBuybackStats();
            } else {
                console.error('Error:', data.message);
                showEmptyState('Error loading requests');
            }
        })
        .catch(error => {
            console.error('Error loading requests:', error);
            showEmptyState('Error connecting to server');
        });
}

// Display buyback requests in table
function displayBuybackRequests(requests) {
    const tbody = document.getElementById('buyback-tbody');

    if (requests.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align: center; padding: 40px; color: #94a3b8;">
                    <div style="font-size: 48px; margin-bottom: 15px; opacity: 0.5;">📦</div>
                    <p style="margin: 0;">No sell part requests found</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = requests.map(request => `
        <tr>
            <td style="font-weight: 500;">${request.request_id || 'N/A'}</td>
            <td>
                <div style="margin-bottom: 3px;">${request.customer_name}</div>
                <div style="font-size: 12px; color: #94a3b8;">${request.contact_phone}</div>
            </td>
            <td>${request.part_name}</td>
            <td>
                <span class="condition-${request.condition.toLowerCase()}">
                    ${request.condition}
                </span>
            </td>
            <td>$${parseFloat(request.price).toFixed(2)}</td>
            <td>Qty: ${request.quantity}</td>
            <td>
                <span class="status-badge status-${request.status.toLowerCase().replace(/\s+/g, '-')}">
                    ${request.status}
                </span>
            </td>
            <td>${formatDate(request.created_at)}</td>
            <td>
                <button class="btn-view" onclick="openBuybackModal(${request.id})">Review</button>
            </td>
        </tr>
    `).join('');
}

// Filter buyback requests
function filterBuybackRequests() {
    const statusFilter = document.getElementById('filter-status').value.toLowerCase();
    const conditionFilter = document.getElementById('filter-condition').value.toLowerCase();
    const searchFilter = document.getElementById('filter-search').value.toLowerCase();

    filteredRequests = allBuybackRequests.filter(request => {
        const matchStatus = !statusFilter || request.status.toLowerCase().includes(statusFilter);
        const matchCondition = !conditionFilter || request.condition.toLowerCase().includes(conditionFilter);
        const matchSearch = !searchFilter || 
            request.customer_name.toLowerCase().includes(searchFilter) ||
            request.component_name.toLowerCase().includes(searchFilter) ||
            request.customer_email.toLowerCase().includes(searchFilter);

        return matchStatus && matchCondition && matchSearch;
    });

    displayBuybackRequests(filteredRequests);
}

// Open buyback detail modal
function openBuybackModal(requestId) {
    const request = allBuybackRequests.find(r => r.id === requestId);
    if (!request) return;

    currentBuybackId = requestId;

    // Populate modal with request data
    const modalCustomerName = document.getElementById('modal-customer-name');
    const modalCustomerEmail = document.getElementById('modal-customer-email');
    const modalComponentName = document.getElementById('modal-component-name');
    const modalComponentCategory = document.getElementById('modal-component-category');
    const modalCondition = document.getElementById('modal-condition');
    const modalExpectedPrice = document.getElementById('modal-expected-price');
    const modalQuantity = document.getElementById('modal-quantity');
    const modalDescription = document.getElementById('modal-description');
    const modalOfferPrice = document.getElementById('modal-offer-price');
    const modalStatus = document.getElementById('modal-status');
    const modalOfferMessage = document.getElementById('modal-offer-message');

    if (modalCustomerName) modalCustomerName.textContent = request.customer_name;
    if (modalCustomerEmail) modalCustomerEmail.textContent = request.contact_phone;
    if (modalComponentName) modalComponentName.textContent = request.part_name;
    if (modalComponentCategory) modalComponentCategory.textContent = request.category || 'N/A';
    if (modalCondition) {
        modalCondition.textContent = request.condition;
        modalCondition.className = `condition-${request.condition.toLowerCase()}`;
    }
    if (modalQuantity) modalQuantity.textContent = request.quantity + ' unit(s)';
    if (modalDescription) modalDescription.textContent = request.description || 'No description provided';
    if (modalExpectedPrice) modalExpectedPrice.textContent = '$' + parseFloat(request.price).toFixed(2);
    if (modalOfferPrice) modalOfferPrice.value = '';
    if (modalStatus) {
        modalStatus.textContent = request.status;
        modalStatus.className = `status-badge status-${request.status.toLowerCase().replace(/\s+/g, '-')}`;
    }
    if (modalOfferMessage) modalOfferMessage.value = '';

    // Load images
    loadProductImages(request);

    const modal = document.getElementById('buyback-modal');
    if (modal) modal.classList.add('active');
}

// Load product images into gallery
function loadProductImages(request) {
    const imagePaths = [
        request.image_path_1,
        request.image_path_2,
        request.image_path_3,
        request.image_path_4
    ];

    const mainImage = document.getElementById('modal-main-image');
    const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f3f4f6" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" font-size="16" fill="%236b7280" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';

    // Load thumbnails
    for (let i = 0; i < 4; i++) {
        const thumb = document.getElementById(`thumb-${i + 1}`);
        if (thumb) {
            if (imagePaths[i]) {
                thumb.src = imagePaths[i];
                thumb.style.display = 'block';
            } else {
                thumb.style.display = 'none';
            }
        }
    }

    // Set main image to first available image
    if (imagePaths[0]) {
        mainImage.src = imagePaths[0];
    } else {
        mainImage.src = placeholderImage;
    }
}

// Change main image when thumbnail is clicked
function setMainImage(thumbnail) {
    const mainImage = document.getElementById('modal-main-image');
    if (thumbnail.src) {
        mainImage.src = thumbnail.src;
    }
}

// Close buyback modal
function closeBuybackModal() {
    const modal = document.getElementById('buyback-modal');
    if (modal) modal.classList.remove('active');
    currentBuybackId = null;
}

// Approve buyback request
function approveBuybackRequest() {
    if (!currentBuybackId) return;

    const offerPrice = parseFloat(document.getElementById('modal-offer-price').value);
    const offerMessage = document.getElementById('modal-offer-message').value;

    if (!offerPrice || offerPrice < 0) {
        alert('Please enter a valid offer price');
        return;
    }

    const data = {
        request_id: currentBuybackId,
        offer_price: offerPrice,
        offer_message: offerMessage,
        status: 'Offer Sent'
    };

    fetch('/FrostByte/src/PHP/api/approve_buyback_request.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            toastr.success('Buyback offer sent successfully!');
            closeBuybackModal();
            loadBuybackRequests();
        } else {
            toastr.error(result.message || 'Error approving request');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        toastr.error('Error approving request');
    });
}

// Reject buyback request
function rejectBuybackRequest() {
    if (!currentBuybackId) return;

    if (!confirm('Are you sure you want to reject this buyback request?')) {
        return;
    }

    const data = {
        request_id: currentBuybackId,
        status: 'Rejected'
    };

    fetch('/FrostByte/src/PHP/api/reject_buyback_request.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            toastr.success('Buyback request rejected');
            closeBuybackModal();
            loadBuybackRequests();
        } else {
            toastr.error(result.message || 'Error rejecting request');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        toastr.error('Error rejecting request');
    });
}

// Update buyback statistics
function updateBuybackStats() {
    const stats = {
        'Pending': 0,
        'Approved': 0,
        'Rejected': 0,
        'Completed': 0
    };

    allBuybackRequests.forEach(request => {
        if (stats.hasOwnProperty(request.status)) {
            stats[request.status]++;
        }
    });

    document.getElementById('stat-pending').textContent = stats['Pending'];
    document.getElementById('stat-offer-sent').textContent = stats['Approved'];
    document.getElementById('stat-accepted').textContent = stats['Completed'];
    document.getElementById('stat-rejected').textContent = stats['Rejected'];
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Show empty state
function showEmptyState(message = 'No buyback requests found') {
    const tbody = document.getElementById('buyback-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = `
        <tr>
            <td colspan="9" style="text-align: center; padding: 40px; color: #94a3b8;">
                <div style="font-size: 48px; margin-bottom: 15px; opacity: 0.5;">📦</div>
                <p style="margin: 0;">${message}</p>
            </td>
        </tr>
    `;
}
