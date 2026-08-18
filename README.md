<div align="center">

# ✨ PocketGlow Essentials ✨
### *Your Everyday Glow, Packed in Single-Use Sachets.*

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br />

> **PocketGlow Essentials** is a modern, high-conversion full-stack e-commerce web application engineered for premium single-use sachet skincare products. Designed with glassmorphism aesthetics, fluid micro-interactions, dark/light theme persistence, dynamic shopping cart, JWT authentication, wishlist, and an Express + MongoDB REST API backend with auto-fallback capabilities.

[**View Live Demo**](#) • [**Explore API**](#-api-endpoints) • [**Deploy to Vercel**](#-deploying-to-vercel)

---

</div>

<br />

## 🌟 Highlights & Key Features

<table>
  <tr>
    <td width="50%">
      <h3>🛍️ Premium E-Commerce Storefront</h3>
      <ul>
        <li><b>Dynamic Catalog:</b> Instant category filtering (Serums, Creams, Lip Care, Kits) and multi-field sorting.</li>
        <li><b>Product Detail View:</b> High-resolution image galleries, ingredient accordion specs, and quick add-to-cart.</li>
        <li><b>Slide-out Cart & Checkout:</b> Instant quantity updates, order summary calculations, and free shipping progress tracker.</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🔐 Authentication & User Account</h3>
      <ul>
        <li><b>Secure JWT Auth:</b> User signup, login, persistent sessions, and secure cookie handling.</li>
        <li><b>User Profile:</b> Manage shipping details, view past orders, and control personal settings.</li>
        <li><b>Wishlist System:</b> One-tap sachet saving with persistent sync.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🎨 Modern UX & Aesthetics</h3>
      <ul>
        <li><b>Dark & Light Modes:</b> Automatic system theme detection with manual toggle and localStorage state persistence.</li>
        <li><b>Glassmorphic UI:</b> Tailored gradient overlays, crisp typography, and micro-animations built with Tailwind CSS v4 & Radix UI.</li>
        <li><b>Mobile-First & Responsive:</b> Seamless experience across Desktop, Tablet, and Mobile.</li>
      </ul>
    </td>
    <td width="50%">
      <h3>⚡ Robust Architecture & Resiliency</h3>
      <ul>
        <li><b>Backend Fallback:</b> Gracefully falls back to cached sachet data if the MongoDB API is offline.</li>
        <li><b>One-Command Root Dev:</b> Start both Frontend and Backend concurrently with <code>npm run dev</code>.</li>
        <li><b>Zero-Config Vercel Ready:</b> Includes pre-configured <code>vercel.json</code> rewrite rules.</li>
      </ul>
    </td>
  </tr>
</table>

<br />

---

## 🛠️ Tech Stack & Frameworks

### **Frontend Stack**
- **Core Library:** React 19 SPA
- **Bundler:** Vite 7 with TypeScript
- **Routing:** TanStack Router v1
- **State & Data Fetching:** TanStack Query v5 + Axios
- **Styling:** Tailwind CSS v4, Radix UI Primitives, Lucide Icons
- **Notifications:** Sonner Toast Notifications

### **Backend Stack**
- **Runtime:** Node.js (v20+)
- **Framework:** Express.js 4
- **Database:** MongoDB with Mongoose 8 ORM
- **Security & Auth:** JSON Web Tokens (JWT), bcryptjs password hashing, Cookie-Parser, CORS

---

## 📁 Project Structure

```
pocketglow-essentials/
├── 📄 package.json             # Root monorepo manager (runs both services concurrently)
├── 📄 vercel.json               # Vercel zero-config SPA deployment rules
├── 📄 README.md                 # Project documentation
│
├── 📂 frontend/                # React 19 SPA
│   ├── 📄 vercel.json          # Frontend SPA fallback rewrite configuration
│   ├── 📄 vite.config.ts       # Vite build & bundle configuration
│   ├── 📂 src/
│   │   ├── 📂 components/     # Radix UI + Custom UI components (Cart, Navbar, Footer, Cards)
│   │   ├── 📂 routes/         # TanStack file-based page routes (Home, Shop, Product Detail, Checkout)
│   │   ├── 📂 lib/            # Axios API services & helpers
│   │   └── 📂 styles/         # Global styles & Tailwind design tokens
│   └── 📂 public/             # Static assets & product images
│
└── 📂 backend/                 # REST API Server
    ├── 📄 .env.example         # Environment template
    ├── 📂 src/
    │   ├── 📂 config/          # MongoDB Mongoose database connection
    │   ├── 📂 controllers/     # Auth, Product, Cart, Wishlist, Order handlers
    │   ├── 📂 models/          # Product, User, Order, Cart Mongoose schemas
    │   ├── 📂 routes/          # Express API route definitions
    │   └── 📂 utils/           # Database seeder script & helpers
```

<br />

---

## 🚀 Quick Start Guide

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) (v10 or higher)
- [MongoDB](https://www.mongodb.com/) (Running locally on `mongodb://localhost:27017` or MongoDB Atlas URI)

### **1. Clone the Repository**
```bash
git clone https://github.com/YOUR_USERNAME/pocketglow-essentials.git
cd pocketglow-essentials
```

### **2. Install Dependencies**
```bash
# Install root dependencies as well as subpackages
npm run install:all
```

### **3. Configure Environment Variables**

Create `backend/.env` file:
```env
PORT=5005
MONGO_URI=mongodb://localhost:27017/pocketglow
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
ADMIN_SECRET_KEY=admin_secret_123
```

Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5005/api
```

### **4. Seed the Database**
Populate MongoDB with sample skincare sachets and kits:
```bash
npm run seed
```

### **5. Run Development Server**
Launch both Backend API and Frontend App concurrently with a single command:
```bash
npm run dev
```
- 🌐 **Frontend App:** `http://localhost:5173`
- ⚙️ **Backend API:** `http://localhost:5005`

<br />

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | User login & JWT token generation | ❌ |
| `GET` | `/api/auth/logout` | Clear session cookie | ❌ |
| `GET` | `/api/auth/profile` | Retrieve current user profile | 🔒 |
| `GET` | `/api/products` | Get list of all products (optional `?category=`) | ❌ |
| `GET` | `/api/products/:id` | Get details for a single product | ❌ |
| `POST` | `/api/products` | Create a new product | 🛡️ Admin |
| `PUT` | `/api/products/:id` | Update product details | 🛡️ Admin |
| `DELETE` | `/api/products/:id` | Remove a product | 🛡️ Admin |
| `GET` | `/api/cart` | Get user cart items | 🔒 |
| `POST` | `/api/cart` | Add item to user cart | 🔒 |
| `PUT` | `/api/cart/:productId` | Update cart item quantity | 🔒 |
| `DELETE` | `/api/cart/:productId` | Remove item from cart | 🔒 |
| `GET` | `/api/wishlist` | Get user wishlist | 🔒 |
| `POST` | `/api/wishlist` | Toggle product in wishlist | 🔒 |
| `POST` | `/api/orders` | Create an order | 🔒 |
| `GET` | `/api/orders` | Get current user's order history | 🔒 |

<br />

---

## 🚢 Deploying to Vercel

### **Frontend Deployment on Vercel**
1. Push your repository to **GitHub**.
2. Connect your repo on [Vercel Dashboard](https://vercel.com/).
3. Set **Framework Preset** to `Vite`.
4. Set **Root Directory** to `./` (or `frontend`).
5. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-api.onrender.com/api` (or your backend URL)
6. Deploy! The included `vercel.json` ensures SPA route rewrites work perfectly.

### **Backend Deployment (Render / Railway / Fly.io)**
1. Deploy the `backend` folder to Render or Railway.
2. Set Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas Connection String
   - `JWT_SECRET`: Secret Key
   - `CLIENT_URL`: `https://your-frontend.vercel.app`
3. Set Start Command to `node src/server.js`.

<br />

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <sub>Built with ❤️ for skincare lovers everywhere.</sub>
</div>
