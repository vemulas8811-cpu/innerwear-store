# Cloth Innerwear Store

A full-stack e-commerce application for browsing and purchasing innerwear products. Built with React, Node.js, Express, and MySQL.

## Project Overview

This application allows users to view a list of innerwear products, sort them by price, add items to a cart, and view their cart with calculated totals including GST.

## Tech Stack

- **Frontend**: React 19, Vite, Axios, React Router DOM
- **Backend**: Node.js, Express.js, MySQL2, CORS, dotenv
- **Database**: MySQL

## Features

- Product listing with images, names, prices, and descriptions
- Price sorting (Low to High / High to Low)
- Add to cart functionality with instant cart count updates
- Cart page with item details, quantities, and removal options
- Order summary with subtotal, GST (18%), and total calculation
- Responsive design for mobile and desktop
- Clean, modern UI without external UI libraries

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

### Database Setup

1. Install and start MySQL Server
2. Create a database named `cloth_app`
3. Run the SQL script to create tables and seed data:
   ```bash
   mysql -u root -p cloth_app < backend/schema.sql
   ```
   (Update the username/password in the command if different from root/no password)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `.env` file with your MySQL credentials (default provided)
4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## API Endpoints

- `GET /api/products?sort=asc|desc` - Get all products with optional sorting
- `POST /api/cart` - Add item to cart (body: {product_id, quantity})
- `GET /api/cart` - Get cart items with product details
- `DELETE /api/cart/:id` - Remove item from cart

## Folder Structure

```
cloth/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── CartPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── styles.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/
│   ├── controllers/
│   │   ├── productsController.js
│   │   └── cartController.js
│   ├── routes/
│   │   ├── products.js
│   │   └── cart.js
│   ├── models/
│   │   └── db.js
│   ├── config/
│   ├── server.js
│   ├── .env
│   ├── schema.sql
│   └── package.json
└── README.md
```

## Why React, Node.js, and MySQL?

- **React**: Provides a component-based architecture for building interactive UIs efficiently. React's virtual DOM and hooks make it ideal for dynamic web applications like e-commerce sites.
- **Node.js & Express**: JavaScript full-stack allows for consistent language across frontend and backend, improving developer productivity. Express provides a lightweight framework for building REST APIs quickly.
- **MySQL**: A robust, widely-used relational database that handles structured data well. It's reliable for e-commerce applications requiring ACID transactions and complex queries.

## How to Improve This Project Further

1. **Authentication & Authorization**: Add user registration/login with JWT tokens
2. **Payment Integration**: Integrate with payment gateways like Stripe or PayPal
3. **Product Search & Filtering**: Add search bar and category filters
4. **Inventory Management**: Track stock levels and prevent overselling
5. **Order History**: Store and display past orders
6. **Admin Panel**: Dashboard for managing products and orders
7. **Image Upload**: Allow admins to upload product images
8. **Caching**: Implement Redis for session and data caching
9. **Testing**: Add unit and integration tests
10. **Deployment**: Set up CI/CD pipeline and deploy to cloud platforms

## Debugging Frontend & Backend Issues

### Frontend Debugging

- Use browser developer tools (F12) to inspect elements, console logs, and network requests
- Check the Network tab for failed API calls and response details
- Use React Developer Tools extension to inspect component state and props
- Add `console.log` statements in components to track data flow
- Verify API base URL in `services/api.js` matches backend port

### Backend Debugging

- Check server console for error messages and database connection status
- Use tools like Postman to test API endpoints manually
- Verify environment variables in `.env` file
- Check MySQL server status and credentials
- Use `console.log` in controllers to debug request/response data
- Ensure CORS is properly configured for frontend requests

### Common Issues

- **CORS errors**: Ensure backend has `app.use(cors())` and correct origins
- **Database connection**: Verify MySQL is running and credentials are correct
- **Port conflicts**: Check if ports 5000 (backend) and 5173 (frontend) are available
- **Module not found**: Run `npm install` in both directories
- **API 404 errors**: Ensure routes are correctly defined and server is running

## Production Considerations

- Use environment-specific configurations
- Implement proper error handling and logging
- Add input validation and sanitization
- Use HTTPS in production
- Implement rate limiting and security headers
- Optimize images and bundle size
- Set up monitoring and alerts
