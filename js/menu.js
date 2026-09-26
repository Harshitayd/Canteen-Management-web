/**
 * CampusBite - Menu & Food Details System
 * Dynamic rendering of Food cards, Search, Filters, Sorting & Food Detail Modal
 */

let currentCategory = 'All';
let searchQuery = '';
let currentSort = 'default';

// Render Food Cards list in menu.html or landing page
function renderMenu(containerId = 'food-grid-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    let foodItems = getStorage('foodItems', []);

    // Filter by Category
    if (currentCategory !== 'All') {
        foodItems = foodItems.filter(item => item.category === currentCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        foodItems = foodItems.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
    }

    // Sorting Logic
    if (currentSort === 'price-low') {
        foodItems.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        foodItems.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
        foodItems.sort((a, b) => b.rating - a.rating);
    }

    if (foodItems.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search-minus text-muted mb-3" style="font-size: 3rem;"></i>
                <h4>No food items found!</h4>
                <p class="text-muted">Try searching with a different keyword or category.</p>
            </div>
        `;
        return;
    }

    let cardsHtml = '';
    foodItems.forEach(item => {
        cardsHtml += createFoodCardHtml(item);
    });

    container.innerHTML = cardsHtml;
}

// Generate single food card HTML template
function createFoodCardHtml(item) {
    const isOut = !item.isAvailable;
    return `
        <div class="food-card ${isOut ? 'out-of-stock-card' : ''}">
            <div class="food-card-img-wrapper" onclick="openFoodDetailsModal('${item.id}')">
                <img src="${item.image}" alt="${item.name}" class="food-card-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'">
                <span class="food-category-tag">${item.category}</span>
                ${isOut ? '<span class="out-badge">Out of Stock</span>' : ''}
            </div>
            <div class="food-card-body">
                <div class="d-flex justify-between align-center mb-1">
                    <h4 class="food-card-title" onclick="openFoodDetailsModal('${item.id}')">${item.name}</h4>
                    <span class="food-card-price">${formatCurrency(item.price)}</span>
                </div>
                <div class="mb-2">
                    ${renderStars(item.rating)}
                </div>
                <p class="food-card-desc mb-3">${item.description.substring(0, 75)}...</p>
                
                <div class="d-flex gap-2">
                    <button class="btn btn-outline btn-sm flex-1" onclick="openFoodDetailsModal('${item.id}')">
                        <i class="fas fa-info-circle mr-1"></i> Details
                    </button>
                    <button class="btn btn-primary btn-sm flex-1" onclick="addToCart('${item.id}')" ${isOut ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus mr-1"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Filter category setup
function setCategoryFilter(category, buttonElement) {
    currentCategory = category;
    
    // Update active class on filter buttons
    const filterBtns = document.querySelectorAll('.category-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    if (buttonElement) {
        buttonElement.classList.add('active');
    }

    renderMenu();
}

// Search input setup
function handleSearchInput(query) {
    searchQuery = query;
    renderMenu();
}

// Sort dropdown setup
function handleSortChange(sortValue) {
    currentSort = sortValue;
    renderMenu();
}

// Food Details Modal Popup
function openFoodDetailsModal(foodId) {
    const foodItems = getStorage('foodItems', []);
    const food = foodItems.find(f => f.id === foodId);

    if (!food) return;

    let modal = document.getElementById('food-detail-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'food-detail-modal';
        modal.className = 'modal-backdrop';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-card">
            <button class="modal-close-btn" onclick="closeFoodDetailsModal()">&times;</button>
            <div class="modal-grid">
                <div class="modal-img-container">
                    <img src="${food.image}" alt="${food.name}" class="modal-food-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'">
                </div>
                <div class="modal-info-container">
                    <span class="badge badge-primary mb-2">${food.category}</span>
                    <h2 class="modal-food-title mb-1">${food.name}</h2>
                    <div class="mb-2">
                        ${renderStars(food.rating)}
                    </div>
                    <div class="modal-price mb-3">${formatCurrency(food.price)}</div>
                    
                    <h5 class="font-bold mb-1">Description:</h5>
                    <p class="text-muted mb-3">${food.description}</p>
                    
                    <h5 class="font-bold mb-1">Key Ingredients:</h5>
                    <p class="text-muted mb-3">${food.ingredients || 'Fresh campus kitchen ingredients'}</p>
                    
                    <div class="mb-3">
                        <span class="font-bold">Availability: </span>
                        ${food.isAvailable ? '<span class="text-success font-semibold"><i class="fas fa-check-circle"></i> In Stock</span>' : '<span class="text-danger font-semibold"><i class="fas fa-times-circle"></i> Out of Stock</span>'}
                    </div>

                    ${food.isAvailable ? `
                        <div class="d-flex align-center gap-3 mb-4">
                            <span class="font-bold">Quantity:</span>
                            <div class="cart-qty-controls">
                                <button class="qty-btn" onclick="changeModalQty(-1)">-</button>
                                <span class="qty-num" id="modal-qty-val">1</span>
                                <button class="qty-btn" onclick="changeModalQty(1)">+</button>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-block btn-lg" onclick="addModalItemToCart('${food.id}')">
                            <i class="fas fa-cart-plus mr-2"></i> Add to Cart
                        </button>
                    ` : `
                        <button class="btn btn-secondary btn-block btn-lg" disabled>
                            Currently Unavailable
                        </button>
                    `}
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeFoodDetailsModal() {
    const modal = document.getElementById('food-detail-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function changeModalQty(delta) {
    const qtyEl = document.getElementById('modal-qty-val');
    if (qtyEl) {
        let current = parseInt(qtyEl.textContent);
        current += delta;
        if (current < 1) current = 1;
        qtyEl.textContent = current;
    }
}

function addModalItemToCart(foodId) {
    const qtyEl = document.getElementById('modal-qty-val');
    const quantity = qtyEl ? parseInt(qtyEl.textContent) : 1;
    addToCart(foodId, quantity);
    closeFoodDetailsModal();
}
