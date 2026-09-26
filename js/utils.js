/**
 * CampusBite - Utility Functions
 * Helper methods for LocalStorage, UI rendering, Toast notifications, and Formats
 */

// LocalStorage Helper Functions
function getStorage(key, defaultValue = []) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error(`Error reading ${key} from localStorage:`, e);
        return defaultValue;
    }
}

function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`Error saving ${key} to localStorage:`, e);
    }
}

// Formatting Utilities
function formatCurrency(amount) {
    return `₹${parseFloat(amount || 0).toFixed(0)}`;
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Order ID Generator (e.g. CB20260003)
function generateOrderId() {
    const orders = getStorage('orders', []);
    const count = orders.length + 1;
    const year = new Date().getFullYear();
    const padNum = String(count).padStart(4, '0');
    return `CB${year}${padNum}`;
}

// Render Rating Stars HTML
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star star-filled"></i>';
    }
    if (hasHalf) {
        starsHtml += '<i class="fas fa-star-half-alt star-filled"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star star-empty"></i>';
    }
    return `<span class="rating-stars">${starsHtml} <span class="rating-val">(${rating})</span></span>`;
}

// Toast Notification System
function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-check-circle';
    if (type === 'error') iconClass = 'fa-exclamation-circle';
    if (type === 'warning') iconClass = 'fa-exclamation-triangle';
    if (type === 'info') iconClass = 'fa-info-circle';

    toast.innerHTML = `
        <i class="fas ${iconClass} toast-icon"></i>
        <div class="toast-message">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 3.5 seconds
    setTimeout(() => {
        toast.classList.add('toast-fade-out');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 300);
    }, 3500);
}

// Dynamic Navigation & Cart Badge Update
function updateNavigation() {
    const currentUser = getStorage('currentUser', null);
    const cart = getStorage('cart', []);
    
    // Update Cart Count Badges across all pages
    const cartCountElements = document.querySelectorAll('.cart-count-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        if (totalItems > 0) {
            el.style.display = 'inline-flex';
        } else {
            el.style.display = 'none';
        }
    });

    // Update Auth Buttons in Header
    const authNavContainer = document.getElementById('nav-auth-buttons');
    if (authNavContainer) {
        if (currentUser) {
            const isStudent = currentUser.role === 'student';
            const dashboardLink = isStudent ? 'dashboard.html' : 'admin/dashboard.html';
            
            authNavContainer.innerHTML = `
                <div class="user-nav-dropdown">
                    <button class="btn btn-outline nav-user-btn" onclick="toggleUserDropdown(event)">
                        <i class="fas fa-user-circle"></i>
                        <span>${currentUser.name.split(' ')[0]}</span>
                        <i class="fas fa-chevron-down text-xs ml-1"></i>
                    </button>
                    <div class="dropdown-menu" id="userDropdownMenu">
                        <div class="dropdown-header">
                            <strong>${currentUser.name}</strong>
                            <small class="text-muted d-block">${currentUser.role.toUpperCase()}</small>
                        </div>
                        <div class="dropdown-divider"></div>
                        <a href="${dashboardLink}" class="dropdown-item"><i class="fas fa-th-large mr-2"></i> Dashboard</a>
                        ${isStudent ? '<a href="orders.html" class="dropdown-item"><i class="fas fa-receipt mr-2"></i> My Orders</a>' : ''}
                        ${isStudent ? '<a href="profile.html" class="dropdown-item"><i class="fas fa-user-cog mr-2"></i> Profile</a>' : ''}
                        <div class="dropdown-divider"></div>
                        <button onclick="logoutUser()" class="dropdown-item text-danger"><i class="fas fa-sign-out-alt mr-2"></i> Logout</button>
                    </div>
                </div>
            `;
        } else {
            authNavContainer.innerHTML = `
                <a href="login.html" class="btn btn-outline mr-2">Login</a>
                <a href="register.html" class="btn btn-primary">Register</a>
            `;
        }
    }
}

// Toggle User Dropdown Menu
function toggleUserDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('userDropdownMenu');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close dropdowns on document click
document.addEventListener('click', () => {
    const dropdown = document.getElementById('userDropdownMenu');
    if (dropdown && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    }
});

// Mobile Hamburger Navigation Drawer
function setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('mobile-active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
}

// Initialize common UI components on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    setupMobileMenu();
});
