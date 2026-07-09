import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from "./shared/components/NavBar";
import { lazy, Suspense } from "react";

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
          </Routes>
        </Suspense>

    </Router>

    
  );
}
