// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('sign-in');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Configure toastr options
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": 300,
        "hideDuration": 1000,
        "timeOut": 5000,
        "extendedTimeOut": 1000,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    
    // Check if already logged in and redirect if so
    // But don't check repeatedly - only check once
    if (!sessionStorage.getItem('login_page_checked')) {
        sessionStorage.setItem('login_page_checked', 'true');
        checkSession();
    }
});

function handleLogin(e) {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const submitButton = e.target.querySelector('button[type="submit"]');
    
    // Clear previous error messages
    clearErrors();
    
    // Client-side validation
    if (!email) {
        showError('email', 'Email is required');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('email', 'Invalid email format');
        return;
    }
    
    if (!password) {
        showError('password', 'Password is required');
        return;
    }
    
    // Store original button state
    const originalHTML = submitButton.innerHTML;
    const originalDisabled = submitButton.disabled;
    
    // Show loading state - disable without modifying innerHTML
    submitButton.disabled = true;
    submitButton.style.opacity = '0.6';
    submitButton.style.pointerEvents = 'none';
    
    // Prepare data for API
    const loginData = {
        email: email,
        password: password
    };
    
    console.log('Submitting login:', loginData);
    
    // Send to backend API
    fetch('/FrostByte/src/PHP/api/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies with the request
        body: JSON.stringify(loginData)
    })
    .then(async response => {
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        let data;
        try {
            data = await response.json();
            console.log('Parsed JSON data:', data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            console.log('Response status:', response.status);
            throw new Error('Failed to parse server response');
        }
        
        return { status: response.status, body: data };
    })
    .then(({status, body}) => {
        console.log('Login response body:', body);
        console.log('Success:', body.success);
        
        if (body.success) {
            console.log('Login successful, user role:', body.user.role);
            
            // Show success notification safely
            if (typeof toastr !== 'undefined') {
                toastr.success('Login successful!', 'Welcome!');
            }
            
            // Store user info temporarily for redirect
            sessionStorage.setItem('user_role', body.user.role);
            
            // Redirect based on role after 1.5 seconds
            setTimeout(() => {
                console.log('Redirecting to dashboard for role:', body.user.role);
                redirectByRole(body.user.role);
            }, 1500);
        } else {
            console.log('Login failed:', body.message);
            
            // Show error notification safely
            if (typeof toastr !== 'undefined') {
                toastr.error(body.message || 'Login failed', 'Error');
            } else {
                alert('Login failed: ' + (body.message || 'Unknown error'));
            }
            
            // Reset button - don't modify innerHTML
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.style.pointerEvents = 'auto';
        }
    })
    .catch(error => {
        console.error('Login error caught:', error);
        console.error('Error stack:', error.stack);
        
        // Show error notification safely
        if (typeof toastr !== 'undefined') {
            toastr.error('An error occurred during login: ' + error.message, 'Error');
        } else {
            alert('An error occurred during login: ' + error.message);
        }
        
        // Reset button - don't modify innerHTML
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.style.pointerEvents = 'auto';
    });
}

function resetLoginButton(button, originalHTML) {
    button.disabled = false;
    button.classList.remove('btn-loading');
    button.innerHTML = originalHTML;
    button.style.opacity = '1';
    button.style.cursor = 'pointer';
}

function redirectByRole(role) {
    console.log('Redirecting user with role:', role);
    
    switch(role) {
        case 'superadmin':
            window.location.href = '/FrostByte/src/PHP/super_admin.php';
            break;
        case 'admin':
        case 'technician':
            window.location.href = '/FrostByte/src/PHP/admin.php';
            break;
        case 'user':
            window.location.href = '/FrostByte/src/PHP/customer.php';
            break;
        default:
            if (typeof toastr !== 'undefined') {
                toastr.error('Unknown user role', 'Error');
            } else {
                alert('Unknown user role');
            }
    }
}

function checkSession() {
    // Check if user is already logged in
    console.log('Checking session...');
    fetch('/FrostByte/src/PHP/api/check_session.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(async response => {
        console.log('Session check response status:', response.status);
        let data;
        try {
            data = await response.json();
            console.log('Session check data:', data);
        } catch (e) {
            console.error('Error parsing session check response:', e);
            return { success: false };
        }
        return data;
    })
    .then(data => {
        if (data.success) {
            console.log('User already logged in, role:', data.user.role);
            // Redirect to appropriate dashboard
            redirectByRole(data.user.role);
        } else {
            console.log('User not logged in');
        }
    })
    .catch(error => {
        // Not logged in, continue with login page
        console.log('Session check error:', error);
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        // Find the error paragraph that's right after the input
        let errorElement = field.nextElementSibling;
        while (errorElement && errorElement.tagName !== 'P') {
            errorElement = errorElement.nextElementSibling;
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.color = '#ef4444';
            errorElement.style.fontSize = '12px';
            field.style.borderColor = '#ef4444';
        }
    }
}

function clearErrors() {
    // Only clear error messages in the login form - target only the error paragraphs after inputs
    const loginForm = document.getElementById('sign-in');
    if (!loginForm) return;
    
    // Get all inputs in the form body
    const inputs = loginForm.querySelectorAll('#body input');
    
    inputs.forEach(input => {
        // Find the next sibling that is a <p> tag (error message)
        let errorElement = input.nextElementSibling;
        while (errorElement && errorElement.tagName !== 'P') {
            errorElement = errorElement.nextElementSibling;
        }
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.color = '';
        }
        
        // Clear border color
        input.style.borderColor = '';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
