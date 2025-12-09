/**
 * Services Booking Management (Simplified Inline Version)
 * Handles service booking through an inline form
 */

// Service Type Pricing
const servicePrices = {
    'pc-assembly': 1500,
    'office-setup': 3000,
    'school-lab': 5000,
    'diagnostics': 500
};

const serviceNames = {
    'pc-assembly': 'PC Assembly',
    'office-setup': 'Office Setup',
    'school-lab': 'School Lab Setup',
    'diagnostics': 'Diagnostics / Repair'
};

/**
 * Initialize Services Module
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded - Initializing services panel');
    initializeServicesPanel();
    setMinDate();
});

/**
 * Initialize Services Panel
 */
function initializeServicesPanel() {
    console.log('initializeServicesPanel called');
    
    const bookingForm = document.getElementById('inlineBookingForm');
    console.log('Booking form element:', bookingForm);
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // Load existing service requests
    console.log('About to load service requests');
    loadServiceRequests();
}

/**
 * Set Minimum Date for Date Input
 */
function setMinDate() {
    const dateInput = document.getElementById('serviceDate');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.min = minDate;
    }
}

/**
 * Handle Booking Form Submit
 */
function handleBookingSubmit(e) {
    e.preventDefault();

    // Get form values
    const serviceType = document.getElementById('serviceType').value;
    const serviceDate = document.getElementById('serviceDate').value;
    const serviceTime = document.getElementById('serviceTime').value;
    const serviceAddress = document.getElementById('serviceAddress').value;
    const serviceContact = document.getElementById('serviceContact').value;
    const serviceNotes = document.getElementById('serviceNotes').value;

    // Validate form
    if (!serviceType || !serviceDate || !serviceTime || !serviceAddress || !serviceContact) {
        toastr.error('Please fill in all required fields');
        return;
    }

    // Prepare data for API
    const apiData = {
        service_type: serviceType,
        preferred_date: serviceDate,
        preferred_time: serviceTime,
        location: serviceAddress,
        contact_number: serviceContact,
        notes: serviceNotes || null
    };

    console.log('Submitting service request:', apiData);

    // Show loading state
    const submitBtn = document.querySelector('.submit-booking-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

    // Send to backend API
    fetch('/FrostByte/src/PHP/api/create_service_request.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiData)
    })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json().then(data => ({status: response.status, data: data}));
        })
        .then(({status, data}) => {
            console.log('Response data:', data);
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            if (data.success) {
                toastr.success('Service request submitted successfully!');
                document.getElementById('inlineBookingForm').reset();
                loadServiceRequests();
            } else {
                toastr.error(data.message || 'Error submitting service request');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            toastr.error('Error submitting service request');
        });
}

/**
 * Load Service Requests from Database
 */
function loadServiceRequests() {
    const requestsList = document.getElementById('serviceRequestsList');

    if (!requestsList) {
        console.log('serviceRequestsList element not found');
        return;
    }

    // Fetch service requests from API
    fetch('/FrostByte/src/PHP/api/get_service_requests.php')
        .then(response => {
            console.log('Response received, status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                console.error('Content-Type:', contentType);
                throw new Error('Server returned invalid response format');
            }
        })
        .then(data => {
            console.log('Data received:', data);
            // Handle both direct array and wrapped response formats
            let requests = Array.isArray(data) ? data : (data.data || []);

            console.log('Requests array:', requests);

            if (!requests || requests.length === 0) {
                requestsList.innerHTML = '<p class="empty-state">No service requests yet. Book a service to get started!</p>';
                return;
            }

            requestsList.innerHTML = '';

            // Sort by date (newest first)
            requests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            requests.forEach(request => {
                console.log('Creating card for request:', request);
                const card = createServiceRequestCard(request);
                requestsList.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading service requests:', error);
            requestsList.innerHTML = '<p class="empty-state">Error loading service requests: ' + error.message + '</p>';
        });
}

/**
 * Create Service Request Card
 */
function createServiceRequestCard(request) {
    const card = document.createElement('div');
    card.className = 'service-request-card';

    // Handle date formatting
    let formattedDate = '';
    try {
        const createdDate = new Date(request.created_at);
        formattedDate = createdDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        formattedDate = request.created_at || 'N/A';
    }

    const serviceName = serviceNames[request.service_type] || request.service_type;
    const statusClass = request.status ? request.status.toLowerCase().replace(/\s+/g, '-') : 'pending';

    // Get service fee
    const serviceFee = servicePrices[request.service_type] || 0;
    const formattedFee = `₱${serviceFee.toLocaleString()}`;

    const requestId = request.request_id;
    const notes = request.notes || request.description || '';

    card.innerHTML = `
        <div class="request-info">
            <h4>${serviceName}</h4>
            <p><strong>Reference:</strong> ${requestId}</p>
            <p><strong>Scheduled:</strong> ${request.preferred_date || 'N/A'} @ ${request.preferred_time || 'N/A'}</p>
            <p><strong>Location:</strong> ${request.location || 'N/A'}</p>
            <p><strong>Service Fee:</strong> <span style="color: #0390dc; font-weight: 600;">${formattedFee}</span></p>
            <p><strong>Submitted:</strong> ${formattedDate}</p>
            ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
        </div>
        <div style="display: flex; align-items: center; gap: 15px; flex-shrink: 0;">
            <span class="request-status ${statusClass}">${request.status || 'Pending'}</span>
            <div class="request-actions">
                <button onclick="viewServiceDetails('${requestId}')">View</button>
                <button class="delete-btn" onclick="deleteServiceRequest('${requestId}')">Cancel</button>
            </div>
        </div>
    `;

    return card;
}

/**
 * View Service Request Details
 */
function viewServiceDetails(requestId) {
    console.log('Viewing service details for request:', requestId);
    // Fetch and display detailed information
    fetch(`/FrostByte/src/PHP/api/get_service_requests.php?request_id=${requestId}`)
        .then(response => response.json())
        .then(data => {
            const request = data.data || data;
            
            const serviceName = serviceNames[request.service_type] || request.service_type;
            const serviceFee = servicePrices[request.service_type] || 0;

            let detailsHtml = `
                <strong>${serviceName}</strong><br>
                Reference: SRV-${request.request_id}<br>
                Status: ${request.status}<br>
                Date: ${request.preferred_date}<br>
                Time: ${request.preferred_time}<br>
                Location: ${request.location}<br>
                Contact: ${request.contact_number}<br>
                Service Fee: ₱${serviceFee.toLocaleString()}
            `;

            if (request.notes) {
                detailsHtml += `<br>Notes: ${request.notes}`;
            }

            if (request.technician_name) {
                detailsHtml += `<br><br><strong>Assigned Technician:</strong><br>Name: ${request.technician_name}<br>Phone: ${request.technician_phone || 'N/A'}`;
            }

            toastr.info(detailsHtml, 'Service Request Details', {
                timeOut: 0,
                extendedTimeOut: 0
            });
        })
        .catch(error => {
            console.error('Error fetching service details:', error);
            toastr.error('Error loading service details');
        });
}

/**
 * Delete Service Request
 */
function deleteServiceRequest(requestId) {
    if (!confirm('Are you sure you want to cancel this service request?')) {
        return;
    }

    fetch('/FrostByte/src/PHP/api/cancel_service_request.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ request_id: requestId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                toastr.success('Service request cancelled');
                loadServiceRequests();
            } else {
                toastr.error(data.message || 'Error cancelling request');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toastr.error('Error cancelling request');
        });
}
