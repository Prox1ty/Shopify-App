// react functions
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from "react";

// custom components
import { NavBar } from "./shared/components/index.js";
import CartPage from './pages/CartPage.jsx';
import Footer from './shared/components/Footer.jsx';
import UserRegistration from './pages/UserRegistration.jsx';
import AddProduct from './pages/AddProduct.jsx';

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const Product = lazy(() => import("./components/Product.jsx"));


export default function App() {

  return ( 
    
    // BrowserRouter is named as Router

    <Router>
        <Suspense fallback={<div className="text-center text-2xl mt-10">Loading page files...</div>}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavBar />
          <main style={{ flexGrow: 1 }}>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Products">
                  <Route index element={<Products />} />
                  <Route path=":prodId" element={<Product/>} />
                </Route>
                <Route path= "/Cart" element={<CartPage />} />
                <Route path="/register" element={<UserRegistration />} />
                <Route path="/addProduct" element={<AddProduct />} />
            </Routes>
          </main>
            <Footer />
          </div>
        </Suspense>

    </Router>

    
  );
}
