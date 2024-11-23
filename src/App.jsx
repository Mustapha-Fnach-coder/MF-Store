
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import HeroSlider from './components/layouts/Hero'
import Allproducts from "./components/products/AllProducts";
import Products from './components/products/Products'
import Aventages from "./components/layouts/Aventage";
import CartProvider from "./components/context/cartcontexte";
import Dashboard from "./admin/dashboard";
import AllPr from "./components/products/ALLpr";
import CartPage from "./components/cart/cart";

import ProductDetails from "./components/products/ProductDetails";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <CartProvider>
        
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSlider />
                <Products />
                <Allproducts />
                <Aventages />
              </>
            }
          />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path="/allproducts" element={<AllPr />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          


        </Routes>
        
      </CartProvider>
    </Router>
  );
}
export default App;

