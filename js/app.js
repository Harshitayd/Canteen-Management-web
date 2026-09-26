/**
 * CampusBite - Main Application Bootstrapper
 * Initializes page-specific script routines upon DOM ready
 */

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    // 1. Landing / Home Page
    if (path.endsWith('index.html') || path.endsWith('/')) {
        if (document.getElementById('popular-food-grid')) {
            renderMenu('popular-food-grid');
        }
    }

    // 2. Menu Page
    if (path.endsWith('menu.html')) {
        renderMenu('food-grid-container');
    }

    // 3. Cart Page
    if (path.endsWith('cart.html')) {
        renderCartPage();
    }

    // 4. Order Confirmation Page
    if (path.endsWith('order-confirmation.html')) {
        renderOrderConfirmation();
    }

    // 5. Tracking Page
    if (path.endsWith('tracking.html')) {
        renderOrderTracking();
    }

    // 6. Student Orders Page
    if (path.endsWith('orders.html') && !path.includes('/admin/')) {
        requireStudent();
        renderStudentOrders();
    }

    // 7. Student Dashboard Page
    if (path.endsWith('dashboard.html') && !path.includes('/admin/')) {
        const user = requireStudent();
        if (user) {
            initStudentDashboard(user);
        }
    }

    // 8. Student Profile Page
    if (path.endsWith('profile.html')) {
        const user = requireStudent();
        if (user) {
            initStudentProfile(user);
        }
    }

    // 9. Admin Pages
    if (path.includes('/admin/')) {
        const adminUser = requireAdmin();
        if (adminUser) {
            if (path.endsWith('dashboard.html')) renderAdminDashboard();
            if (path.endsWith('food.html')) renderAdminFoodTable();
            if (path.endsWith('orders.html')) renderAdminOrdersTable();
            if (path.endsWith('users.html')) renderAdminUsersTable();
            if (path.endsWith('reports.html')) renderAdminReports();
        }
    }
});

// Student Dashboard Initializer
function initStudentDashboard(user) {
    const welcomeEl = document.getElementById('student-welcome-name');
    if (welcomeEl) welcomeEl.textContent = user.name;

    const orders = getStorage('orders', []);
    const studentOrders = orders.filter(o => o.userId === user.id || o.collegeId === user.collegeId);
    
    const totalOrdersEl = document.getElementById('dash-total-orders');
    if (totalOrdersEl) totalOrdersEl.textContent = studentOrders.length;

    const pendingOrdersEl = document.getElementById('dash-pending-orders');
    if (pendingOrdersEl) {
        const pendingCount = studentOrders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled').length;
        pendingOrdersEl.textContent = pendingCount;
    }

    const completedOrdersEl = document.getElementById('dash-completed-orders');
    if (completedOrdersEl) {
        const completedCount = studentOrders.filter(o => o.status === 'Completed').length;
        completedOrdersEl.textContent = completedCount;
    }

    // Recommended food grid
    if (document.getElementById('recommended-food-grid')) {
        renderMenu('recommended-food-grid');
    }
}

// Student Profile View & Edit Initializer
function initStudentProfile(user) {
    const nameInput = document.getElementById('profile-name');
    const idInput = document.getElementById('profile-id');
    const emailInput = document.getElementById('profile-email');
    const phoneInput = document.getElementById('profile-phone');

    if (nameInput) nameInput.value = user.name || '';
    if (idInput) idInput.value = user.collegeId || '';
    if (emailInput) emailInput.value = user.email || '';
    if (phoneInput) phoneInput.value = user.phone || '';
}

// Profile Save Handler
function saveStudentProfile(event) {
    event.preventDefault();
    const currentUser = getStorage('currentUser', null);
    if (!currentUser) return;

    const name = document.getElementById('profile-name').value.trim();
    const phone = document.getElementById('profile-phone').value.trim();

    currentUser.name = name;
    currentUser.phone = phone;

    // Update in currentUser & users list
    setStorage('currentUser', currentUser);

    const users = getStorage('users', []);
    const index = users.findIndex(u => u.id === currentUser.id);
    if (index > -1) {
        users[index] = currentUser;
        setStorage('users', users);
    }

    showToast("Profile details updated successfully!", "success");
    updateNavigation();
}
