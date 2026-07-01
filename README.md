# ⚡ TechNova — Premium Tech E-Commerce Application

**TechNova** is a modern, high-fidelity, industry-style React e-commerce application designed for next-generation electronics shopping. It is styled with premium aesthetics (dark/light themes, smooth transitions, organic fluid gradients, and solid animated vector silhouettes) and fully optimized for responsiveness across desktops, laptops, tablets, and smartphones.

---

## 🚀 Key Features

* 🛒 **Dynamic Variant-Based Pricing**: Prices and struck-through original labels recalculate in real-time as users select different variants (e.g., storage capacity: 128GB, 256GB, 512GB, 1TB; camera kits; or smartwatch band sizes).
* 🌓 **Working Theme Toggle**: Seamlessly transitions between Light Mode (clean light grey background, white cards, dark aqua accents) and Dark Mode (dark grey/slate background, slate card shells, and dark aqua header gradients).
* 🌠 **Animated Auth Panels**: A custom split-screen Login/Register page featuring solid device silhouettes floating in a green-to-cyan neon glowing aura, complete with twinkling stars and a vertical laser scanner effect.
* ⭐ **Cross-Browser Star Rating System**: Bulletproof overlay-based fractional star rating component (cropping filled star masks to the exact decimal value, e.g., 4.6), preventing browser rendering errors.
* ⬆️ **Smooth Go-To-Top Scrolling**: Sticky floating action button in the bottom-right that appears on scroll down, allowing users to scroll back to the top with a single click.
* 📦 **Comprehensive Product Catalog**: Preloaded with 30 detailed tech items representing Mobiles, Laptops, Audio Gear, Cameras, Smartwatches, Gaming, TVs, and Accessories with realistic specs and Indian Rupee (₹) prices.

---

## 🛠️ Tech Stack

* **Core**: React 18, React Router v6, Axios
* **Styling**: Pure CSS (using CSS Custom Properties for theme variables)
* **Iconography**: Lucide React
* **Build System**: Vite (lightning-fast HMR and building)

---

## ⚙️ Local Setup and Installation

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v16+ recommended).

### 2. Install Dependencies
Clone the repository and run:
```bash
npm install
```

### 3. Run Development Server
Start the local server with hot reloading enabled:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the store.

### 4. Build for Production
To package the app for production deployment (output will compile inside the `/dist` directory):
```bash
npm run build
```

---

## 📂 Project Structure

```text
src/
├── components/       # Reusable components (Logo, Navbar, Footer, StarRating, ScrollToTop)
├── config/           # Routes and application configurations
├── data/             # Mock datasets (products, deals, coupons)
├── hooks/            # Custom React hooks (useCart, useWishlist, useTheme, useAuth)
├── layouts/          # Main application layout structure
├── pages/            # Page templates (Auth, Products, Cart, Wishlist, Checkout)
├── services/         # Mock services and data APIs
├── styles/           # Global styles and variable declarations
└── utils/            # Helper utils and formatting constants
```

---

## 👥 Contact Details

* **Developer**: Divakaran
* **Location**: Bengaluru, Karnataka, India
* **Email**: [divakaran45162004@gmail.com](mailto:divakaran45162004@gmail.com)
* **Phone**: +91 93602 00676
