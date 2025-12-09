// Signup Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('sign-up');
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
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
});

function handleSignup(e) {
    e.preventDefault();
    
    // Get form values
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm').value;
    const gender = document.getElementById('gender').value.trim();
    const city = document.getElementById('city').value.trim();
    const submitButton = e.target.querySelector('button[type="submit"]');
    
    // Clear previous error messages
    clearErrors();
    
    // Client-side validation
    if (!fullname) {
        showError('fullname', 'Full name is required');
        return;
    }
    
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
    
    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        return;
    }
    
    if (!confirm_password) {
        showError('confirm', 'Confirm password is required');
        return;
    }
    
    if (password !== confirm_password) {
        showError('confirm', 'Passwords do not match');
        return;
    }
    
    if (!gender) {
        showError('gender', 'Gender is required');
        return;
    }
    
    if (!city) {
        showError('city', 'City is required');
        return;
    }
    
    // Store original button state
    const originalHTML = submitButton.innerHTML;
    const originalDisabled = submitButton.disabled;
    
    // Disable button and add loading state
    submitButton.disabled = true;
    submitButton.style.opacity = '0.6';
    submitButton.style.pointerEvents = 'none';
    
    // Prepare data for API
    const signupData = {
        fullname: fullname,
        email: email,
        password: password,
        confirm_password: confirm_password,
        gender: gender,
        city: city
    };
    
    console.log('Submitting signup:', signupData);
    
    // Send to backend API
    fetch('/FrostByte/src/PHP/api/signup.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })
    .then(async response => {
        console.log('Response status:', response.status);
        let data;
        try {
            data = await response.json();
            console.log('Parsed JSON data:', data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            throw new Error('Failed to parse server response');
        }
        return { status: response.status, body: data };
    })
    .then(({status, body}) => {
        console.log('Signup response:', body);
        
        if (body.success) {
            // Show success notification safely
            if (typeof toastr !== 'undefined') {
                toastr.success('Account created successfully! Redirecting to login...', 'Welcome!');
            } else {
                alert('Account created successfully! Redirecting to login...');
            }
            
            // Redirect to login page after 2.5 seconds
            setTimeout(() => {
                window.location.href = '/FrostByte/src/PHP/index.php';
            }, 2500);
        } else {
            // Show error notification safely
            if (typeof toastr !== 'undefined') {
                toastr.error(body.message || 'Signup failed', 'Error');
            } else {
                alert('Signup failed: ' + (body.message || 'Unknown error'));
            }
            
            // Reset button to original state - don't modify innerHTML
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.style.pointerEvents = 'auto';
        }
    })
    .catch(error => {
        console.error('Signup error:', error);
        console.error('Error stack:', error.stack);
        
        // Show error notification safely
        if (typeof toastr !== 'undefined') {
            toastr.error('An error occurred during signup: ' + error.message, 'Error');
        } else {
            alert('An error occurred during signup: ' + error.message);
        }
        
        // Reset button to original state - don't modify innerHTML
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.style.pointerEvents = 'auto';
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
    // Only clear error messages in the signup form - target only the error paragraphs after inputs
    const signupForm = document.getElementById('sign-up');
    if (!signupForm) return;
    
    // Get all inputs in the form body
    const inputs = signupForm.querySelectorAll('#body input, #body select');
    
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
