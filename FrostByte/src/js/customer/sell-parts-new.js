/**
 * Sell Parts Management
 * Handles submitting and displaying customer's sell part requests
 */

let selectedComponentType = null;
let selectedCondition = null;
let uploadedImages = {
    1: null,
    2: null,
    3: null,
    4: null
};
let currentSellPartsRequests = [];
let currentViewingRequestId = null;

/**
 * Initialize Sell Parts Module
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('Sell Parts module initializing');
    initializeSellPartsPage();
});

/**
 * Initialize Sell Parts Page
 */
function initializeSellPartsPage() {
    console.log('initializeSellPartsPage called');
    
    // Set up submit button
    const submitPartBtn = document.getElementById('submitPartBtn');
    if (submitPartBtn) {
        submitPartBtn.addEventListener('click', openSubmitPartModal);
    }

    // Set up component type buttons
    const componentBtns = document.querySelectorAll('.component-btn');
    componentBtns.forEach(btn => {
        btn.addEventListener('click', handleComponentSelection);
    });

    // Set up condition buttons
    const conditionBtns = document.querySelectorAll('.condition-btn');
    conditionBtns.forEach(btn => {
        btn.addEventListener('click', handleConditionSelection);
    });

    // Set up photo upload buttons
    const photoUploadBtns = document.querySelectorAll('.photo-upload-btn');
    photoUploadBtns.forEach(btn => {
        btn.addEventListener('click', handlePhotoUpload);
    });

    // Set up form submission
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleSubmitPart);
    }

    // Load existing requests
    loadSellPartsRequests();
}

/**
 * Open Submit Part Modal
 */
function openSubmitPartModal() {
    const modal = document.getElementById('submitPartModal');
    if (modal) {
        modal.style.display = 'flex';
        resetForm();
    }
}

/**
 * Close Submit Part Modal
 */
function closeSubmitPartModal() {
    const modal = document.getElementById('submitPartModal');
    if (modal) {
        modal.style.display = 'none';
    }
    resetForm();
}

/**
 * Reset Form
 */
function resetForm() {
    selectedComponentType = null;
    selectedCondition = null;
    uploadedImages = {
        1: null,
        2: null,
        3: null,
        4: null
    };

    // Clear selections
    document.querySelectorAll('.component-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.condition-btn').forEach(btn => btn.classList.remove('selected'));

    // Clear inputs
    document.getElementById('productNameInput').value = '';
    document.getElementById('purchaseDateInput').value = '';
    document.getElementById('originalPriceInput').value = '';
    document.getElementById('askingPriceInput').value = '';
    document.getElementById('contactPhoneInput').value = '';
    document.getElementById('quantityInput').value = '1';
    document.getElementById('additionalInfoInput').value = '';

    // Reset photo buttons
    document.querySelectorAll('.photo-upload-btn').forEach(btn => {
        btn.classList.remove('uploaded');
        btn.querySelector('.photo-status').textContent = 'Photo ' + btn.getAttribute('data-index');
    });

    // Reset submit button
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
    }
}

/**
 * Handle Component Selection
 */
function handleComponentSelection(e) {
    document.querySelectorAll('.component-btn').forEach(btn => btn.classList.remove('selected'));
    e.target.classList.add('selected');
    selectedComponentType = e.target.getAttribute('data-type');
    validateForm();
}

/**
 * Handle Condition Selection
 */
function handleConditionSelection(e) {
    document.querySelectorAll('.condition-btn').forEach(btn => btn.classList.remove('selected'));
    e.target.closest('.condition-btn').classList.add('selected');
    selectedCondition = e.target.closest('.condition-btn').getAttribute('data-condition');
    validateForm();
}

/**
 * Handle Photo Upload
 */
function handlePhotoUpload(e) {
    e.preventDefault();
    
    const index = e.target.closest('.photo-upload-btn').getAttribute('data-index');
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toastr.error('File size must be less than 5MB', 'Error');
                return;
            }

            uploadedImages[index] = file;
            const btn = document.querySelector(`.photo-upload-btn[data-index="${index}"]`);
            btn.classList.add('uploaded');
            btn.querySelector('.photo-status').textContent = '✓ Uploaded';
            
            toastr.success('Image ' + index + ' selected', 'Success');
            validateForm();
        }
    });
    input.click();
}

/**
 * Validate Form
 */
function validateForm() {
    const productName = document.getElementById('productNameInput').value.trim();
    const askingPrice = document.getElementById('askingPriceInput').value.trim();
    const contactPhone = document.getElementById('contactPhoneInput').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    
    // Check if at least one image is uploaded
    const hasImage = Object.values(uploadedImages).some(img => img !== null);
    
    const isValid = selectedComponentType && productName && selectedCondition && askingPrice && contactPhone && hasImage;
    
    if (submitBtn) {
        submitBtn.disabled = !isValid;
    }
}

/**
 * Handle Submit Part
 */
function handleSubmitPart(e) {
    e.preventDefault();

    const productName = document.getElementById('productNameInput').value.trim();
    const askingPrice = parseFloat(document.getElementById('askingPriceInput').value);
    const contactPhone = document.getElementById('contactPhoneInput').value.trim();
    const quantity = parseInt(document.getElementById('quantityInput').value) || 1;
    const additionalInfo = document.getElementById('additionalInfoInput').value.trim();

    // Validate price
    if (isNaN(askingPrice) || askingPrice <= 0) {
        toastr.error('Please enter a valid asking price', 'Error');
        return;
    }

    // Validate phone
    if (!contactPhone) {
        toastr.error('Please enter your contact phone number', 'Error');
        return;
    }

    const formData = new FormData();
    formData.append('part_name', productName);
    formData.append('category', selectedComponentType);
    formData.append('condition', selectedCondition);
    formData.append('price', askingPrice);
    formData.append('quantity', quantity);
    formData.append('description', additionalInfo);
    formData.append('contact_phone', contactPhone);

    // Append all uploaded images
    let imageCount = 0;
    for (let i = 1; i <= 4; i++) {
        if (uploadedImages[i]) {
            formData.append(`image_${i}`, uploadedImages[i]);
            imageCount++;
        }
    }

    if (imageCount === 0) {
        toastr.error('Please upload at least one image', 'Error');
        return;
    }

    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Submit to API
    fetch('/FrostByte/src/PHP/api/create_sell_part.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        if (data.success) {
            toastr.success('Part submitted for appraisal!', 'Success');
            closeSubmitPartModal();
            loadSellPartsRequests(); // Reload the list
        } else {
            toastr.error(data.message || 'Failed to submit part', 'Error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        toastr.error('An error occurred while submitting', 'Error');
    });
}

/**
 * Load Sell Parts Requests
 */
function loadSellPartsRequests() {
    const requestsList = document.getElementById('buybackRequestsList');
    if (!requestsList) return;

    requestsList.innerHTML = '<p class="empty-state">Loading requests...</p>';

    fetch('/FrostByte/src/PHP/api/get_sell_parts.php')
        .then(response => {
            console.log('Sell parts API response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Sell parts data received:', data);
            
            currentSellPartsRequests = data.data || [];
            
            console.log('Total sell parts requests:', currentSellPartsRequests.length);
            
            if (!currentSellPartsRequests || currentSellPartsRequests.length === 0) {
                requestsList.innerHTML = '<p class="empty-state">No buyback requests yet. Submit an item to get started!</p>';
                return;
            }

            displaySellPartsRequests();
        })
        .catch(error => {
            console.error('Error loading sell parts requests:', error);
            requestsList.innerHTML = '<p class="empty-state">Error loading requests</p>';
        });
}

/**
 * Display Sell Parts Requests
 */
function displaySellPartsRequests(requests = currentSellPartsRequests) {
    const requestsList = document.getElementById('buybackRequestsList');
    
    if (!requests || requests.length === 0) {
        requestsList.innerHTML = '<p class="empty-state">No buyback requests yet. Submit an item to get started!</p>';
        return;
    }

    requestsList.innerHTML = '';

    requests.forEach(request => {
        const card = createSellPartCard(request);
        requestsList.appendChild(card);
    });
}

/**
 * Create Sell Part Card
 */
function createSellPartCard(request) {
    const card = document.createElement('div');
    card.className = 'sell-part-card';

    // Format date
    let formattedDate = 'N/A';
    try {
        const reqDate = new Date(request.created_at);
        formattedDate = reqDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        formattedDate = request.created_at || 'N/A';
    }

    // Get status class
    const statusClass = request.status.toLowerCase();
    const statusText = request.status.charAt(0).toUpperCase() + request.status.slice(1);
    
    // Format price
    const formattedPrice = `₱${(request.price || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    // Get first available image - improved path handling
    const placeholderSvg = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect width=%2260%22 height=%2260%22 fill=%22%23e5e7eb%22/%3E%3C/svg%3E';
    let imageUrl = placeholderSvg;
    for (let i = 1; i <= 4; i++) {
        const imagePath = request[`image_path_${i}`];
        if (imagePath && imagePath.trim()) {
            // Clean up the path
            let cleanPath = imagePath.trim();
            // Remove /FrostByte/ prefix if it exists to avoid double prefix
            if (cleanPath.startsWith('/FrostByte/')) {
                imageUrl = cleanPath;
            } else if (cleanPath.startsWith('http')) {
                imageUrl = cleanPath;
            } else {
                // Add /FrostByte/ prefix if not present
                imageUrl = '/FrostByte/' + cleanPath.replace(/^\/+/, '');
            }
            break;
        }
    }

    card.innerHTML = `
        <div class="sell-part-card-header">
            <div class="sell-part-image">
                <img src="${imageUrl}" alt="${request.part_name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect width=%2260%22 height=%2260%22 fill=%22%23e5e7eb%22/%3E%3C/svg%3E'">
            </div>
            <div class="sell-part-info">
                <h3 class="sell-part-name">${request.part_name}</h3>
                <p class="sell-part-category">${request.category}</p>
                <p class="sell-part-condition">Condition: <strong>${request.condition}</strong></p>
                <p class="sell-part-date">Submitted: ${formattedDate}</p>
            </div>
            <div class="sell-part-status">
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
        </div>
        
        <div class="sell-part-details">
            <div class="detail-row">
                <span class="detail-label">Asking Price:</span>
                <span class="detail-value">${formattedPrice}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Quantity:</span>
                <span class="detail-value">${request.quantity}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Contact:</span>
                <span class="detail-value">${request.contact_phone || 'N/A'}</span>
            </div>
            ${request.description ? `
            <div class="detail-row">
                <span class="detail-label">Description:</span>
                <span class="detail-value">${request.description}</span>
            </div>
            ` : ''}
        </div>

        <div class="sell-part-actions">
            <button class="action-btn view-btn" onclick="viewSellPartDetails('${request.request_id}')">
                <i class="fa-solid fa-eye"></i> View Details
            </button>
            ${request.status === 'pending' ? `
            <button class="action-btn cancel-btn" onclick="cancelSellPart('${request.request_id}')">
                <i class="fa-solid fa-trash"></i> Cancel
            </button>
            ` : ''}
        </div>
    `;

    return card;
}

/**
 * View Sell Part Details - Opens detail modal
 */
function viewSellPartDetails(requestId) {
    const request = currentSellPartsRequests.find(r => r.request_id === requestId);
    if (!request) {
        toastr.error('Request not found', 'Error');
        return;
    }

    // Format date
    const date = new Date(request.created_at);
    const formattedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Set modal content
    document.getElementById('detailRequestId').textContent = request.request_id;
    document.getElementById('detailProductName').textContent = request.part_name;
    document.getElementById('detailCategory').textContent = request.category;
    document.getElementById('detailCondition').textContent = request.condition.charAt(0).toUpperCase() + request.condition.slice(1);
    document.getElementById('detailPrice').textContent = `₱${(request.price || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('detailQuantity').textContent = request.quantity;
    document.getElementById('detailPhone').textContent = request.contact_phone;
    
    const statusText = request.status.charAt(0).toUpperCase() + request.status.slice(1);
    document.getElementById('detailStatus').textContent = statusText;
    document.getElementById('detailDate').textContent = formattedDate;

    // Set description if available
    if (request.description) {
        document.getElementById('detailDescription').textContent = request.description;
        document.getElementById('descriptionSection').style.display = 'block';
    } else {
        document.getElementById('descriptionSection').style.display = 'none';
    }

    // Set up images with improved path handling
    const images = [
        request.image_path_1 || request.image_path,
        request.image_path_2,
        request.image_path_3,
        request.image_path_4
    ].filter(img => img && img.trim());

    // Helper function to clean image paths
    function cleanImagePath(imagePath) {
        const placeholderSvg = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect width=%22300%22 height=%22300%22 fill=%22%23e5e7eb%22/%3E%3C/svg%3E';
        if (!imagePath) return placeholderSvg;
        
        let cleanPath = imagePath.trim();
        if (cleanPath.startsWith('/FrostByte/')) {
            return cleanPath;
        } else if (cleanPath.startsWith('http')) {
            return cleanPath;
        } else {
            return '/FrostByte/' + cleanPath.replace(/^\/+/, '');
        }
    }

    const mainImage = document.getElementById('mainImage');
    if (images.length > 0) {
        mainImage.src = cleanImagePath(images[0]);
    } else {
        mainImage.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect width=%22300%22 height=%22300%22 fill=%22%23e5e7eb%22/%3E%3C/svg%3E';
    }

    // Set thumbnails
    for (let i = 1; i <= 4; i++) {
        const thumb = document.getElementById(`thumb${i}`);
        if (images[i - 1]) {
            thumb.src = cleanImagePath(images[i - 1]);
            thumb.style.display = 'block';
        } else {
            thumb.style.display = 'none';
        }
    }

    // Show/hide cancel button based on status
    const cancelBtn = document.getElementById('detailCancelBtn');
    if (request.status === 'pending') {
        cancelBtn.style.display = 'block';
    } else {
        cancelBtn.style.display = 'none';
    }

    // Store current request ID for cancel functionality
    currentViewingRequestId = requestId;

    // Open modal
    const modal = document.getElementById('sellPartDetailsModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

/**
 * Close Sell Part Details Modal
 */
function closeSellPartDetailsModal() {
    const modal = document.getElementById('sellPartDetailsModal');
    if (modal) {
        modal.style.display = 'none';
    }
    currentViewingRequestId = null;
}

/**
 * Change main image in detail view
 */
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = thumbnail.src;
}

/**
 * Confirm Cancel Sell Part - Shows confirmation before cancelling
 */
function confirmCancelSellPart() {
    if (!currentViewingRequestId) {
        toastr.error('No request selected', 'Error');
        return;
    }

    // Show confirmation dialog
    if (confirm('Are you sure you want to cancel this request? This action cannot be undone.')) {
        archiveSellPart(currentViewingRequestId);
    }
}

/**
 * Archive Sell Part - Updates status to archived
 */
function archiveSellPart(requestId) {
    const cancelBtn = document.getElementById('detailCancelBtn');
    if (cancelBtn) {
        cancelBtn.disabled = true;
        cancelBtn.textContent = 'Cancelling...';
    }

    fetch('/FrostByte/src/PHP/api/archive_sell_part.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `request_id=${encodeURIComponent(requestId)}`
    })
    .then(response => {
        console.log('Cancel response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Cancel response:', data);
        
        if (data.success) {
            toastr.success('Request cancelled successfully', 'Success');
            closeSellPartDetailsModal();
            loadSellPartsRequests();
        } else {
            toastr.error(data.message || 'Failed to cancel request', 'Error');
        }
    })
    .catch(error => {
        console.error('Cancel error:', error);
        toastr.error('An error occurred while cancelling', 'Error');
    })
    .finally(() => {
        if (cancelBtn) {
            cancelBtn.disabled = false;
            cancelBtn.textContent = 'Cancel Request';
        }
    });
}

/**
 * Cancel Sell Part (Legacy function name - calls archiveSellPart)
 */
function cancelSellPart(requestId) {
    archiveSellPart(requestId);
}
