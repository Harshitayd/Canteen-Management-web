/**
 * CampusBite - Cart Management System
 * LocalStorage Cart management: Add, Remove, Quantity Update, Totals calculation
 */

// Add item to cart
function addToCart(foodId, quantity = 1) {
    const foodItems = getStorage('foodItems', []);
    const food = foodItems.find(f => f.id === foodId);

    if (!food) {
        showToast("Food item not found!", "error");
        return;
    }

    if (!food.isAvailable) {
        showToast(`Sorry, ${food.name} is currently out of stock!`, "warning");
        return;
    }

    let cart = getStorage('cart', []);
    const existingIndex = cart.findIndex(item => item.id === foodId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: food.id,
            name: food.name,
            price: food.price,
            image: food.image,
            category: food.category,
            quantity: quantity
        });
    }

    setStorage('cart', cart);
    updateNavigation();
    showToast(`Added ${quantity}x "${food.name}" to your cart!`, "success");
}

// Remove single item from cart
function removeFromCart(foodId) {
    let cart = getStorage('cart', []);
    const itemToRemove = cart.find(item => item.id === foodId);
    cart = cart.filter(item => item.id !== foodId);
    
    setStorage('cart', cart);
    updateNavigation();
    
    if (itemToRemove) {
        showToast(`Removed "${itemToRemove.name}" from cart.`, "info");
    }

    // Refresh page if on cart.html
    if (document.getElementById('cart-items-container')) {
        renderCartPage();
    }
}

// Update quantity of an item in cart
function updateQuantity(foodId, newQty) {
    newQty = parseInt(newQty);
    if (isNaN(newQty) || newQty <= 0) {
        removeFromCart(foodId);
        return;
    }

    let cart = getStorage('cart', []);
    const item = cart.find(i => i.id === foodId);
    if (item) {
        item.quantity = newQty;
        setStorage('cart', cart);
        updateNavigation();
        if (document.getElementById('cart-items-container')) {
            renderCartPage();
        }
    }
}

// Clear all items in cart
function clearCart() {
    setStorage('cart', []);
    updateNavigation();
    showToast("Cart has been cleared.", "info");
    if (document.getElementById('cart-items-container')) {
        renderCartPage();
    }
}

// Calculate cart monetary subtotal, tax and grand total
function getCartSummary() {
    const cart = getStorage('cart', []);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = 0.05; // 5% GST/Campus Tax
    const tax = Math.round(subtotal * taxRate);
    const total = subtotal + tax;
    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
        subtotal,
        tax,
        total,
        totalItemsCount,
        items: cart
    };
}

// Render Cart Page DOM (For cart.html)
function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const summaryContainer = document.getElementById('cart-summary-container');
    if (!container) return;

    const cartSummary = getCartSummary();
    const cart = cartSummary.items;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-state text-center py-5">
                <i class="fas fa-shopping-basket empty-icon text-muted mb-3" style="font-size: 4rem;"></i>
                <h3 class="font-bold mb-2">Your Cart is Empty</h3>
                <p class="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
                <a href="menu.html" class="btn btn-primary btn-lg">
                    <i class="fas fa-utensils mr-2"></i> Browse Menu
                </a>
            </div>
        `;
        if (summaryContainer) {
            summaryContainer.innerHTML = '';
        }
        return;
    }

    // Render Cart Items
    let itemsHtml = `
        <div class="cart-items-list mb-4">
            <div class="d-flex justify-between align-center mb-3">
                <h4 class="font-bold">Cart Items (${cartSummary.totalItemsCount})</h4>
                <button class="btn btn-sm btn-outline text-danger" onclick="clearCart()">
                    <i class="fas fa-trash-alt mr-1"></i> Clear Cart
                </button>
            </div>
    `;

    cart.forEach(item => {
        itemsHtml += `
            <div class="cart-item-card">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'">
                <div class="cart-item-details">
                    <h5 class="cart-item-title">${item.name}</h5>
                    <span class="badge badge-secondary mb-1">${item.category}</span>
                    <div class="cart-item-price">${formatCurrency(item.price)} each</div>
                </div>
                <div class="cart-qty-controls">
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="qty-num">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total font-bold">
                    ${formatCurrency(item.price * item.quantity)}
                </div>
                <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')" title="Remove item">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    });

    itemsHtml += `</div>`;
    container.innerHTML = itemsHtml;

    // Render Cart Summary Sidebar
    if (summaryContainer) {
        summaryContainer.innerHTML = `
            <div class="card summary-card p-4">
                <h4 class="font-bold mb-3">Order Summary</h4>
                <div class="summary-row d-flex justify-between py-2 border-bottom">
                    <span class="text-muted">Subtotal</span>
                    <span class="font-semibold">${formatCurrency(cartSummary.subtotal)}</span>
                </div>
                <div class="summary-row d-flex justify-between py-2 border-bottom">
                    <span class="text-muted">Campus Tax (5%)</span>
                    <span class="font-semibold">${formatCurrency(cartSummary.tax)}</span>
                </div>
                <div class="summary-row d-flex justify-between py-3 font-bold text-lg">
                    <span>Total Amount</span>
                    <span class="text-primary">${formatCurrency(cartSummary.total)}</span>
                </div>
                <a href="checkout.html" class="btn btn-primary btn-block btn-lg mt-3">
                    Proceed to Checkout <i class="fas fa-arrow-right ml-2"></i>
                </a>
                <a href="menu.html" class="btn btn-outline btn-block mt-2">
                    <i class="fas fa-arrow-left mr-2"></i> Continue Ordering
                </a>
            </div>
        `;
    }
}
