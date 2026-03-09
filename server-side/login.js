// Login form submission handler
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Logging in...';

    try {
        // Make API call to backend
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Login successful
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        // Show success message
        showNotification('Login successful!', 'success');

        // Redirect to dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);

    } catch (error) {
        // Show error message
        showNotification(error.message || 'Login failed. Please try again.', 'error');
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Create message content
    const content = document.createElement('div');
    content.className = 'notification-content';
    content.textContent = message;
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => notification.remove();
    
    // Assemble notification
    notification.appendChild(content);
    notification.appendChild(closeButton);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add input validation
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.querySelector('button[type="submit"]');

function validateForm() {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    const isPasswordValid = passwordInput.value.length >= 6;
    
    loginButton.disabled = !(isEmailValid && isPasswordValid);
    
    // Update input styles
    emailInput.classList.toggle('invalid', !isEmailValid && emailInput.value !== '');
    passwordInput.classList.toggle('invalid', !isPasswordValid && passwordInput.value !== '');
}

// Add event listeners for real-time validation
emailInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);

// Initial validation
validateForm(); 