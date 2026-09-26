/**
 * CampusBite - Admin Management System
 * Admin Stats, Pure HTML/CSS/SVG Charts, Food CRUD, Order Status Management, Users & Reports
 */

// Render Admin Dashboard Main Page (admin/dashboard.html)
function renderAdminDashboard() {
    const statsContainer = document.getElementById('admin-stats-container');
    if (!statsContainer) return;

    const orders = getStorage('orders', []);
    const foodItems = getStorage('foodItems', []);
    const users = getStorage('users', []);
    const students = users.filter(u => u.role === 'student');

    // Calculate metrics
    const totalOrders = orders.length;
    
    // Today's orders count
    const todayStr = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.createdAt && o.createdAt.startsWith(todayStr));
    
    // Total Revenue (only from non-cancelled orders)
    const totalRevenue = orders
        .filter(o => o.status !== 'Cancelled')
        .reduce((sum, o) => sum + (o.total || 0), 0);

    const availableFoodCount = foodItems.filter(f => f.isAvailable).length;

    statsContainer.innerHTML = `
        <div class="grid grid-cols-4 gap-4 mb-5">
            <div class="stat-card">
                <div class="stat-icon bg-primary-light text-primary">
                    <i class="fas fa-shopping-bag"></i>
                </div>
                <div class="stat-info">
                    <span class="stat-label">Total Orders</span>
                    <h3 class="stat-value">${totalOrders}</h3>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon bg-success-light text-success">
                    <i class="fas fa-calendar-day"></i>
                </div>
                <div class="stat-info">
                    <span class="stat-label">Today's Orders</span>
                    <h3 class="stat-value">${todayOrders.length}</h3>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon bg-warning-light text-warning">
                    <i class="fas fa-rupee-sign"></i>
                </div>
                <div class="stat-info">
                    <span class="stat-label">Total Revenue</span>
                    <h3 class="stat-value">${formatCurrency(totalRevenue)}</h3>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon bg-info-light text-info">
                    <i class="fas fa-hamburger"></i>
                </div>
                <div class="stat-info">
                    <span class="stat-label">Available Foods</span>
                    <h3 class="stat-value">${availableFoodCount} / ${foodItems.length}</h3>
                </div>
            </div>
        </div>
    `;

    renderAdminCharts(orders, foodItems);
    renderRecentAdminOrdersTable(orders.slice(0, 5));
}

// Render Pure HTML/CSS/SVG Charts (No external chart libraries used!)
function renderAdminCharts(orders, foodItems) {
    const chartContainer = document.getElementById('admin-charts-container');
    if (!chartContainer) return;

    // Calculate Category Distribution for Donut Chart
    const categoryCounts = {};
    orders.forEach(o => {
        o.items.forEach(i => {
            categoryCounts[i.category] = (categoryCounts[i.category] || 0) + i.quantity;
        });
    });

    const categories = Object.keys(categoryCounts);
    const maxVal = Math.max(...Object.values(categoryCounts), 1);

    let barChartHtml = `
        <div class="card p-4">
            <h4 class="font-bold mb-3">Popular Food Sales by Category</h4>
            <div class="custom-bar-chart">
    `;

    categories.forEach(cat => {
        const val = categoryCounts[cat];
        const percent = Math.round((val / maxVal) * 100);
        barChartHtml += `
            <div class="bar-item mb-3">
                <div class="d-flex justify-between text-sm font-semibold mb-1">
                    <span>${cat}</span>
                    <span>${val} items sold</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${percent}%;"></div>
                </div>
            </div>
        `;
    });

    if (categories.length === 0) {
        barChartHtml += `<p class="text-muted text-center py-4">No sales data available yet.</p>`;
    }

    barChartHtml += `</div></div>`;

    // Status breakdown chart
    const statusCounts = {
        Pending: orders.filter(o => o.status === 'Pending').length,
        Preparing: orders.filter(o => o.status === 'Preparing' || o.status === 'Confirmed').length,
        Ready: orders.filter(o => o.status === 'Ready').length,
        Completed: orders.filter(o => o.status === 'Completed').length,
        Cancelled: orders.filter(o => o.status === 'Cancelled').length
    };

    let statusChartHtml = `
        <div class="card p-4">
            <h4 class="font-bold mb-3">Order Status Distribution</h4>
            <div class="status-summary-grid">
                <div class="status-box bg-warning-light">
                    <span class="status-count text-warning">${statusCounts.Pending}</span>
                    <span class="status-name">Pending</span>
                </div>
                <div class="status-box bg-info-light">
                    <span class="status-count text-info">${statusCounts.Preparing}</span>
                    <span class="status-name">Preparing</span>
                </div>
                <div class="status-box bg-primary-light">
                    <span class="status-count text-primary">${statusCounts.Ready}</span>
                    <span class="status-name">Ready</span>
                </div>
                <div class="status-box bg-success-light">
                    <span class="status-count text-success">${statusCounts.Completed}</span>
                    <span class="status-name">Completed</span>
                </div>
            </div>
        </div>
    `;

    chartContainer.innerHTML = `
        <div class="grid grid-cols-2 gap-4">
            ${barChartHtml}
            ${statusChartHtml}
        </div>
    `;
}

// Render Recent Orders in Dashboard
function renderRecentAdminOrdersTable(recentOrders) {
    const tableContainer = document.getElementById('recent-orders-table-container');
    if (!tableContainer) return;

    if (recentOrders.length === 0) {
        tableContainer.innerHTML = `<p class="text-muted text-center py-3">No orders placed yet.</p>`;
        return;
    }

    let tableHtml = `
        <div class="card p-4 mt-4">
            <div class="d-flex justify-between align-center mb-3">
                <h4 class="font-bold">Recent Orders</h4>
                <a href="orders.html" class="btn btn-outline btn-sm">View All Orders</a>
            </div>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Student</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    recentOrders.forEach(o => {
        tableHtml += `
            <tr>
                <td><strong>${o.id}</strong></td>
                <td>${o.userName}<br><small class="text-muted">${o.collegeId}</small></td>
                <td>${o.items.length} items</td>
                <td><strong>${formatCurrency(o.total)}</strong></td>
                <td>
                    <span class="badge ${o.status === 'Completed' ? 'badge-success' : 'badge-warning'}">
                        ${o.status}
                    </span>
                </td>
                <td>
                    <a href="orders.html" class="btn btn-sm btn-outline"><i class="fas fa-edit"></i> Manage</a>
                </td>
            </tr>
        `;
    });

    tableHtml += `</tbody></table></div></div>`;
    tableContainer.innerHTML = tableHtml;
}

// Admin Food Management (admin/food.html)
let adminFoodFilter = 'All';

function renderAdminFoodTable() {
    const container = document.getElementById('admin-food-table-container');
    if (!container) return;

    let foodItems = getStorage('foodItems', []);

    if (adminFoodFilter !== 'All') {
        foodItems = foodItems.filter(f => f.category === adminFoodFilter);
    }

    let rowsHtml = '';
    foodItems.forEach(item => {
        rowsHtml += `
            <tr>
                <td>
                    <img src="${item.image}" alt="${item.name}" class="table-thumb-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'">
                </td>
                <td>
                    <strong>${item.name}</strong>
                    <div class="text-xs text-muted">${item.description.substring(0, 50)}...</div>
                </td>
                <td><span class="badge badge-secondary">${item.category}</span></td>
                <td><strong>${formatCurrency(item.price)}</strong></td>
                <td><i class="fas fa-star text-warning"></i> ${item.rating}</td>
                <td>
                    <button class="btn btn-xs ${item.isAvailable ? 'btn-success' : 'btn-danger'}" onclick="toggleFoodAvailability('${item.id}')">
                        ${item.isAvailable ? 'In Stock' : 'Out of Stock'}
                    </button>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline mr-1" onclick="openFoodEditModal('${item.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline text-danger" onclick="deleteFoodItem('${item.id}')">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml.length > 0 ? rowsHtml : '<tr><td colspan="7" class="text-center py-4">No food items found.</td></tr>'}
                </tbody>
            </table>
        </div>
    `;
}

// Toggle Availability
function toggleFoodAvailability(foodId) {
    let foodItems = getStorage('foodItems', []);
    const item = foodItems.find(f => f.id === foodId);
    if (item) {
        item.isAvailable = !item.isAvailable;
        setStorage('foodItems', foodItems);
        showToast(`Updated status for "${item.name}"`, "info");
        renderAdminFoodTable();
    }
}

// Delete Food Item with confirmation
function deleteFoodItem(foodId) {
    let foodItems = getStorage('foodItems', []);
    const item = foodItems.find(f => f.id === foodId);

    if (!item) return;

    if (confirm(`Are you sure you want to delete "${item.name}" from the canteen menu?`)) {
        foodItems = foodItems.filter(f => f.id !== foodId);
        setStorage('foodItems', foodItems);
        showToast(`Deleted "${item.name}"`, "success");
        renderAdminFoodTable();
    }
}

// Open Food Modal (Add or Edit)
function openFoodEditModal(foodId = null) {
    const foodItems = getStorage('foodItems', []);
    const isEdit = foodId !== null;
    const food = isEdit ? foodItems.find(f => f.id === foodId) : {
        name: '', description: '', ingredients: '', category: 'Breakfast', price: 50, rating: 4.5, isAvailable: true, image: ''
    };

    let modal = document.getElementById('admin-food-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'admin-food-modal';
        modal.className = 'modal-backdrop';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-card p-4" style="max-width: 550px;">
            <button class="modal-close-btn" onclick="document.getElementById('admin-food-modal').classList.remove('active')">&times;</button>
            <h3 class="font-bold mb-3">${isEdit ? 'Edit Food Item' : 'Add New Food Item'}</h3>
            
            <form onsubmit="saveFoodItem(event, '${isEdit ? foodId : ''}')">
                <div class="form-group mb-3">
                    <label class="form-label">Food Name</label>
                    <input type="text" id="food-form-name" class="form-control" value="${food.name}" required>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div class="form-group">
                        <label class="form-label">Category</label>
                        <select id="food-form-category" class="form-control">
                            <option value="Breakfast" ${food.category === 'Breakfast' ? 'selected' : ''}>Breakfast</option>
                            <option value="Lunch" ${food.category === 'Lunch' ? 'selected' : ''}>Lunch</option>
                            <option value="Snacks" ${food.category === 'Snacks' ? 'selected' : ''}>Snacks</option>
                            <option value="Beverages" ${food.category === 'Beverages' ? 'selected' : ''}>Beverages</option>
                            <option value="Desserts" ${food.category === 'Desserts' ? 'selected' : ''}>Desserts</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Price (₹)</label>
                        <input type="number" id="food-form-price" class="form-control" value="${food.price}" min="1" required>
                    </div>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">Image URL</label>
                    <input type="url" id="food-form-image" class="form-control" value="${food.image}" placeholder="https://..." required>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">Description</label>
                    <textarea id="food-form-desc" class="form-control" rows="2" required>${food.description}</textarea>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">Ingredients</label>
                    <input type="text" id="food-form-ingredients" class="form-control" value="${food.ingredients || ''}">
                </div>

                <div class="d-flex align-center gap-4 mb-4">
                    <div>
                        <label class="form-label mb-1">Rating</label>
                        <input type="number" step="0.1" min="1" max="5" id="food-form-rating" class="form-control" value="${food.rating}">
                    </div>
                    <div class="pt-4">
                        <label class="d-flex align-center cursor-pointer">
                            <input type="checkbox" id="food-form-available" ${food.isAvailable ? 'checked' : ''}>
                            <span class="ml-2 font-semibold">Available in Canteen</span>
                        </label>
                    </div>
                </div>

                <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-primary flex-1">${isEdit ? 'Save Changes' : 'Create Food Item'}</button>
                    <button type="button" class="btn btn-outline flex-1" onclick="document.getElementById('admin-food-modal').classList.remove('active')">Cancel</button>
                </div>
            </form>
        </div>
    `;

    modal.classList.add('active');
}

// Save or Update food item
function saveFoodItem(event, foodId) {
    event.preventDefault();
    let foodItems = getStorage('foodItems', []);

    const name = document.getElementById('food-form-name').value.trim();
    const category = document.getElementById('food-form-category').value;
    const price = parseFloat(document.getElementById('food-form-price').value);
    const image = document.getElementById('food-form-image').value.trim();
    const description = document.getElementById('food-form-desc').value.trim();
    const ingredients = document.getElementById('food-form-ingredients').value.trim();
    const rating = parseFloat(document.getElementById('food-form-rating').value) || 4.5;
    const isAvailable = document.getElementById('food-form-available').checked;

    if (foodId) {
        // Edit existing
        const index = foodItems.findIndex(f => f.id === foodId);
        if (index > -1) {
            foodItems[index] = { ...foodItems[index], name, category, price, image, description, ingredients, rating, isAvailable };
            showToast(`Updated "${name}" successfully`, "success");
        }
    } else {
        // Create new
        const newFood = {
            id: `food_${Date.now()}`,
            name, category, price, image, description, ingredients, rating, isAvailable
        };
        foodItems.unshift(newFood);
        showToast(`Created new item "${name}"`, "success");
    }

    setStorage('foodItems', foodItems);
    document.getElementById('admin-food-modal').classList.remove('active');
    renderAdminFoodTable();
}

// Admin Order Management (admin/orders.html)
let adminOrderFilter = 'All';

function renderAdminOrdersTable() {
    const container = document.getElementById('admin-orders-table-container');
    if (!container) return;

    let orders = getStorage('orders', []);

    if (adminOrderFilter !== 'All') {
        orders = orders.filter(o => o.status === adminOrderFilter);
    }

    if (orders.length === 0) {
        container.innerHTML = `<p class="text-muted text-center py-5">No orders found.</p>`;
        return;
    }

    let rowsHtml = '';
    orders.forEach(o => {
        const itemNames = o.items.map(i => `${i.quantity}x ${i.name}`).join(', ');

        rowsHtml += `
            <tr>
                <td><strong>${o.id}</strong></td>
                <td>
                    <strong>${o.userName}</strong>
                    <div class="text-xs text-muted">${o.collegeId} | ${o.phone}</div>
                </td>
                <td>
                    <div class="text-sm" title="${itemNames}">${itemNames.substring(0, 45)}${itemNames.length > 45 ? '...' : ''}</div>
                    <small class="text-muted">${o.items.length} total items</small>
                </td>
                <td><strong>${formatCurrency(o.total)}</strong></td>
                <td><small>${formatDate(o.createdAt)}</small></td>
                <td>
                    <select class="form-control form-control-sm status-select" onchange="updateOrderStatus('${o.id}', this.value)">
                        <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Preparing" ${o.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
                        <option value="Ready" ${o.status === 'Ready' ? 'selected' : ''}>Ready for Pickup</option>
                        <option value="Completed" ${o.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline" onclick="openOrderDetailsModal('${o.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Student Info</th>
                        <th>Items</th>
                        <th>Total Amount</th>
                        <th>Date & Time</th>
                        <th>Change Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
    `;
}

// Synchronize status change with LocalStorage
function updateOrderStatus(orderId, newStatus) {
    let orders = getStorage('orders', []);
    const order = orders.find(o => o.id === orderId);

    if (order) {
        order.status = newStatus;
        if (newStatus === 'Completed') {
            order.paymentStatus = 'Paid';
        }
        setStorage('orders', orders);
        showToast(`Order ${orderId} status updated to "${newStatus}"`, "success");
    }
}

// User Management (admin/users.html)
function renderAdminUsersTable(searchQuery = '') {
    const container = document.getElementById('admin-users-table-container');
    if (!container) return;

    const users = getStorage('users', []);
    const orders = getStorage('orders', []);

    let students = users.filter(u => u.role === 'student');

    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        students = students.filter(s => 
            s.name.toLowerCase().includes(q) || 
            s.collegeId.toLowerCase().includes(q) || 
            s.email.toLowerCase().includes(q)
        );
    }

    let rowsHtml = '';
    students.forEach(s => {
        const studentOrders = orders.filter(o => o.userId === s.id || o.collegeId === s.collegeId);
        const totalSpent = studentOrders.reduce((sum, o) => sum + o.total, 0);

        rowsHtml += `
            <tr>
                <td><strong>${s.name}</strong></td>
                <td><span class="badge badge-secondary">${s.collegeId}</span></td>
                <td>${s.email}</td>
                <td>${s.phone}</td>
                <td><strong>${studentOrders.length} orders</strong></td>
                <td><strong class="text-primary">${formatCurrency(totalSpent)}</strong></td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>College ID</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Total Orders</th>
                        <th>Total Spent</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml.length > 0 ? rowsHtml : '<tr><td colspan="6" class="text-center py-4">No student records found.</td></tr>'}
                </tbody>
            </table>
        </div>
    `;
}

// Reports Page (admin/reports.html)
function renderAdminReports() {
    const container = document.getElementById('admin-reports-container');
    if (!container) return;

    const orders = getStorage('orders', []);
    
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'Completed').length;
    const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;
    const pendingOrders = orders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled').length;

    const totalRevenue = orders
        .filter(o => o.status !== 'Cancelled')
        .reduce((sum, o) => sum + o.total, 0);

    // Most Ordered Item Calculation
    const foodFrequency = {};
    orders.forEach(o => {
        o.items.forEach(item => {
            foodFrequency[item.name] = (foodFrequency[item.name] || 0) + item.quantity;
        });
    });

    let topFood = "N/A";
    let topCount = 0;
    Object.keys(foodFrequency).forEach(name => {
        if (foodFrequency[name] > topCount) {
            topCount = foodFrequency[name];
            topFood = name;
        }
    });

    container.innerHTML = `
        <div class="grid grid-cols-4 gap-4 mb-5">
            <div class="card p-4 text-center">
                <small class="text-muted font-semibold">Total Orders Processed</small>
                <h2 class="font-bold text-primary mt-2">${totalOrders}</h2>
            </div>
            <div class="card p-4 text-center">
                <small class="text-muted font-semibold">Completed Orders</small>
                <h2 class="font-bold text-success mt-2">${completedOrders}</h2>
            </div>
            <div class="card p-4 text-center">
                <small class="text-muted font-semibold">Cancelled Orders</small>
                <h2 class="font-bold text-danger mt-2">${cancelledOrders}</h2>
            </div>
            <div class="card p-4 text-center">
                <small class="text-muted font-semibold">Total Canteen Revenue</small>
                <h2 class="font-bold text-warning mt-2">${formatCurrency(totalRevenue)}</h2>
            </div>
        </div>

        <div class="card p-4 mb-4">
            <h4 class="font-bold mb-3">Key Performance Summary</h4>
            <div class="row">
                <div class="col-6">
                    <p><strong>Most Popular Item:</strong> <span class="badge badge-primary">${topFood}</span> (${topCount} total units sold)</p>
                    <p><strong>Fulfillment Rate:</strong> ${totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0}%</p>
                </div>
                <div class="col-6">
                    <p><strong>Active In-Progress Orders:</strong> ${pendingOrders}</p>
                    <p><strong>Cancellation Rate:</strong> ${totalOrders > 0 ? Math.round((cancelledOrders / totalOrders) * 100) : 0}%</p>
                </div>
            </div>
        </div>
    `;
}
