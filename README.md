# Shopify-App

## Overview

A full-stack e-commerce application built to demonstrate modern web development practices. This project showcases a single-page application (SPA) with a React frontend and Node.js backend, featuring centralized state management, reusable components, responsive design, and secure user authentication.

## Description

An interactive e-commerce webpage built with centralized state management, reusable components, and responsive styling. The application allows users to browse products, manage shopping carts, and handle user authentication securely.

## Key Features

- Product browsing and filtering
- Shopping cart management with persistent state
- User registration and authentication
- Responsive design for mobile and desktop
- RESTful API backend
- MongoDB database integration
- Material UI and Tailwind CSS components

## Technologies Used

| Tool | Purpose |
| :----: | :-------: |
| ReactJS | Reusable components and convenient routing |
| Vite | Fast development server and optimized production builds |
| Redux Toolkit | Centralized Products and Cart state for consistent UI updates |
| TailwindCSS | Fast, responsive styling |
| Material UI | Pre-built components and UI framework |
| Express | Backend routing, API endpoints, and request handling |
| Mongoose | ODM for MongoDB database communication |
| Node.js | JavaScript runtime for server-side execution |
| MongoDB | NoSQL database for storing products, users, and orders |

## Project Structure

```
shopify-app-thingy/
├── backend/
│   ├── models/              # MongoDB schemas (User, Product, Order)
│   ├── routes/              # API endpoints
│   ├── middleware/          # Authentication middleware
│   ├── services/            # Business logic
│   ├── public/              # Static files and uploads
│   ├── server.js            # Express server entry point
│   ├── seed-products.js     # Database seeding script
│   └── package.json         # Backend dependencies
├── frontend_root/
│   └── frontend/
│       ├── src/
│       │   ├── components/  # Reusable React components
│       │   ├── pages/       # Page components
│       │   ├── features/    # Redux slices
│       │   ├── shared/      # Shared utilities and components
│       │   ├── app/         # Redux store configuration
│       │   └── main.jsx     # Frontend entry point
│       ├── public/          # Static assets
│       ├── vite.config.js   # Vite configuration
│       ├── eslint.config.js # ESLint rules
│       └── package.json     # Frontend dependencies
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud-based)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Shopify-App
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend_root
npm install
```

### Configuration

Create a `.env` file in the `backend` directory with the following variables:
    MONGODB_CONNECTIONURL=<your-mongodb-connection-string>
    PORT=5000
    JWTSECRET=<your-secret-key>

### Running the Application

**Start the backend server:**
```bash
cd backend
npm start
```
The server will run on `http://localhost:5000`

**Start the frontend development server (in a new terminal):**
```bash
cd frontend_root
npm run dev
```
The frontend will run on `http://localhost:5173` (or as shown in terminal)

### Database Setup

To seed initial product data:
```bash
cd backend
node seed-products.js
```

## API Endpoints

The backend provides the following main endpoints:

- `GET /api/products` - Retrieve all products
- `POST /api/products` - Create a new product (admin)
- `GET /api/users/:id` - Get user details
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/orders` - Retrieve user orders
- `POST /api/orders` - Create a new order

## State Management

Redux Toolkit is used for centralized state management:

- **productSlice**: Manages the global products state
- **cartSlice**: Manages shopping cart items and quantity

This approach ensures consistent state updates across all components and prevents prop drilling.

## Learning Objectives

- Understanding Redux application flow and best practices
- Comparing Redux state management with Context API alternatives
- Implementing backend authentication and authorization
- Working with MongoDB and Mongoose ODM
- Creating RESTful APIs with Express
- Organizing a full-stack application structure

## Future Improvements

- Enhanced product filtering and search
- User profile management
- Order history and tracking
- Admin dashboard
- Email notifications
- Image optimization
- End-to-end testing

## License

This project is open source and available under the MIT License.





