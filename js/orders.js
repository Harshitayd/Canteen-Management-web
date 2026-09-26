/**
 * CampusBite - Orders, Checkout & Tracking System
 * Handles Checkout order creation, Order confirmation, Tracking visual timeline, and Student Order History
 */

// Place Order Function (from checkout.html)
function placeOrder(pickupMethod = "Pickup from Canteen", paymentMethod = "Cash at Counter") {
    const currentUser = getStorage('currentUser', null);
    const cartSummary = getCartSummary();

    if (cartSummary.items.length === 0) {
        showToast("Your cart is empty!", "warning");
        return null;
    }

    // Customer info from form or user session
    const customerName = document.getElementById('checkout-name')?.value || (currentUser ? currentUser.name : "Guest Student");
    const collegeId = document.getElementById('checkout-id')?.value || (currentUser ? currentUser.collegeId : "CSE-GUEST");
    const phone = document.getElementById('checkout-phone')?.value || (currentUser ? currentUser.phone : "+91 9999999999");

    const orderId = generateOrderId();
    const newOrder = {
        id: orderId,
        userId: currentUser ? currentUser.id : "guest_user",
        userName: customerName,
        collegeId: collegeId,
        phone: phone,
        items: [...cartSummary.items],
        subtotal: cartSummary.subtotal,
        tax: cartSummary.tax,
        total: cartSummary.total,
        pickupMethod: pickupMethod,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'UPI Demo' ? 'Paid (Demo)' : 'Pay at Counter',
        status: "Pending", // Initial Status
        createdAt: new Date().toISOString()
    };

    // Save to Orders array in localStorage
    const orders = getStorage('orders', []);
    orders.unshift(newOrder); // add to top
    setStorage('orders', orders);

    // Save current active order ID for confirmation page
    setStorage('lastPlacedOrderId', orderId);

    // Clear Cart
    setStorage('cart', []);
    updateNavigation();

    showToast("Order placed successfully!", "success");

    setTimeout(() => {
        window.location.href = 'order-confirmation.html';
    }, 800);

    return newOrder;
}

// Render Order Confirmation Page (order-confirmation.html)
function renderOrderConfirmation() {
    const container = document.getElementById('confirmation-container');
    if (!container) return;

    const lastOrderId = getStorage('lastPlacedOrderId', null);
    const orders = getStorage('orders', []);
    const order = orders.find(o => o.id === lastOrderId) || orders[0];

    if (!order) {
        container.innerHTML = `
            <div class="text-center py-5">
                <h3>No order details found.</h3>
                <a href="menu.html" class="btn btn-primary mt-3">Browse Menu</a>
            </div>
        `;
        return;
    }

    let itemsListHtml = '';
    order.items.forEach(item => {
        itemsListHtml += `
            <div class="d-flex justify-between py-2 border-bottom">
                <div>
                    <span class="font-bold">${item.name}</span>
                    <small class="text-muted d-block">Qty: ${item.quantity} × ${formatCurrency(item.price)}</small>
                </div>
                <span class="font-semibold">${formatCurrency(item.price * item.quantity)}</span>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="confirmation-card card p-4 mx-auto" style="max-width: 650px;">
            <div class="text-center mb-4">
                <div class="success-checkmark-circle mb-3">
                    <i class="fas fa-check"></i>
                </div>
                <h2 class="font-bold text-success">Order Placed Successfully!</h2>
                <p class="text-muted">Thank you for ordering with CampusBite canteen.</p>
                <div class="order-id-badge my-2">Order ID: <strong>${order.id}</strong></div>
            </div>

            <div class="bg-light p-3 rounded mb-4">
                <div class="row">
                    <div class="col-6 mb-2">
                        <small class="text-muted d-block">Customer Name</small>
                        <strong>${order.userName} (${order.collegeId})</strong>
                    </div>
                    <div class="col-6 mb-2">
                        <small class="text-muted d-block">Order Date & Time</small>
                        <strong>${formatDate(order.createdAt)}</strong>
                    </div>
                    <div class="col-6">
                        <small class="text-muted d-block">Pickup Method</small>
                        <strong>${order.pickupMethod}</strong>
                    </div>
                    <div class="col-6">
                        <small class="text-muted d-block">Payment Method</small>
                        <strong>${order.paymentMethod} (${order.paymentStatus})</strong>
                    </div>
                </div>
            </div>

            <h4 class="font-bold mb-2">Order Summary</h4>
            <div class="order-items-summary mb-3">
                ${itemsListHtml}
            </div>

            <div class="summary-breakdown py-2 border-top">
                <div class="d-flex justify-between text-muted py-1">
                    <span>Subtotal</span>
                    <span>${formatCurrency(order.subtotal)}</span>
                </div>
                <div class="d-flex justify-between text-muted py-1">
                    <span>Campus Tax (5%)</span>
                    <span>${formatCurrency(order.tax)}</span>
                </div>
                <div class="d-flex justify-between font-bold text-lg py-2 border-top">
                    <span>Total Paid/Due</span>
                    <span class="text-primary">${formatCurrency(order.total)}</span>
                </div>
            </div>

            <div class="d-flex gap-2 mt-4">
                <a href="tracking.html?id=${order.id}" class="btn btn-primary flex-1">
                    <i class="fas fa-map-marker-alt mr-2"></i> Track Order
                </a>
                <a href="orders.html" class="btn btn-outline flex-1">
                    <i class="fas fa-list-alt mr-2"></i> View My Orders
                </a>
            </div>
        </div>
    `;
}

// Render Order Tracking Page Timeline (tracking.html)
function renderOrderTracking() {
    const container = document.getElementById('tracking-container');
    if (!container) return;

    // Get order ID from URL params or default to last order
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdParam = urlParams.get('id');
    const lastOrderId = orderIdParam || getStorage('lastPlacedOrderId', null);

    const orders = getStorage('orders', []);
    const order = orders.find(o => o.id === lastOrderId) || orders[0];

    if (!order) {
        container.innerHTML = `
            <div class="text-center py-5 card p-4">
                <i class="fas fa-search-location text-muted mb-3" style="font-size: 3rem;"></i>
                <h3>No order found to track.</h3>
                <p class="text-muted">Place an order to track its live preparation status!</p>
                <a href="menu.html" class="btn btn-primary mt-2">Explore Menu</a>
            </div>
        `;
        return;
    }

    // Define workflow steps
    const steps = [
        { key: "Pending", title: "Order Placed", desc: "Your order has been received by canteen" },
        { key: "Confirmed", title: "Order Confirmed", desc: "Canteen accepted your order" },
        { key: "Preparing", title: "Preparing", desc: "Chef is cooking your delicious meal" },
        { key: "Ready", title: "Ready for Pickup", desc: "Your meal is hot & ready at counter" },
        { key: "Completed", title: "Completed", desc: "Order collected. Enjoy your meal!" }
    ];

    // Status indexing for step progress
    const statusOrder = ["Pending", "Confirmed", "Preparing", "Ready", "Completed"];
    let currentIdx = statusOrder.indexOf(order.status);
    if (currentIdx === -1 && order.status === 'Cancelled') {
        currentIdx = -1; // Cancelled state
    }

    let timelineHtml = '';
    steps.forEach((step, idx) => {
        let isDone = idx <= currentIdx;
        let isCurrent = idx === currentIdx;

        let stepClass = '';
        if (isDone) stepClass += ' step-done';
        if (isCurrent) stepClass += ' step-current';

        timelineHtml += `
            <div class="timeline-step ${stepClass}">
                <div class="step-icon-wrapper">
                    <div class="step-icon">
                        ${isDone ? '<i class="fas fa-check"></i>' : (idx + 1)}
                    </div>
                </div>
                <div class="step-content">
                    <h5 class="step-title">${step.title}</h5>
                    <p class="step-desc">${step.desc}</p>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="card p-4 mx-auto" style="max-width: 750px;">
            <div class="d-flex justify-between align-center pb-3 mb-3 border-bottom">
                <div>
                    <h3 class="font-bold mb-1">Track Order: ${order.id}</h3>
                    <span class="text-muted">Placed on ${formatDate(order.createdAt)}</span>
                </div>
                <div>
                    <span class="badge ${order.status === 'Completed' ? 'badge-success' : 'badge-warning'} p-2 text-md">
                        ${order.status.toUpperCase()}
                    </span>
                </div>
            </div>

            ${order.status === 'Cancelled' ? `
                <div class="alert alert-danger mb-4">
                    <i class="fas fa-times-circle mr-2"></i> This order was cancelled by the canteen administration.
                </div>
            ` : ''}

            <!-- Step Progress Timeline -->
            <div class="tracking-timeline my-4">
                ${timelineHtml}
            </div>

            <!-- Items Brief -->
            <div class="bg-light p-3 rounded mt-4">
                <h5 class="font-bold mb-2">Order Items</h5>
                ${order.items.map(item => `
                    <div class="d-flex justify-between py-1">
                        <span>${item.quantity}x ${item.name}</span>
                        <span>${formatCurrency(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
                <div class="d-flex justify-between font-bold pt-2 mt-2 border-top">
                    <span>Total Amount</span>
                    <span class="text-primary">${formatCurrency(order.total)}</span>
                </div>
            </div>

            <div class="text-center mt-4">
                <button class="btn btn-outline" onclick="renderOrderTracking()">
                    <i class="fas fa-sync-alt mr-1"></i> Refresh Status
                </button>
            </div>
        </div>
    `;
}

// Render Student Order History (orders.html)
let currentOrdersFilter = 'All';

function renderStudentOrders() {
    const container = document.getElementById('student-orders-container');
    if (!container) return;

    const currentUser = getStorage('currentUser', null);
    let orders = getStorage('orders', []);

    // Filter by student user ID if logged in
    if (currentUser && currentUser.role === 'student') {
        orders = orders.filter(o => o.userId === currentUser.id || o.collegeId === currentUser.collegeId);
    }

    // Filter by selected tab
    if (currentOrdersFilter !== 'All') {
        orders = orders.filter(o => o.status === currentOrdersFilter);
    }

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state text-center py-5">
                <i class="fas fa-receipt text-muted mb-3" style="font-size: 3.5rem;"></i>
                <h4>No Orders Found</h4>
                <p class="text-muted">You haven't placed any orders matching this filter yet.</p>
                <a href="menu.html" class="btn btn-primary mt-2">Order Food Now</a>
            </div>
        `;
        return;
    }

    let ordersHtml = '';
    orders.forEach(order => {
        let statusBadge = 'badge-secondary';
        if (order.status === 'Completed') statusBadge = 'badge-success';
        if (order.status === 'Preparing' || order.status === 'Confirmed') statusBadge = 'badge-info';
        if (order.status === 'Ready') statusBadge = 'badge-warning';
        if (order.status === 'Cancelled') statusBadge = 'badge-danger';

        const itemsSummary = order.items.map(i => `${i.quantity}x ${i.name}`).join(', ');

        ordersHtml += `
            <div class="order-history-card card mb-3 p-3">
                <div class="d-flex justify-between align-center pb-2 border-bottom">
                    <div>
                        <strong class="text-primary">${order.id}</strong>
                        <span class="text-muted text-xs ml-2">${formatDate(order.createdAt)}</span>
                    </div>
                    <span class="badge ${statusBadge}">${order.status}</span>
                </div>
                
                <div class="py-3">
                    <p class="mb-1"><strong>Items:</strong> ${itemsSummary}</p>
                    <p class="text-muted mb-0"><small>Payment: ${order.paymentMethod} (${order.paymentStatus})</small></p>
                </div>

                <div class="d-flex justify-between align-center pt-2 border-top">
                    <div>
                        <span class="text-muted text-sm">Total: </span>
                        <span class="font-bold text-lg">${formatCurrency(order.total)}</span>
                    </div>
                    <div class="d-flex gap-2">
                        <a href="tracking.html?id=${order.id}" class="btn btn-outline btn-sm">
                            <i class="fas fa-map-marker-alt mr-1"></i> Track
                        </a>
                        <button class="btn btn-primary btn-sm" onclick="openOrderDetailsModal('${order.id}')">
                            <i class="fas fa-eye mr-1"></i> Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = ordersHtml;
}

function filterStudentOrders(status, buttonEl) {
    currentOrdersFilter = status;
    const btns = document.querySelectorAll('.order-filter-btn');
    btns.forEach(b => b.classList.remove('active'));
    if (buttonEl) buttonEl.classList.add('active');
    renderStudentOrders();
}

// Modal for viewing complete order breakdown
function openOrderDetailsModal(orderId) {
    const orders = getStorage('orders', []);
    const order = orders.find(o => o.id === orderId);

    if (!order) return;

    let modal = document.getElementById('order-detail-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'order-detail-modal';
        modal.className = 'modal-backdrop';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-card p-4" style="max-width: 550px;">
            <button class="modal-close-btn" onclick="document.getElementById('order-detail-modal').classList.remove('active')">&times;</button>
            <h3 class="font-bold mb-1">Order Details (${order.id})</h3>
            <p class="text-muted mb-3"><small>Placed on ${formatDate(order.createdAt)}</small></p>
            
            <div class="bg-light p-3 rounded mb-3">
                <div class="d-flex justify-between mb-1">
                    <span>Status:</span>
                    <strong>${order.status}</strong>
                </div>
                <div class="d-flex justify-between mb-1">
                    <span>Customer:</span>
                    <strong>${order.userName} (${order.collegeId})</strong>
                </div>
                <div class="d-flex justify-between mb-1">
                    <span>Pickup Method:</span>
                    <strong>${order.pickupMethod}</strong>
                </div>
                <div class="d-flex justify-between">
                    <span>Payment:</span>
                    <strong>${order.paymentMethod} (${order.paymentStatus})</strong>
                </div>
            </div>

            <h5 class="font-bold mb-2">Ordered Items:</h5>
            <div class="mb-3 border-bottom pb-2">
                ${order.items.map(i => `
                    <div class="d-flex justify-between py-1">
                        <span>${i.name} × ${i.quantity}</span>
                        <span>${formatCurrency(i.price * i.quantity)}</span>
                    </div>
                `).join('')}
            </div>

            <div class="d-flex justify-between text-muted py-1">
                <span>Subtotal</span>
                <span>${formatCurrency(order.subtotal)}</span>
            </div>
            <div class="d-flex justify-between text-muted py-1">
                <span>Campus Tax (5%)</span>
                <span>${formatCurrency(order.tax)}</span>
            </div>
            <div class="d-flex justify-between font-bold text-lg pt-2 border-top">
                <span>Total Amount</span>
                <span class="text-primary">${formatCurrency(order.total)}</span>
            </div>
        </div>
    `;

    modal.classList.add('active');
}
