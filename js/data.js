/**
 * CampusBite - College Canteen Management System
 * Initial Preloaded Data & LocalStorage Seeder
 * 1st-Year CSE Project
 */

// Initial Seed Data for Food Items
const INITIAL_FOOD_ITEMS = [
    {
        id: "food_1",
        name: "Masala Dosa",
        description: "Crispy rice crepes stuffed with spiced potato filling, served with fresh coconut chutney and hot sambar.",
        ingredients: "Rice batter, Potato, Mustard seeds, Curry leaves, Spices, Coconut chutney, Sambar",
        category: "Breakfast",
        price: 60,
        rating: 4.8,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_2",
        name: "Veg Burger",
        description: "Juicy vegetable patty layered with crisp lettuce, fresh tomatoes, cheese slice and tangy special sauce.",
        ingredients: "Crispy veg patty, Sesame bun, Cheese slice, Lettuce, Tomato, Onion, Mayo sauce",
        category: "Snacks",
        price: 80,
        rating: 4.5,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_3",
        name: "Cheese Pizza",
        description: "Freshly baked thin-crust pizza topped with rich tomato herb sauce and loads of melted mozzarella cheese.",
        ingredients: "Pizza base, Mozzarella cheese, Tomato sauce, Oregano, Red chili flakes, Bell peppers",
        category: "Snacks",
        price: 120,
        rating: 4.7,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_4",
        name: "Veg Sandwich",
        description: "Grilled whole wheat bread filled with cucumber, tomato, paneer slices and mint chutney.",
        ingredients: "Whole wheat bread, Paneer, Cucumber, Tomato, Mint chutney, Butter, Cheese",
        category: "Breakfast",
        price: 60,
        rating: 4.3,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_5",
        name: "Chowmein",
        description: "Stir-fried wok noodles tossed with crunchy vegetables, soy sauce, and aromatic Chinese spices.",
        ingredients: "Noodles, Cabbage, Carrot, Capsicum, Soy sauce, Vinegar, Garlic, Green chili",
        category: "Lunch",
        price: 90,
        rating: 4.4,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_6",
        name: "Samosa",
        description: "Crispy golden fried pastry filled with spiced potato and peas mash. Served with sweet tamarind chutney.",
        ingredients: "Flour pastry, Spiced potato, Green peas, Cumin, Garam masala, Tamarind chutney",
        category: "Snacks",
        price: 20,
        rating: 4.9,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_7",
        name: "Aloo Paratha",
        description: "North-Indian whole wheat bread stuffed with seasoned mashed potatoes, served hot with fresh curd and butter.",
        ingredients: "Wheat flour, Spiced potatoes, Butter, Fresh curd, Pickle, Coriander",
        category: "Breakfast",
        price: 50,
        rating: 4.6,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_8",
        name: "Chole Bhature",
        description: "Fluffy deep-fried bhaturas served with spicy, tangy chickpea curry, pickled onions and lemon.",
        ingredients: "Chickpeas, All-purpose flour, Spices, Onions, Tomatoes, Pickled chili, Butter",
        category: "Lunch",
        price: 80,
        rating: 4.8,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_9",
        name: "French Fries",
        description: "Crispy golden potato fries seasoned with peri-peri spice blend and served with ketchup.",
        ingredients: "Potatoes, Peri-peri seasoning, Vegetable oil, Salt, Tomato ketchup",
        category: "Snacks",
        price: 70,
        rating: 4.2,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_10",
        name: "Cold Coffee",
        description: "Rich blended espresso iced coffee topped with chocolate syrup, cocoa powder and vanilla ice cream.",
        ingredients: "Espresso, Whole milk, Sugar, Vanilla ice cream, Chocolate syrup, Ice cubes",
        category: "Beverages",
        price: 60,
        rating: 4.9,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_11",
        name: "Lemon Soda",
        description: "Refreshing fizzy soda infused with freshly squeezed lemon juice, black salt and mint leaves.",
        ingredients: "Sparkling soda, Fresh lemon juice, Black salt, Mint leaves, Sugar syrup",
        category: "Beverages",
        price: 30,
        rating: 4.5,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_12",
        name: "Tea",
        description: "Traditional Indian Masala Chai brewed with fresh ginger, cardamom, tea leaves and boiled milk.",
        ingredients: "Tea leaves, Fresh milk, Fresh ginger, Green cardamom, Sugar",
        category: "Beverages",
        price: 15,
        rating: 4.7,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_13",
        name: "Coffee",
        description: "Hot aromatic filter coffee prepared with creamy steamed milk and freshly ground coffee beans.",
        ingredients: "Roasted coffee beans, Hot milk, Sugar, Froth",
        category: "Beverages",
        price: 25,
        rating: 4.6,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_14",
        name: "Gulab Jamun",
        description: "Soft melt-in-mouth milk solid dumplings soaked in cardamom infused warm sugar syrup.",
        ingredients: "Khoya/Milk powder, Flour, Sugar syrup, Rose water, Green cardamom, Pistachios",
        category: "Desserts",
        price: 40,
        rating: 4.9,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_15",
        name: "Veg Momos",
        description: "Steamed Himalayan dumplings stuffed with finely chopped spicy vegetables, served with hot red chili chutney.",
        ingredients: "Flour dough, Cabbage, Onion, Carrot, Garlic, Chili garlic sauce, Vinegar",
        category: "Snacks",
        price: 70,
        rating: 4.5,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_16",
        name: "Idli Sambhar",
        description: "Soft steamed rice crepes served hot with spicy lentil sambhar and fresh coconut chutney.",
        ingredients: "Rice, Urad dal, Sambhar spices, Vegetables, Coconut chutney",
        category: "Breakfast",
        price: 30,
        rating: 4.7,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_17",
        name: "Vada Sambhar",
        description: "Crispy fried lentil donuts soaked in steaming hot aromatic sambhar and served with chutney.",
        ingredients: "Urad dal, Curry leaves, Black pepper, Sambhar, Coconut chutney",
        category: "Breakfast",
        price: 30,
        rating: 4.6,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_18",
        name: "Poha",
        description: "Light flattened rice cooked with mustard seeds, turmeric, green chili, peanuts, and fresh lemon.",
        ingredients: "Flattened rice, Peanuts, Mustard seeds, Curry leaves, Turmeric, Lemon",
        category: "Breakfast",
        price: 20,
        rating: 4.8,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_19",
        name: "Upma",
        description: "Savory semolina porridge seasoned with roasted cashews, mustard seeds, curry leaves, and vegetables.",
        ingredients: "Semolina (Suji), Cashews, Mustard seeds, Vegetables, Ghee",
        category: "Breakfast",
        price: 20,
        rating: 4.4,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_20",
        name: "Paneer Paratha",
        description: "Whole wheat stuffed flatbread with spiced cottage cheese mash, served with curd and pickle.",
        ingredients: "Wheat flour, Fresh Paneer, Spices, Green chili, Butter, Curd",
        category: "Breakfast",
        price: 40,
        rating: 4.9,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_21",
        name: "Bread Pakora",
        description: "Crispy gram flour batter-coated fried bread stuffed with spiced potato filling.",
        ingredients: "Bread slice, Potato mash, Besan flour, Ajwain, Mint chutney",
        category: "Snacks",
        price: 20,
        rating: 4.5,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_22",
        name: "Aloo Tikki",
        description: "Golden crispy shallow-fried potato patties topped with sweet yogurt and tangy chutneys.",
        ingredients: "Potatoes, Cornflour, Spices, Sweet curd, Tamarind chutney, Mint chutney",
        category: "Snacks",
        price: 25,
        rating: 4.7,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_23",
        name: "Pav Bhaji",
        description: "Spiced mashed vegetable curry cooked with butter and served with hot toasted buttered pav buns.",
        ingredients: "Mixed vegetables, Pav bhaji masala, Butter, Onion, Lemon, Bread pav",
        category: "Snacks",
        price: 40,
        rating: 4.9,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_24",
        name: "Veg Spring Roll",
        description: "Crispy fried rolls filled with seasoned shredded vegetables and noodles, served with sweet chili sauce.",
        ingredients: "Spring roll pastry, Cabbage, Carrot, Capsicum, Soy sauce, Chili sauce",
        category: "Snacks",
        price: 40,
        rating: 4.4,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_25",
        name: "Paneer Roll",
        description: "Soft paratha wrap filled with marinated paneer cubes, crisp onions, capsicum, and tangy sauces.",
        ingredients: "Flatbread wrap, Marinated Paneer, Onions, Bell pepper, Mayo, Green chutney",
        category: "Snacks",
        price: 50,
        rating: 4.8,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_26",
        name: "Veg Cutlet",
        description: "Golden breaded vegetable patties stuffed with potato, beetroot, and green peas.",
        ingredients: "Potatoes, Peas, Beetroot, Breadcrumbs, Spices, Tomato ketchup",
        category: "Snacks",
        price: 20,
        rating: 4.3,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_27",
        name: "Cheese Garlic Bread",
        description: "Toasted French baguette spread with garlic butter and loaded with melted mozzarella cheese.",
        ingredients: "Baguette bread, Garlic butter, Mozzarella cheese, Herbs, Chili flakes",
        category: "Snacks",
        price: 50,
        rating: 4.7,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_28",
        name: "Maggi",
        description: "Classic hot masala instant noodles cooked with veggies and signature Maggi tastemaker.",
        ingredients: "Maggi noodles, Tastemaker, Chopped veggies, Butter, Spices",
        category: "Snacks",
        price: 30,
        rating: 4.9,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_29",
        name: "Cheese Maggi",
        description: "Creamy masala Maggi noodles topped with melted cheese slice and grated cheese.",
        ingredients: "Maggi noodles, Processed cheese, Cheese slice, Vegetables, Spices",
        category: "Snacks",
        price: 40,
        rating: 4.9,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_30",
        name: "Paneer Chowmein",
        description: "Stir-fried noodles tossed with soft paneer cubes, crunchy bell peppers, and Indo-Chinese sauces.",
        ingredients: "Noodles, Paneer cubes, Soy sauce, Chili sauce, Vinegar, Vegetables",
        category: "Lunch",
        price: 60,
        rating: 4.6,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_31",
        name: "Veg Fried Rice",
        description: "Aromatic long-grain basmati rice wok-tossed with diced carrots, beans, spring onions, and garlic.",
        ingredients: "Basmati rice, Carrot, Beans, Spring onion, Garlic, Soy sauce",
        category: "Lunch",
        price: 50,
        rating: 4.5,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_32",
        name: "Paneer Fried Rice",
        description: "Flavorful Indo-Chinese wok fried rice loaded with crispy marinated paneer cubes and fresh veggies.",
        ingredients: "Basmati rice, Paneer cubes, Capsicum, Soy sauce, Chili garlic paste",
        category: "Lunch",
        price: 65,
        rating: 4.7,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_33",
        name: "Veg Thali",
        description: "Complete North Indian meal platter featuring Paneer curry, Dal, Rice, 2 Rotis, Curd, Salad, and Sweet.",
        ingredients: "Paneer curry, Dal fry, Basmati rice, Rotis, Curd, Salad, Gulab Jamun",
        category: "Lunch",
        price: 70,
        rating: 4.9,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_34",
        name: "Rajma Rice",
        description: "Classic comfort dish of rich spiced red kidney bean gravy served over steamed basmati rice.",
        ingredients: "Red kidney beans (Rajma), Tomatoes, Spices, Basmati rice, Ghee",
        category: "Lunch",
        price: 50,
        rating: 4.8,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_35",
        name: "Dal Tadka Rice",
        description: "Yellow lentil dal tempered with ghee, cumin, garlic, and dried red chili, served with hot rice.",
        ingredients: "Toor dal, Ghee, Cumin seeds, Garlic, Dried chili, Basmati rice",
        category: "Lunch",
        price: 50,
        rating: 4.7,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_36",
        name: "Veg Biryani",
        description: "Fragrant saffron-infused basmati rice dum-cooked with mixed vegetables, aromatic spices, and mint.",
        ingredients: "Basmati rice, Vegetables, Biryani masala, Saffron milk, Mint leaves, Fried onions",
        category: "Lunch",
        price: 60,
        rating: 4.8,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_37",
        name: "Paneer Butter Masala",
        description: "Rich and creamy tomato-butter gravy with tender cottage cheese cubes, flavored with dried fenugreek.",
        ingredients: "Paneer, Fresh cream, Butter, Tomato puree, Kasuri methi, Spices",
        category: "Lunch",
        price: 70,
        rating: 4.9,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_38",
        name: "Dal Makhani",
        description: "Slow-cooked black lentils and kidney beans simmered overnight with butter, cream, and aromatic spices.",
        ingredients: "Black lentils (Urad), Rajma, Butter, Cream, Garlic, Spices",
        category: "Lunch",
        price: 60,
        rating: 4.8,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_39",
        name: "Butter Naan",
        description: "Soft tandoor-baked leavened flatbread brushed with generous salted butter.",
        ingredients: "All-purpose flour, Butter, Yogurt, Nigella seeds",
        category: "Lunch",
        price: 20,
        rating: 4.6,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_40",
        name: "Roti",
        description: "Traditional whole wheat Indian flatbread cooked fresh on hot tawa.",
        ingredients: "Whole wheat flour, Water, Salt",
        category: "Lunch",
        price: 10,
        rating: 4.5,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_41",
        name: "Mango Shake",
        description: "Thick creamy milkshake made with ripe Alphonso mangoes and topped with chopped nuts.",
        ingredients: "Ripe mango pulp, Whole milk, Sugar, Vanilla ice cream, Almonds",
        category: "Beverages",
        price: 50,
        rating: 4.9,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_42",
        name: "Chocolate Shake",
        description: "Rich decadent chocolate milkshake blended with cocoa, chocolate syrup, and ice cream.",
        ingredients: "Cocoa powder, Dark chocolate syrup, Milk, Vanilla ice cream",
        category: "Beverages",
        price: 60,
        rating: 4.8,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_43",
        name: "Banana Shake",
        description: "Healthy and energizing blend of fresh bananas, cold milk, honey, and cardamom.",
        ingredients: "Ripe bananas, Milk, Honey, Cardamom powder",
        category: "Beverages",
        price: 40,
        rating: 4.6,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_44",
        name: "Fresh Lime Water",
        description: "Refreshing drink made with freshly squeezed lemon, chilled water, cumin, and black salt.",
        ingredients: "Fresh lemon juice, Water, Black salt, Roasted cumin powder, Mint",
        category: "Beverages",
        price: 20,
        rating: 4.5,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: "food_45",
        name: "Lassi",
        description: "Traditional Punjabi sweet chilled yogurt drink topped with a dollop of fresh cream.",
        ingredients: "Fresh curd (Yogurt), Sugar, Cardamom, Malai (Fresh cream)",
        category: "Beverages",
        price: 30,
        rating: 4.8,
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1571006682858-a4c7229d04ff?auto=format&fit=crop&q=80&w=600"
    }
];

// Demo Pre-registered Users
const INITIAL_USERS = [
    {
        id: "user_student_1",
        name: "Rahul Sharma",
        collegeId: "CSE2026-042",
        email: "student@campusbite.com",
        phone: "+91 9876543210",
        password: "student123",
        role: "student"
    },
    {
        id: "user_admin_1",
        name: "Canteen Admin",
        collegeId: "ADMIN-001",
        email: "admin@campusbite.com",
        phone: "+91 9123456789",
        password: "admin123",
        role: "admin"
    }
];

// Initial Seed Orders for demo historical data
const INITIAL_ORDERS = [
    {
        id: "CB20260001",
        userId: "user_student_1",
        userName: "Rahul Sharma",
        collegeId: "CSE2026-042",
        phone: "+91 9876543210",
        items: [
            { id: "food_1", name: "Masala Dosa", price: 60, quantity: 2, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600" },
            { id: "food_10", name: "Cold Coffee", price: 60, quantity: 1, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600" }
        ],
        subtotal: 180,
        tax: 9,
        total: 189,
        pickupMethod: "Pickup from Canteen",
        paymentMethod: "UPI Demo",
        paymentStatus: "Paid",
        status: "Completed",
        createdAt: "2026-09-26T10:30:00.000Z"
    },
    {
        id: "CB20260002",
        userId: "user_student_1",
        userName: "Rahul Sharma",
        collegeId: "CSE2026-042",
        phone: "+91 9876543210",
        items: [
            { id: "food_3", name: "Cheese Pizza", price: 120, quantity: 1, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600" },
            { id: "food_11", name: "Lemon Soda", price: 30, quantity: 2, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600" }
        ],
        subtotal: 180,
        tax: 9,
        total: 189,
        pickupMethod: "Pickup from Canteen",
        paymentMethod: "Cash at Counter",
        paymentStatus: "Pending",
        status: "Preparing",
        createdAt: "2026-09-26T12:15:00.000Z"
    }
];

/**
 * Initialize localStorage with default data if not already set or updated.
 */
function initializeDatabase() {
    const existingFood = localStorage.getItem('foodItems');
    if (!existingFood || JSON.parse(existingFood).length < INITIAL_FOOD_ITEMS.length) {
        localStorage.setItem('foodItems', JSON.stringify(INITIAL_FOOD_ITEMS));
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify(INITIAL_ORDERS));
    }
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Automatically seed DB on script load
initializeDatabase();
