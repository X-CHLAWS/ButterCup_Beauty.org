// Authentication Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active form
            forms.forEach(form => form.classList.remove('active'));
            document.getElementById(tabName + 'Form').classList.add('active');
        });
    });
    
    // Forgot password toggle
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const backToLogin = document.querySelector('.back-to-login');
    
    if (forgotPasswordLink && backToLogin) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('loginForm').classList.remove('active');
            document.getElementById('forgotForm').classList.add('active');
        });
        
        backToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('forgotForm').classList.remove('active');
            document.getElementById('loginForm').classList.add('active');
        });
    }
    
    // Form submissions
    const loginForm = document.getElementById('loginAccountForm');
    const registerForm = document.getElementById('registerAccountForm');
    const forgotForm = document.getElementById('forgotPasswordForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }
    
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleForgotPassword();
        });
    }
    
    // Google login
    const googleLoginBtn = document.getElementById('googleLogin');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', handleGoogleLogin);
    }
});

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Basic validation
    if (!email || !password) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    // In a real app, you would authenticate with your backend
    // For this demo, we'll simulate a successful login
    
    // Show loading state
    const submitBtn = document.querySelector('#loginAccountForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // For demo purposes, we'll consider any email/password valid
        // In a real app, you would verify credentials with your backend
        showNotification('Login successful! Redirecting...', 'success');
        
        // Store user in localStorage for demo
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            name: email.split('@')[0] // Simple way to get a name from email
        }));
        
        // Redirect to home page after login
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1500);
}

function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showNotification('Please agree to terms and conditions', 'error');
        return;
    }
    
    // In a real app, you would register with your backend
    // For this demo, we'll simulate a successful registration
    
    // Show loading state
    const submitBtn = document.querySelector('#registerAccountForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Store user in localStorage for demo
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ name, email, phone, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        showNotification('Registration successful! You can now login.', 'success');
        
        // Switch to login tab
        document.querySelector('.auth-tab[data-tab="login"]').click();
    }, 1500);
}

function handleForgotPassword() {
    const email = document.getElementById('