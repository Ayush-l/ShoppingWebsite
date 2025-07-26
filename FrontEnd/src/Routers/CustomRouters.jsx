import React from "react";
import Navigation from "../../Customer/Navigation/Navigation.jsx";
import {Routes,Route} from "react-router-dom";
import HomePage from "../../Customer/Components/Pages/HomePage/HomePage.jsx"
import Product from "../../Customer/Components/Product/Product.jsx";
import ProductDetails from "../../Customer/Components/ProductDetails/ProductDetails.jsx";
import Cart from "../../Customer/Components/Cart/Cart.jsx";
import {CheckOut} from "../../Customer/Components/CheckOut/CheckOut.jsx";
import Order from "../../Customer/Components/Order/Order.jsx";
import Footer from "../../Customer/Components/Footer/Footer.jsx";

const CustomRouters = () => {
    return (
        <div>
            <div>
                <Navigation></Navigation>
            </div>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product/>}></Route>
                <Route path="/product" element={<ProductDetails/>}></Route>
                <Route path="/checkout" element={<CheckOut/>}></Route>
                <Route path="/account/order" element={<Order/>}></Route>
            </Routes>
            <div>
                <Footer></Footer>
            </div>

        </div>
    );
}

export default CustomRouters;