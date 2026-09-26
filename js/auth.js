/**
 * CampusBite - Authentication System (Frontend LocalStorage based)
 * Handles Student & Admin login, registration, role checks & logout
 */

// Login Function
function loginUser(email, password) {
    const users = getStorage('users', []);
    
    // Find matching user by email and password
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password);

    if (!user) {
        showToast("Invalid email address or password!", "error");
        return false;
    }

    // Save session in localStorage
    setStorage('currentUser', user);
    showToast(`Welcome back, ${user.name}!`, "success");

    // Redirect based on role
    setTimeout(() => {
        if (user.role === 'admin') {
            window.location.href = 'admin/dashboard.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    }, 800);

    return true;
}

// Registration Function
function registerUser(name, collegeId, email, phone, password, confirmPassword) {
    // Form Validations
    if (!name || !collegeId || !email || !phone || !password || !confirmPassword) {
        showToast("Please fill in all required fields.", "warning");
        return false;
    }

    if (password !== confirmPassword) {
        showToast("Passwords do not match!", "error");
        return false;
    }

    if (password.length < 6) {
        showToast("Password must be at least 6 characters long.", "warning");
        return false;
    }

    const users = getStorage('users', []);

    // Check if email already registered
    const existingEmail = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (existingEmail) {
        showToast("An account with this email already exists!", "error");
        return false;
    }

    // Create new student user object
    const newUser = {
        id: `user_student_${Date.now()}`,
        name: name.trim(),
        collegeId: collegeId.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        password: password,
        role: "student",
        createdAt: new Date().toISOString()
    };

    // Save user to users array
    users.push(newUser);
    setStorage('users', users);

    // Auto login after registration
    setStorage('currentUser', newUser);
    showToast("Account created successfully! Logging you in...", "success");

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);

    return true;
}

// Logout Function
function logoutUser() {
    localStorage.removeItem('currentUser');
    showToast("Logged out successfully.", "info");
    setTimeout(() => {
        // Handle path if logged out from inside /admin/ folder
        if (window.location.pathname.includes('/admin/')) {
            window.location.href = '../login.html';
        } else {
            window.location.href = 'login.html';
        }
    }, 600);
}

// Access Protection Guards
function requireAuth() {
    const currentUser = getStorage('currentUser', null);
    if (!currentUser) {
        showToast("Please login to access this page.", "warning");
        setTimeout(() => {
            if (window.location.pathname.includes('/admin/')) {
                window.location.href = '../login.html';
            } else {
                window.location.href = 'login.html';
            }
        }, 500);
        return null;
    }
    return currentUser;
}

function requireStudent() {
    const user = requireAuth();
    if (user && user.role !== 'student') {
        showToast("Access restricted to students only.", "error");
        setTimeout(() => {
            window.location.href = 'admin/dashboard.html';
        }, 500);
    }
    return user;
}

function requireAdmin() {
    const user = requireAuth();
    if (user && user.role !== 'admin') {
        showToast("Access restricted to Administrators!", "error");
        setTimeout(() => {
            window.location.href = '../dashboard.html';
        }, 500);
    }
    return user;
}
