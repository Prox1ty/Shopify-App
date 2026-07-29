// react functions
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from "react";

// materialUI
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.js";

// custom components
import { NavBar } from "./shared/components";
import CartPage from './pages/CartPage.jsx';

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Product = lazy(() => import("./components/Product.jsx"));


export default function App() {

  return ( 
    
    // BrowserRouter is named as Router

    <Router>
        <NavBar />
        <Suspense fallback={<div className="text-center text-2xl mt-10">Loading page files...</div>}>
          <Routes>
              <Route index element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Products">
                <Route index element={<Products />} />
                <Route path=":prodId" element={<Product/>} />
              </Route>
              <Route path= "/Cart" element={<CartPage />} />
          </Routes>
        </Suspense>

    </Router>

    
  );
}
