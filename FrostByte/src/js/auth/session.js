// Session and Authentication Check
// This script should be included in all protected pages

// Global flag to prevent re-authentication during logout
window.isLoggingOut = false;
window.currentUser = null;
let sessionCheckInProgress = false;

function initializeAuthSession() {
    // Skip if logging out
    if (window.isLoggingOut) {
        console.log('Skipping session check - logout in progress');
        return;
    }
    
    // Skip if already checking
    if (sessionCheckInProgress) {
        console.log('Session check already in progress');
        return;
    }
    
    sessionCheckInProgress = true;
    
    // Check if user is logged in
    fetch('/FrostByte/src/PHP/api/check_session.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // Include cookies with request
    })
    .then(response => {
        sessionCheckInProgress = false;
        
        if (!response.ok) {
            console.log('Session check failed - response not ok:', response.status);
            throw new Error('Session check failed with status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (!data.success) {
            // User not logged in, redirect to login
            console.log('Session expired or not authenticated - redirecting to login');
            console.log('Response data:', data);
            
            // Set flag to prevent re-check during redirect
            window.isLoggingOut = true;
            
            // Give it a moment before redirect
            setTimeout(() => {
                window.location.href = '/FrostByte/src/PHP/index.php';
            }, 100);
        } else {
            // User is logged in, store info if needed
            console.log('User authenticated:', data.user);
            window.currentUser = data.user;
            
            // Update user name display if element exists
            const userNameDisplay = document.getElementById('userNameDisplay');
            if (userNameDisplay) {
                userNameDisplay.textContent = data.user.fullname || data.user.email;
            }
        }
    })
    .catch(error => {
        sessionCheckInProgress = false;
        console.error('Session check error:', error);
        
        // On error, redirect to login
        window.isLoggingOut = true;
        setTimeout(() => {
            window.location.href = '/FrostByte/src/PHP/index.php';
        }, 100);
    });
}

function showLogoutConfirmation() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'logoutConfirmModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    // Create modal content
    const content = document.createElement('div');
    content.style.cssText = `
        background-color: white;
        border-radius: 8px;
        padding: 30px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        max-width: 400px;
        width: 90%;
    `;
    
    // Title
    const title = document.createElement('h2');
    title.textContent = 'Confirm Logout';
    title.style.cssText = `
        margin: 0 0 15px 0;
        color: #333;
        font-size: 20px;
    `;
    
    // Message
    const message = document.createElement('p');
    message.textContent = 'Are you sure you want to logout?';
    message.style.cssText = `
        margin: 0 0 25px 0;
        color: #666;
        font-size: 16px;
    `;
    
    // Buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
        display: flex;
        gap: 10px;
        justify-content: center;
    `;
    
    // Yes button
    const yesBtn = document.createElement('button');
    yesBtn.textContent = 'Yes, Logout';
    yesBtn.style.cssText = `
        padding: 10px 25px;
        background-color: #ef4444;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: background-color 0.3s ease;
    `;
    yesBtn.onmouseover = () => yesBtn.style.backgroundColor = '#dc2626';
    yesBtn.onmouseout = () => yesBtn.style.backgroundColor = '#ef4444';
    yesBtn.onclick = () => {
        modal.remove();
        performLogout();
    };
    
    // Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        padding: 10px 25px;
        background-color: #e5e7eb;
        color: #333;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: background-color 0.3s ease;
    `;
    cancelBtn.onmouseover = () => cancelBtn.style.backgroundColor = '#d1d5db';
    cancelBtn.onmouseout = () => cancelBtn.style.backgroundColor = '#e5e7eb';
    cancelBtn.onclick = () => {
        modal.remove();
    };
    
    // Assemble modal
    buttonsContainer.appendChild(yesBtn);
    buttonsContainer.appendChild(cancelBtn);
    content.appendChild(title);
    content.appendChild(message);
    content.appendChild(buttonsContainer);
    modal.appendChild(content);
    document.body.appendChild(modal);
}

function performLogout() {
    // Set flag to prevent session check during logout
    window.isLoggingOut = true;
    window.currentUser = null;
    
    console.log('Starting logout process...');
    
    // Immediately disable any page interactions
    document.body.style.pointerEvents = 'none';
    document.body.style.opacity = '0.5';
    
    // Call logout API
    fetch('/FrostByte/src/PHP/api/logout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies with request
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Logout API response:', data);
        
        // Clear all client-side storage
        sessionStorage.clear();
        localStorage.clear();
        
        // Clear cookies by setting expiration to past
        document.cookie.split(";").forEach(function(c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        
        // Wait a bit then redirect
        setTimeout(() => {
            console.log('Redirecting to login...');
            window.location.href = '/FrostByte/src/PHP/index.php';
        }, 1000);
    })
    .catch(error => {
        console.error('Logout error:', error);
        
        // Clear storage anyway even if API fails
        sessionStorage.clear();
        localStorage.clear();
        window.currentUser = null;
        
        setTimeout(() => {
            console.log('Redirecting to login after error...');
            window.location.href = '/FrostByte/src/PHP/index.php';
        }, 1000);
    });
}

function logout() {
    // Show confirmation modal instead of directly logging out
    showLogoutConfirmation();
}

// Initialize session check on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only check session if not logging out
    if (!window.isLoggingOut) {
        console.log('DOM loaded - initializing auth session');
        initializeAuthSession();
    }
});

// Also check on page visibility change (when user returns to tab)
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible' && !window.isLoggingOut) {
        console.log('Page became visible - checking session');
        // Add small delay to allow other operations
        setTimeout(() => {
            initializeAuthSession();
        }, 500);
    }
});
