<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <link rel="stylesheet" href="/FrostByte/src/css/index.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <title>Login - FrostByte</title>
</head>
<body>
    <main>
        <div id="left">
            <div id="header">
                <p>Welcome to FrostByte</p>
            </div>
            <div id="body">
                <p>
                    Discover a new way to shop. Connect with  <br>
                    great deals, fresh finds, and a community <br>
                    that loves smarter shopping.
                </p>
            </div>
            <div id="list">
                <div class="container">
                    <span class="image-holder">
                    <i class="fa-solid fa-lock" style="color: #2563eb;"></i>
                    </span>
                    <span class="text-holder">
                        <p class="heading">Secure and Private</p>
                        <p class="subheading">Your data is protected with industry-leading security</p>
                    </span>
                </div>

                <div class="container">
                    <span class="image-holder">
                        <i class="fa-solid fa-basket-shopping" style="color: #2563eb;"></i>
                    </span>
                    <span class="text-holder">
                        <p class="heading">Convenient and fast</p>
                        <p class="subheading">Shop all the way at home and be delivered with style</p>
                    </span>
                </div>

                <div class="container">
                    <span class="image-holder">
                    <i class="fa-solid fa-network-wired" style="color: #2563eb;"></i>
                    </span>
                    <span class="text-holder">
                        <p class="heading">Connect with millions of users across the country</p>
                        <p class="subheading">Get to know others and follow the trends</p>
                    </span>
                </div>

            </div>
        </div>
        <div id="right">
            <form method="POST" action="#" id="sign-in">
            <div id="header">
                <p>Sign in</p>
                <p>Get access to more products and services</p>
            </div>
            <div id="body">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" placeholder="Enter email">
                    <p></p>

                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter password">
                    <p></p>
            </div>
                <div id="options">
                    <span>
                        <input type="checkbox">
                        <p>Remember me</p>
                    </span>
                    <span>
                        <a href="#">Forgot password?</a>
                    </span>
                </div>
                <div id="submit-area">
                    <button type="submit">Sign in</button>
                </div>
                <p id="sign-up-btn">Don't have an account? <a href="/FrostByte/src/PHP/sign_up.php">sign up</a></p>
        </form>
        </div>
    </main>
    <footer>
            <span>
                <img src="/FrostByte/resources/images/FrostByte-logo-svg.svg" alt="This is the company's logo">
                <p>FrostByte</p>
            </span>
            <div id="linkages">
                    <i class="fa-brands fa-youtube"></i>
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-github"></i>
                    <i class="fa-brands fa-x-twitter"></i>
            </div>
            <p>Innovative tools. Trusted service. Real results. <br>
               While using W3Schools, you agree to have read and <br>
               accepted our terms of use, cookie and privacy policy.
            </p>
            
            <span>Copyright 2025 by PidoGwapo. All Rights Reserved. FrostByte is Powered by TechHub</span>
        </div>
    </footer>
    <script>
        // Configure toastr immediately after jQuery and toastr are loaded
        if (typeof toastr !== 'undefined') {
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
            console.log('Toastr configured');
        }
        
        // Only clear user role on logout, not the entire sessionStorage
        console.log('Login page loaded');
        
        // Check if this is a logout redirect
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('logout') === '1') {
            console.log('Logout successful - clearing user data');
            // Clear the login check flag so we can check session again
            sessionStorage.removeItem('login_page_checked');
        }
    </script>
    <script src="/FrostByte/src/js/auth/login.js"></script>
</body>
</html>
