/**
 * Services Booking Management
 * Handles the 4-step booking flow for services
 */

// Booking State
let bookingState = {
    serviceType: null,
    serviceTypePrice: 0,
    serviceDate: null,
    timeSlot: null,
    address: null,
    phone: null,
    notes: null,
    currentStep: 1
};

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
    initializeServicesPanel();
    setupBookingModalHandlers();
    setMinDate();
});

/**
 * Initialize Services Panel
 */
function initializeServicesPanel() {
    const bookServiceBtn = document.getElementById('bookServiceBtn');
    if (bookServiceBtn) {
        bookServiceBtn.addEventListener('click', openBookingModal);
    }

    // Load existing service requests
    loadServiceRequests();
}

/**
 * Open Booking Modal
 */
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        resetBookingState();
        showStep(1);
        updateModalButtons();
    }
}

/**
 * Close Booking Modal
 */
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        resetBookingState();
    }
}

/**
 * Back to Services List (Legacy - now closes modal)
 */
function backToServicesList() {
    closeBookingModal();
}

/**
 * Reset Booking State
 */
function resetBookingState() {
    bookingState = {
        serviceType: null,
        serviceTypePrice: 0,
        serviceDate: null,
        timeSlot: null,
        address: null,
        phone: null,
        notes: null,
        currentStep: 1
    };

    // Reset all form inputs
    document.querySelectorAll('.service-type-card.selected').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelectorAll('.time-slot.selected').forEach(slot => {
        slot.classList.remove('selected');
    });

    document.getElementById('serviceDate').value = '';
    document.getElementById('serviceAddress').value = '';
    document.getElementById('contactNumber').value = '';
    document.getElementById('additionalNotes').value = '';
    document.getElementById('agreeTerms').checked = false;

    // Reset buttons
    updateStepButtons();
}

/**
 * Set Minimum Date (Today)
 */
function setMinDate() {
    const dateInput = document.getElementById('serviceDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

/**
 * Setup Booking Modal Handlers
 */
function setupBookingModalHandlers() {
    // Step 1: Service Type Selection
    document.querySelectorAll('.service-type-card').forEach(card => {
        card.addEventListener('click', function () {
            selectServiceType(this);
            // Do NOT auto-proceed - wait for Continue button
        });
    });

    // Step 2: Date Selection
    const dateInput = document.getElementById('serviceDate');
    if (dateInput) {
        dateInput.addEventListener('change', function () {
            bookingState.serviceDate = this.value;
            updateStepButtons();
        });
    }

    // Step 2: Time Slot Selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', function () {
            selectTimeSlot(this);
            // Do NOT auto-proceed - wait for Continue button
        });
    });

    // Step 3: Form Validation - Update state when fields change
    const addressInput = document.getElementById('serviceAddress');
    const phoneInput = document.getElementById('contactNumber');
    
    if (addressInput) {
        addressInput.addEventListener('input', function () {
            bookingState.address = this.value.trim();
            // Do NOT auto-proceed - wait for Continue button
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            bookingState.phone = this.value.trim();
            // Do NOT auto-proceed - wait for Continue button
        });
    }

    const notesInput = document.getElementById('additionalNotes');
    if (notesInput) {
        notesInput.addEventListener('input', function () {
            bookingState.notes = this.value.trim();
        });
    }

    // Step 4: Terms Agreement
    const agreeTerms = document.getElementById('agreeTerms');
    if (agreeTerms) {
        agreeTerms.addEventListener('change', function() {
            // Terms agreement listener - no action needed, button is always clickable
        });
    }

    // Close modal when clicking outside
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeBookingModal();
            }
        });
    }
}

/**
 * Handle Next Step (with validation)
 */
function handleNextStep() {
    const currentStep = bookingState.currentStep;
    
    if (currentStep === 1) {
        if (bookingState.serviceType) {
            goToStep(2);
        } else {
            toastr.warning('Please select a service type', 'Selection Required');
        }
    } else if (currentStep === 2) {
        if (bookingState.serviceDate && bookingState.timeSlot) {
            goToStep(3);
        } else {
            toastr.warning('Please select both date and time', 'Selection Required');
        }
    } else if (currentStep === 3) {
        if (bookingState.address && bookingState.phone) {
            goToStep(4);
        } else {
            toastr.warning('Please fill in address and phone number', 'Information Required');
        }
    }
}

/**
 * Update Modal Buttons Based on Current Step
 */
function updateModalButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const currentStep = bookingState.currentStep;

    // Show/hide back button
    if (prevBtn) {
        prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
        prevBtn.onclick = function() { goToStep(currentStep - 1); };
    }

    // Show/hide next and confirm buttons
    if (currentStep === 4) {
        if (nextBtn) nextBtn.style.display = 'none';
        if (confirmBtn) confirmBtn.style.display = 'block';
    } else {
        if (nextBtn) nextBtn.style.display = 'block';
        if (confirmBtn) confirmBtn.style.display = 'none';
    }
}

/**
 * Select Service Type (Step 1)
 */
function selectServiceType(card) {
    // Remove previous selection
    document.querySelectorAll('.service-type-card.selected').forEach(c => {
        c.classList.remove('selected');
    });

    // Add selection to clicked card
    card.classList.add('selected');

    // Update booking state
    const serviceType = card.getAttribute('data-service');
    bookingState.serviceType = serviceType;
    bookingState.serviceTypePrice = servicePrices[serviceType];

    updateStepButtons();
}

/**
 * DISABLED: Auto-progression removed to require manual "Continue" button click
 * Previously auto-proceeded when both address and phone were filled
 * This was causing UX issues where users were auto-forwarded while still typing
 */
function checkStep3Complete() {
    // Function kept for reference but no longer called
    // Auto-progression is now disabled - users must click Continue button
}

/**
 * Go to Specific Step
 */
function goToStep(stepNumber) {
    // Allow forward progression and backward navigation
    // stepNumber can be: previous steps (for back button) or current+1 (for auto-advance)
    if (stepNumber < 1 || stepNumber > 4) {
        return; // Invalid step
    }

    showStep(stepNumber);
}

/**
 * Show Step
 */
function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.booking-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show selected step
    const step = document.getElementById(`step${stepNumber}`);
    if (step) {
        step.classList.add('active');
    }

    // Update progress indicator circles
    document.querySelectorAll('.progress-circle').forEach((circle, index) => {
        const stepNum = index + 1;
        circle.classList.remove('active', 'completed');

        if (stepNum === stepNumber) {
            circle.classList.add('active');
        } else if (stepNum < stepNumber) {
            circle.classList.add('completed');
        }
    });

    // Update progress item active class
    document.querySelectorAll('.progress-item').forEach((item, index) => {
        const stepNum = index + 1;
        if (stepNum === stepNumber) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    bookingState.currentStep = stepNumber;

    // Scroll to top of modal content
    const modalContent = document.querySelector('.booking-modal-content');
    if (modalContent) {
        modalContent.scrollTop = 0;
    }

    // Update confirmation if on step 4
    if (stepNumber === 4) {
        updateConfirmationDisplay();
    }

    // Update modal buttons
    updateModalButtons();
}

/**
 * Validate Current Step
 */
function validateCurrentStep() {
    switch (bookingState.currentStep) {
        case 1:
            return bookingState.serviceType !== null;

        case 2:
            return bookingState.serviceDate && bookingState.timeSlot;

        case 3:
            return bookingState.address && bookingState.phone;

        case 4:
            return document.getElementById('agreeTerms').checked;

        default:
            return true;
    }
}

/**
 * Update Step Buttons (Placeholder - no longer needed for auto-flow)
 */
function updateStepButtons() {
    // Button updates removed - using automatic flow instead
}

/**
 * Select Time Slot (Step 2)
 */
function selectTimeSlot(slot) {
    // Remove previous selection
    document.querySelectorAll('.time-slot.selected').forEach(s => {
        s.classList.remove('selected');
    });

    // Add selection to clicked slot
    slot.classList.add('selected');

    // Update booking state
    bookingState.timeSlot = slot.getAttribute('data-time');

    updateStepButtons();
}

/**
 * Update Confirmation Display (Step 4)
 */
function updateConfirmationDisplay() {
    // Service Type
    const confirmServiceType = document.getElementById('confirmServiceType');
    if (confirmServiceType) {
        confirmServiceType.textContent = serviceNames[bookingState.serviceType] || '-';
    }

    // Date & Time
    const confirmDateTime = document.getElementById('confirmDateTime');
    if (confirmDateTime) {
        const dateObj = new Date(bookingState.serviceDate);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        confirmDateTime.textContent = `${formattedDate}, ${bookingState.timeSlot}`;
    }

    // Service Fee
    const confirmFee = document.getElementById('confirmFee');
    if (confirmFee) {
        confirmFee.textContent = `₱${bookingState.serviceTypePrice.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
    }

    // Location
    const confirmLocation = document.getElementById('confirmLocation');
    if (confirmLocation) {
        confirmLocation.innerHTML = `<strong>${bookingState.address}</strong><br><small style="color: #6b7280;">${bookingState.phone}</small>`;
    }
}

/**
 * Confirm Booking
 */
function confirmBooking() {
    // Check if terms are agreed
    const termsCheckbox = document.getElementById('agreeTerms');
    if (!termsCheckbox.checked) {
        toastr.warning('Please agree to the terms and conditions', 'Terms Required');
        return;
    }

    // Prepare booking data
    const bookingData = {
        serviceType: bookingState.serviceType,
        serviceName: serviceNames[bookingState.serviceType],
        serviceDate: bookingState.serviceDate,
        timeSlot: bookingState.timeSlot,
        address: bookingState.address,
        phone: bookingState.phone,
        notes: bookingState.notes,
        amount: bookingState.serviceTypePrice
    };

    // Save to database
    saveServiceBooking(bookingData);
}

/**
 * Save Service Booking to Database
 */
function saveServiceBooking(bookingData) {
    // Prepare data for API
    const apiData = {
        service_type: bookingData.serviceType,
        description: bookingData.notes || '',
        location: bookingData.address,
        preferred_date: bookingData.serviceDate,
        preferred_time: bookingData.timeSlot,
        priority: 'Medium'
    };

    // Send to backend API
    fetch('/FrostByte/src/PHP/api/create_service_request.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            throw new Error('Server returned invalid response format');
        }
    })
    .then(data => {
        if (data.success) {
            // Show success message
            toastr.success('Service booking confirmed! We will contact you soon.', 'Booking Confirmed');

            // Reload service requests to show the new booking
            loadServiceRequests();
            
            // Close the modal
            closeBookingModal();
        } else {
            toastr.error(data.message || 'Failed to save booking. Please try again.', 'Error');
        }
    })
    .catch(error => {
        console.error('Error saving service booking:', error);
        toastr.error('An error occurred. Please try again later. Check console for details.', 'Error');
    });
}

/**
 * Load Service Requests from Database
 */
function loadServiceRequests() {
    const requestsList = document.getElementById('serviceRequestsList');

    if (!requestsList) return;

    // Fetch service requests from API
    fetch('/FrostByte/src/PHP/api/get_service_requests.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error('Server returned invalid response format');
            }
        })
        .then(data => {
            // Handle both direct array and wrapped response formats
            let requests = Array.isArray(data) ? data : (data.data || []);
            
            if (!requests || requests.length === 0) {
                requestsList.innerHTML = '<p class="empty-state">No service requests yet. Book a service to get started!</p>';
                return;
            }

            requestsList.innerHTML = '';

            // Sort by date (newest first)
            requests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            requests.forEach(request => {
                const card = createServiceRequestCard(request);
                requestsList.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading service requests:', error);
            requestsList.innerHTML = '<p class="empty-state">Error loading service requests</p>';
        });
}

/**
 * Create Service Request Card
 */
function createServiceRequestCard(request) {
    const card = document.createElement('div');
    card.className = 'service-request-card';

    const createdDate = new Date(request.created_at);
    const formattedDate = createdDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // Map service types to readable names
    const serviceNames = {
        'pc-assembly': 'PC Assembly',
        'office-setup': 'Office Setup',
        'school-lab': 'School Lab Setup',
        'diagnostics': 'Diagnostics / Repair'
    };

    const serviceName = serviceNames[request.service_type] || request.service_type;

    // Map status to readable format
    const statusClass = request.status.toLowerCase().replace(/\s+/g, '-');

    card.innerHTML = `
        <div class="request-info">
            <h4>${serviceName}</h4>
            <p><strong>Reference:</strong> SRV-${request.request_id}</p>
            <p><strong>Scheduled:</strong> ${request.preferred_date} @ ${request.preferred_time}</p>
            <p><strong>Location:</strong> ${request.location}</p>
            <p><strong>Requested on:</strong> ${formattedDate}</p>
        </div>
        <div style="display: flex; align-items: center; gap: 15px;">
            <span class="request-status ${statusClass}">${request.status}</span>
            <div class="request-actions">
                <button onclick="viewServiceDetails(${request.request_id})">View</button>
                <button class="delete-btn" onclick="deleteServiceRequest(${request.request_id})">Cancel</button>
            </div>
        </div>
    `;

    return card;
}

/**
 * Delete Service Request
 */
function deleteServiceRequest(requestId) {
    if (!confirm('Are you sure you want to cancel this service request?')) {
        return;
    }

    // Send delete request to backend
    fetch('/FrostByte/src/PHP/api/cancel_service_request.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            request_id: requestId,
            status: 'cancelled'
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            toastr.info('Service request cancelled', 'Cancelled');
            loadServiceRequests();
        } else {
            toastr.error(data.message || 'Failed to cancel request', 'Error');
        }
    })
    .catch(error => {
        console.error('Error cancelling service request:', error);
        toastr.error('An error occurred. Please try again later.', 'Error');
    });
}

/**
 * View Service Details
 */
function viewServiceDetails(requestId) {
    // Fetch service request details from API
    fetch(`/FrostByte/src/PHP/api/get_service_requests.php?request_id=${requestId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                alert('Service request not found');
                return;
            }

            const request = data[0];

            // Map service types to readable names
            const serviceNames = {
                'pc-assembly': 'PC Assembly',
                'office-setup': 'Office Setup',
                'school-lab': 'School Lab Setup',
                'diagnostics': 'Diagnostics / Repair'
            };

            const serviceName = serviceNames[request.service_type] || request.service_type;

            const details = `
Service Details
═══════════════════════════
Service: ${serviceName}
Reference: SRV-${request.request_id}
Status: ${request.status}

Scheduled Date: ${request.preferred_date}
Time: ${request.preferred_time}

Location: ${request.location}
Assigned Technician: ${request.technician || 'Not yet assigned'}

Description:
${request.description || 'None'}
            `;

            alert(details);
        })
        .catch(error => {
            console.error('Error fetching service details:', error);
            alert('Error loading service details');
        });
}
