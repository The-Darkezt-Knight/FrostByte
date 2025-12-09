// ========================================
// Technician Schedule Management JavaScript
// ========================================

let scheduleData = [];
let currentSchedule = null;
let techniciansData = []; // Store fetched technicians

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchTechniciansFromDatabase();
    fetchTechniciansFromDatabase();
    fetchSchedulesFromDatabase();
    attachEventListeners();
});

// Fetch available technicians from database
function fetchTechniciansFromDatabase() {
    fetch('/FrostByte/src/PHP/api/get_technicians.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.data) {
                techniciansData = data.data;
                populateTechnicianDropdown();
            }
        })
        .catch(error => {
            console.error('Error fetching technicians:', error);
        });
}

// Populate technician dropdown with database data
function populateTechnicianDropdown() {
    const techSelect = document.getElementById('modal-technician-select');
    
    if (!techSelect) return;
    
    // Keep the default option
    techSelect.innerHTML = '<option value="">Choose a technician...</option>';
    
    // Add technicians from database
    techniciansData.forEach(tech => {
        const option = document.createElement('option');
        option.value = tech.user_id; // Use user_id as the value
        option.textContent = `${tech.fullname} - ${tech.city}`;
        techSelect.appendChild(option);
    });
}

// Fetch schedules from database API
function fetchSchedulesFromDatabase() {
    const tableBody = document.getElementById('schedule-body');
    
    if (!tableBody) {
        console.error('schedule-body element not found');
        return;
    }
    
    // Show loading state
    tableBody.innerHTML = `
        <tr>
            <td colspan="9" style="text-align: center; padding: 40px;">
                <div style="color: #0390dc; font-weight: 600;">Loading schedules...</div>
            </td>
        </tr>
    `;
    
    // Fetch from API
    fetch('/FrostByte/src/PHP/api/get_technician_schedules.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.data) {
                scheduleData = data.data;
                loadSchedules();
            } else {
                showEmptyState('No service requests found');
            }
        })
        .catch(error => {
            console.error('Error fetching schedules:', error);
            showEmptyState('Error loading schedules. Please try again.');
            showAlert('Failed to load schedules from database', 'error');
        });
}

// Show empty state message
function showEmptyState(message) {
    const tableBody = document.getElementById('schedule-body');
    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="empty-state">
                    <div class="empty-state-icon">📅</div>
                    <div class="empty-state-title">${message}</div>
                    <div class="empty-state-text">Service requests will appear here</div>
                </td>
            </tr>
        `;
    }
    updateStats();
}

// Load and render schedules
function loadSchedules() {
    const tableBody = document.getElementById('schedule-body');
    
    if (!tableBody) {
        console.error('schedule-body element not found');
        return;
    }
    
    tableBody.innerHTML = '';
    
    if (scheduleData.length === 0) {
        showEmptyState('No Schedules');
        return;
    }
    
    scheduleData.forEach(schedule => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${schedule.id}</td>
            <td>${schedule.customer}</td>
            <td>${schedule.service}</td>
            <td>${schedule.date}</td>
            <td>${schedule.time || '-'}</td>
            <td>${schedule.technician || 'Unassigned'}</td>
            <td>${schedule.address}</td>
            <td>
                <span class="status-badge status-${schedule.status}">
                    ${formatStatus(schedule.status)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-view" onclick="viewScheduleDetails('${schedule.id}')">View</button>
                    <button class="btn-action btn-edit" onclick="editSchedule('${schedule.id}')">Edit</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    updateStats();
}

// Format status for display
function formatStatus(status) {
    const statusMap = {
        'pending': 'Pending',
        'scheduled': 'Scheduled',
        'in_progress': 'In Progress',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
}

// View schedule details
function viewScheduleDetails(id) {
    const schedule = scheduleData.find(s => s.id === id);
    if (!schedule) return;
    
    currentSchedule = schedule;
    
    // Populate modal with schedule data
    document.getElementById('modal-customer-name').textContent = schedule.customer;
    document.getElementById('modal-customer-email').textContent = schedule.email;
    document.getElementById('modal-customer-address').textContent = schedule.address;
    document.getElementById('modal-service-type').textContent = schedule.service;
    document.getElementById('modal-service-desc').textContent = schedule.description;
    document.getElementById('modal-service-priority').textContent = schedule.priority;
    document.getElementById('modal-schedule-date').textContent = schedule.date;
    document.getElementById('modal-schedule-time').textContent = schedule.time;
    document.getElementById('modal-technician').textContent = schedule.technician || 'Unassigned';
    document.getElementById('modal-status').textContent = formatStatus(schedule.status);
    
    // Set current technician selection - if assigned, find and select the matching user_id
    const techSelect = document.getElementById('modal-technician-select');
    if (schedule.technician && schedule.technician !== 'Unassigned') {
        // Find the technician with matching name
        const matchingTech = techniciansData.find(t => t.fullname === schedule.technician);
        if (matchingTech) {
            techSelect.value = matchingTech.user_id;
        } else {
            techSelect.value = '';
        }
    } else {
        techSelect.value = '';
    }
    
    // Clear notes
    document.getElementById('modal-admin-notes').value = '';
    
    // Show modal
    openScheduleModal();
}

// Edit schedule
function editSchedule(id) {
    viewScheduleDetails(id);
}

// Assign technician
function assignTechnician() {
    if (!currentSchedule) return;
    
    const techSelect = document.getElementById('modal-technician-select');
    const notes = document.getElementById('modal-admin-notes').value;
    
    if (!techSelect.value) {
        showAlert('Please select a technician', 'error');
        return;
    }
    
    // Use the user_id directly (which is the option value)
    const selectedTechId = techSelect.value;
    
    // Send update to API
    fetch('/FrostByte/src/PHP/api/assign_technician_to_service.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            request_id: currentSchedule.id,
            technician_id: selectedTechId,
            notes: notes
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('Technician assigned successfully!', 'success');
            
            // Update local data - get technician name from the selected option
            currentSchedule.technician = techSelect.options[techSelect.selectedIndex].text.split(' - ')[0];
            currentSchedule.status = 'scheduled';
            
            // Reload table
            fetchSchedulesFromDatabase();
            
            // Close modal after delay
            setTimeout(() => {
                closeScheduleModal();
            }, 1500);
        } else {
            showAlert(data.message || 'Failed to assign technician', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Error assigning technician. Please try again.', 'error');
    });
}

// Mark schedule status
function markScheduleStatus(newStatus) {
    if (!currentSchedule) return;
    
    if (newStatus === 'cancelled') {
        if (!confirm('Are you sure you want to cancel this schedule?')) {
            return;
        }
    }
    
    currentSchedule.status = newStatus;
    showAlert(`Schedule marked as ${formatStatus(newStatus)}`, 'success');
    
    loadSchedules();
    
    setTimeout(() => {
        closeScheduleModal();
    }, 1500);
}

// Update statistics
function updateStats() {
    const today = new Date().toISOString().split('T')[0];
    
    const stats = {
        today: scheduleData.filter(s => s.date === today && s.status !== 'completed').length,
        progress: scheduleData.filter(s => s.status === 'in_progress').length,
        completed: scheduleData.filter(s => s.status === 'completed').length,
        pending: scheduleData.filter(s => s.status === 'pending').length
    };
    
    document.getElementById('stat-today').textContent = stats.today;
    document.getElementById('stat-progress').textContent = stats.progress;
    document.getElementById('stat-completed').textContent = stats.completed;
    document.getElementById('stat-pending').textContent = stats.pending;
}

// Apply filters
function applyFilters() {
    const statusFilter = document.getElementById('filter-status')?.value || 'all';
    const technicianFilter = document.getElementById('filter-technician')?.value || 'all';
    const dateFilter = document.getElementById('filter-date')?.value || 'all';
    
    let filtered = [...scheduleData];
    
    // Filter by status
    if (statusFilter !== 'all') {
        filtered = filtered.filter(s => s.status === statusFilter);
    }
    
    // Filter by technician
    if (technicianFilter !== 'all') {
        const techMap = {
            'tech1': 'John Smith',
            'tech2': 'Sarah Johnson',
            'tech3': 'Mike Davis'
        };
        const techName = techMap[technicianFilter];
        filtered = filtered.filter(s => s.technician === techName);
    }
    
    // Filter by date
    if (dateFilter !== 'all') {
        const today = new Date();
        const filterDate = new Date(today);
        
        if (dateFilter === 'today') {
            const dateStr = today.toISOString().split('T')[0];
            filtered = filtered.filter(s => s.date === dateStr);
        } else if (dateFilter === 'week') {
            const weekAhead = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            filtered = filtered.filter(s => {
                const sDate = new Date(s.date);
                return sDate >= today && sDate <= weekAhead;
            });
        } else if (dateFilter === 'month') {
            const monthAhead = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
            filtered = filtered.filter(s => {
                const sDate = new Date(s.date);
                return sDate >= today && sDate <= monthAhead;
            });
        }
    }
    
    // Render filtered results
    const tableBody = document.getElementById('schedule-body');
    tableBody.innerHTML = '';
    
    if (filtered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="empty-state">
                    <div class="empty-state-title">No results found</div>
                    <div class="empty-state-text">Try adjusting your filters</div>
                </td>
            </tr>
        `;
        return;
    }
    
    filtered.forEach(schedule => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${schedule.id}</td>
            <td>${schedule.customer}</td>
            <td>${schedule.service}</td>
            <td>${schedule.date}</td>
            <td>${schedule.time || '-'}</td>
            <td>${schedule.technician || 'Unassigned'}</td>
            <td>${schedule.address}</td>
            <td>
                <span class="status-badge status-${schedule.status}">
                    ${formatStatus(schedule.status)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-view" onclick="viewScheduleDetails('${schedule.id}')">View</button>
                    <button class="btn-action btn-edit" onclick="editSchedule('${schedule.id}')">Edit</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Modal functions
function openScheduleModal() {
    const modal = document.getElementById('schedule-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeScheduleModal() {
    const modal = document.getElementById('schedule-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    currentSchedule = null;
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insert at top of container
    const container = document.querySelector('.technician-schedule-container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 4000);
    }
}

// Attach event listeners
function attachEventListeners() {
    // Filter listeners
    const statusFilter = document.getElementById('filter-status');
    const technicianFilter = document.getElementById('filter-technician');
    const dateFilter = document.getElementById('filter-date');
    
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (technicianFilter) technicianFilter.addEventListener('change', applyFilters);
    if (dateFilter) dateFilter.addEventListener('change', applyFilters);
    
    // Add schedule button
    const addBtn = document.getElementById('add-schedule-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            showAlert('Schedule creation feature coming soon!', 'info');
        });
    }
    
    // Modal close handlers
    const modal = document.getElementById('schedule-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeScheduleModal();
            }
        });
    }
    
    // Keyboard shortcut (ESC to close modal)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeScheduleModal();
        }
    });
}
