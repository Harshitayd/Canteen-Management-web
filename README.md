# CampusBite - College Canteen Management System

> **1st-Year CSE College Project**  
> A complete, modern, and responsive frontend web application built strictly using **HTML5, CSS3, and Vanilla JavaScript**.

---

## 📌 Project Overview
**CampusBite** is a web-based smart canteen management system designed specifically for college campuses. It allows students to browse the daily canteen menu, filter/search food items, manage a shopping cart, place food orders with cash/UPI demo options, and track the live preparation status on a visual step timeline. 

It also includes a full-featured **Admin Dashboard** for canteen staff to manage food inventory, update order statuses in real-time, view registered students, and inspect performance analytics.

---

## 🛠️ Technology Stack
- **HTML5**: Semantic web architecture (`header`, `main`, `aside`, `footer`, `section`, `table`, etc.)
- **CSS3**: Modern styling with CSS variables, Flexbox, Grid, Glassmorphic cards, smooth animations, and custom progress charts.
- **Vanilla JavaScript (ES6+)**: Dynamic DOM manipulation, state management, search/filter algorithms, and custom event handlers.
- **LocalStorage API**: Browser-based persistent database storing food items, active cart state, user accounts, and historical orders.
- **FontAwesome & Google Fonts**: Icons (`FontAwesome 6.4`) and modern typography (`Outfit` & `Plus Jakarta Sans`).

> ⛔ **Strict Constraints Enforced:** No React, Angular, Vue, Node.js, Express, PHP, Python, MongoDB, MySQL, Firebase, Bootstrap, Tailwind, or external Chart libraries were used.

---

## 🚀 Key Features

### 👨‍🎓 Student Portal
1. **Interactive Landing Page**: Hero banner, feature highlights, popular dishes, student reviews, and contact call-to-action.
2. **Dynamic Food Menu (`menu.html`)**:
   - Live instant search ("Search food...")
   - Category filtering (All, Breakfast, Lunch, Snacks, Beverages, Desserts)
   - Sorting by Price (Low/High) & Rating
   - Quantity selector & Quick-view modal dialog
3. **Shopping Cart (`cart.html`)**:
   - Add/Remove items, update quantities
   - Live tax (5%) & subtotal calculation
   - Automatic navbar badge updates
4. **Checkout & Order Creation (`checkout.html`)**:
   - Customer detail validation
   - Fulfillment pickup options
   - Cash at Counter & Demo UPI payment methods
5. **Receipt & Visual Order Tracking (`tracking.html`)**:
   - Auto-generated unique order ID (`CB20260001`)
   - Interactive 5-step visual timeline: `Order Placed ➔ Order Confirmed ➔ Preparing ➔ Ready for Pickup ➔ Completed`
   - Real-time status sync with Admin updates
6. **Student Account & Order History (`orders.html` & `profile.html`)**:
   - Filter past orders by status
   - Editable student profile information saved in browser

### 👨‍🍳 Admin Portal (`/admin/`)
1. **Admin Overview Dashboard (`admin/dashboard.html`)**:
   - Key metric cards: Total Orders, Today's Orders, Total Revenue, Available Foods, Registered Students
   - Pure HTML/CSS progress bar charts & status summary boxes
2. **Food Item CRUD Management (`admin/food.html`)**:
   - Add new food items, edit existing items, delete with confirmation popups
   - Instant toggle for In-Stock / Out-of-Stock status
3. **Order Management Table (`admin/orders.html`)**:
   - Status selector dropdown (`Pending`, `Confirmed`, `Preparing`, `Ready`, `Completed`, `Cancelled`)
   - Instant sync with Student tracking timeline
4. **Student Directory (`admin/users.html`)**: Search student accounts and order statistics.
5. **Reports & Analytics (`admin/reports.html`)**: Total revenue, fulfillment rates, and top-selling food calculation.

---

## 📁 Project Folder Structure

```
canteen-management-web/
│
├── index.html                  # Landing Page / Home
├── login.html                  # Student / Admin Login Page
├── register.html               # Student Registration Page
├── menu.html                   # Food Menu with Search & Category Filters
├── food-details.html           # Standalone Food Details Page
├── cart.html                   # Shopping Cart Page
├── checkout.html               # Order Checkout & Payment Method Page
├── order-confirmation.html     # Order Confirmation Receipt Page
├── tracking.html               # Visual Step Timeline Order Tracking Page
├── orders.html                 # Student Order History Page
├── dashboard.html              # Student Dashboard Page
├── profile.html               # Student Profile Edit Page
├── about.html                  # Canteen Story & 5-Step How-It-Works Page
├── contact.html                # Contact Form & Canteen Timings Page
│
├── admin/
│   ├── dashboard.html          # Admin Main Dashboard (Metrics & Charts)
│   ├── food.html               # Admin Food Inventory Management (CRUD)
│   ├── orders.html             # Admin Order Status Management Table
│   ├── users.html              # Registered Students List & Search
│   └── reports.html            # Sales Reports & Revenue Analytics
│
├── css/
│   ├── style.css               # Main Global CSS variables & UI components
│   ├── responsive.css          # Responsive Breakpoints (Desktop, Tablet, Mobile)
│   └── admin.css               # Admin Sidebar, Stat Cards, and Custom Charts
│
├── js/
│   ├── data.js                 # Initial 15+ Food Items & Demo Users Database Seeder
│   ├── utils.js                # Helpers: Toast Notifications, Formats, Nav Updates
│   ├── auth.js                 # Login, Register, Logout & Role Protection Guards
│   ├── cart.js                 # Cart State, Quantity & Summary Calculations
│   ├── menu.js                 # Food Card Rendering, Filters, Search & Modal
│   ├── orders.js               # Order Placement, Confirmation & Tracking Timeline
│   ├── admin.js                # Admin Stats, Pure CSS Charts & Food CRUD Logic
│   └── app.js                  # Master Application Bootstrapper & Router
│
└── README.md                   # Project Documentation
```

---

## 🔑 Demo Login Credentials

You can test both student and admin user roles immediately:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Student** | `student@campusbite.com` | `student123` | Student Dashboard, Orders, Tracking, Profile |
| **Admin** | `admin@campusbite.com` | `admin123` | Admin Dashboard, Food CRUD, Order Statuses, Reports |

*Note: You can also register a brand new student account on `register.html`.*

---

## 🍱 Preloaded 45 Food Items
Includes popular campus meals across **Breakfast**, **Lunch**, **Snacks**, **Beverages**, and **Desserts**:
- **Breakfast**: Masala Dosa (₹60), Veg Sandwich (₹60), Aloo Paratha (₹50), Idli Sambhar (₹30), Vada Sambhar (₹30), Poha (₹20), Upma (₹20), Paneer Paratha (₹40).
- **Snacks**: Veg Burger (₹80), Cheese Pizza (₹120), Samosa (₹20), French Fries (₹70), Veg Momos (₹70), Bread Pakora (₹20), Aloo Tikki (₹25), Pav Bhaji (₹40), Veg Spring Roll (₹40), Paneer Roll (₹50), Veg Cutlet (₹20), Cheese Garlic Bread (₹50), Maggi (₹30), Cheese Maggi (₹40).
- **Lunch**: Chowmein (₹90), Chole Bhature (₹80), Paneer Chowmein (₹60), Veg Fried Rice (₹50), Paneer Fried Rice (₹65), Veg Thali (₹70), Rajma Rice (₹50), Dal Tadka Rice (₹50), Veg Biryani (₹60), Paneer Butter Masala (₹70), Dal Makhani (₹60), Butter Naan (₹20), Roti (₹10).
- **Beverages**: Cold Coffee (₹60), Lemon Soda (₹30), Tea (₹15), Coffee (₹25), Mango Shake (₹50), Chocolate Shake (₹60), Banana Shake (₹40), Fresh Lime Water (₹20), Lassi (₹30).
- **Desserts**: Gulab Jamun (₹40).

---

## 💻 How to Run the Project

1. **No Installation Required!**
2. Simply open `index.html` directly in any standard browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari).
3. Alternatively, serve using any local static HTTP server:
   - VS Code extension: **Live Server**
   - Node: `npx http-server ./`
   - Python: `python -m http.server 8000`

---

## ⚡ Limitations of Frontend-Only Architecture

As this is a **1st-Year CSE Educational Project** designed strictly without backend servers or databases:
1. **LocalStorage Scope**: Data is stored inside the browser's `localStorage`. Data modified in one browser window/tab will sync across that browser session.
2. **Demo Payments**: Payment methods (UPI Demo) simulate a payment flow and do not process real credit card or bank transactions.
3. **Authentication**: Credentials are verified locally in JavaScript against stored user objects.
