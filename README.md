# CampusBite - College Canteen Management System

CampusBite is a web application designed for college canteens. It allows students to browse food menus, add items to a cart, place orders, and track order status in real time. It also features an Admin Dashboard for managing food items, updating order statuses, viewing registered students, and reviewing sales reports.

---

## 🔑 Demo Login Credentials

You can test both student and admin roles using the pre-seeded accounts:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Student** | `student@campusbite.com` | `student123` | Menu, Cart, Checkout, Order Tracking, Profile |
| **Admin** | `admin@campusbite.com` | `admin123` | Food CRUD, Live Order Status Updates, User List, Sales Reports |

---

## ✨ Features

### For Students
- **Browse Today's Menu**: Filter by categories (Breakfast, Lunch, Snacks, Beverages, Desserts), search by food name, and sort by price or rating.
- **Cart & Checkout**: Add/remove items, adjust quantities, calculate taxes (5%), and select pickup and demo payment options.
- **Order Tracking**: Visual 5-step timeline (`Order Placed` ➔ `Confirmed` ➔ `Preparing` ➔ `Ready` ➔ `Completed`) synced with admin updates.
- **Order History & Profile**: View receipt details of past orders and update contact info.

### For Administrators (`/admin/`)
- **Dashboard Overview**: Key metrics (Total Orders, Revenue, Available Dishes) and visual progress charts.
- **Manage Food**: Add new dishes, edit pricing, delete items, or toggle in-stock/out-of-stock availability.
- **Manage Orders**: Update order statuses in real time to update student tracking timelines.
- **Reports & Users**: Search registered student accounts and review sales performance statistics.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Data Storage**: Browser `localStorage` API
- **Design & Icons**: FontAwesome 6, Google Fonts (*Outfit* & *Plus Jakarta Sans*)

> **Note**: Built strictly without external frontend/backend frameworks or database servers as per 1st-year CSE project guidelines.

---

## 📁 Folder Structure

```
canteen-management-web/
├── index.html              # Landing / Home Page
├── login.html              # Student & Admin Login Page
├── register.html           # Student Registration Page
├── menu.html               # Menu Page (Search, Filter, Sort)
├── food-details.html       # Standalone Food Details Page
├── cart.html               # Shopping Cart Page
├── checkout.html           # Checkout Page
├── order-confirmation.html # Receipt & Order Confirmation
├── tracking.html           # Visual Timeline Order Tracking
├── orders.html             # Student Order History
├── dashboard.html          # Student Dashboard
├── profile.html           # Profile Edit Page
├── about.html              # About & 5-Step Process
├── contact.html            # Contact & Canteen Timings
│
├── admin/                  # Admin Management Portal
│   ├── dashboard.html      # Overview & Stats
│   ├── food.html           # Manage Food Items (CRUD)
│   ├── orders.html         # Manage Order Statuses
│   ├── users.html          # Registered Students List
│   └── reports.html        # Sales Reports
│
├── css/                    # Stylesheets
│   ├── style.css           # Global Theme & Components
│   ├── responsive.css      # Responsive Breakpoints
│   └── admin.css           # Admin Dashboard Styles
│
├── js/                     # Application Scripts
│   ├── data.js             # Initial 45 Food Items & Seed Data
│   ├── utils.js            # Toast Notifications & Formatting
│   ├── auth.js             # Login, Register & Access Protection
│   ├── cart.js             # Cart Logic & Totals
│   ├── menu.js             # Dynamic Menu Rendering
│   ├── orders.js           # Checkout & Tracking Logic
│   ├── admin.js            # Admin Operations & Charts
│   └── app.js              # Page Bootstrapper
│
└── vercel.json             # Vercel Deployment Configuration
```

---

## 🚀 How to Run Locally

Simply open `index.html` in any web browser. No installation or setup commands required.

---

## 🌐 How to Deploy to Vercel

1. Import your GitHub repository (`Harshitayd/Canteen-Management-web`) on [vercel.com/new](https://vercel.com/new).
2. Keep the framework preset as **Other**.
3. Click **Deploy**.
