// User Management Table Module
let usersData = [];
let filteredUsers = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeUserManagement();
});

function initializeUserManagement() {
    loadUsers();
    setupEventListeners();
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('input[placeholder="Search a name or email..."]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterUsers();
        });
    }

    // Role filter
    const roleSelect = document.getElementById('roles');
    if (roleSelect) {
        roleSelect.addEventListener('change', function() {
            filterUsers();
        });
    }

    // Status filter
    const statusSelect = document.getElementById('status');
    if (statusSelect) {
        statusSelect.addEventListener('change', function() {
            filterUsers();
        });
    }

    // Add user button
    const addUserBtn = document.getElementById('add_user');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            const addUserForm = document.getElementById('add-user');
            if (addUserForm) {
                addUserForm.style.display = addUserForm.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
}

function loadUsers() {
    fetch('/FrostByte/src/PHP/api/get_all_users.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                usersData = data.data;
                filteredUsers = [...usersData];
                
                // Update statistics
                updateStats(data.stats);
                
                // Display users
                displayUsers(filteredUsers);
            } else {
                console.error('Error loading users:', data.message);
                showErrorMessage('Failed to load users');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage('Error connecting to server');
        });
}

function filterUsers() {
    const searchInput = document.querySelector('input[placeholder="Search a name or email..."]');
    const roleSelect = document.getElementById('roles');
    const statusSelect = document.getElementById('status');

    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const role = roleSelect ? roleSelect.value : 'allRoles';
    const status = statusSelect ? statusSelect.value : 'allStatus';

    filteredUsers = usersData.filter(user => {
        const matchSearch = !search || 
            user.fullname.toLowerCase().includes(search) || 
            user.email.toLowerCase().includes(search);
        
        const matchRole = role === 'allRoles' || user.role === role;
        const matchStatus = status === 'allStatus' || user.status === status;

        return matchSearch && matchRole && matchStatus;
    });

    displayUsers(filteredUsers);
}

function displayUsers(users) {
    const tbody = document.querySelector('#users_table tbody');
    
    if (!tbody) {
        console.error('Users table body not found');
        return;
    }

    if (users.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 30px; color: #94a3b8;">
                    <p>No users found</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${escapeHtml(user.user_id)}</td>
            <td>${escapeHtml(user.fullname)}</td>
            <td>${escapeHtml(user.email)}</td>
            <td>${escapeHtml(user.gender || 'N/A')}</td>
            <td>${escapeHtml(user.city || 'N/A')}</td>
            <td>
                <span class="role-badge role-${user.role.toLowerCase()}">
                    ${formatRole(user.role)}
                </span>
            </td>
        </tr>
    `).join('');
}

function updateStats(stats) {
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const card3 = document.getElementById('card3');

    if (card1) {
        const heading = card1.querySelector('.heading p:last-child');
        if (heading) heading.textContent = stats.total_users;
    }

    if (card2) {
        const heading = card2.querySelector('.heading p:last-child');
        if (heading) heading.textContent = stats.active_users;
    }

    if (card3) {
        const heading = card3.querySelector('.heading p:last-child');
        if (heading) heading.textContent = stats.active_admins;
    }
}

function formatRole(role) {
    const roleMap = {
        'superadmin': 'Super Admin',
        'admin': 'Admin',
        'technician': 'Technician',
        'user': 'User'
    };
    return roleMap[role] || role;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showErrorMessage(message) {
    const tbody = document.querySelector('#users_table tbody');
    if (tbody) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 30px; color: #ef4444;">
                    <p>${escapeHtml(message)}</p>
                </td>
            </tr>
        `;
    }
}