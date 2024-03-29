import React from "react";
import { Routes, Route } from "react-router-dom";
import ConnexionUI from "./Components/Connexion/ConnexionUI.jsx";
import LogoutUI from "./Components/Connexion/LogoutUI.jsx";
import RegisterUI from "./Components/Register/RegisterUI.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import Home from "./Components/Home/Home.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import UserProfile from "./Components/Users/UserProfile.jsx";
import Users from "./Components/Users/Users.jsx";
import UpdateUser from "./Components/Users/UpdateUser.jsx";
import About from "./Components/About/About.jsx";
import Services from "./Components/Services/Services.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Articles from "./Components/Articles/Articles.jsx";
import Product from "./Components/Product/Product.jsx";
import Order from "./Components/Order/Order.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import AddProductForm from "./Components/Product/AddProductForm.jsx";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy.jsx";
import Testimonial from "./Components/Testimonial/Testimonial.jsx";
import UpdateProduct from "./Components/Product/UpdateProduct.jsx";
import ProductCard from "./Components/Product/ProductCard.jsx";
import AddSale from "./Components/Sales/AddSale.jsx";
import Sales from "./Components/Sales/Sales.jsx"; 
import SidebarUI from "./Components/Sidebar/SidebarUI.jsx";

import StockStatus from "./Components/Stock_Status/Stock_Status.jsx";
import Trashboard from "./Components/Trashboard/Trashboard.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/ConnexionUI" element={<ConnexionUI />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/LogoutUI" element={<LogoutUI />} />
        <Route path="/RegisterUI" element={<RegisterUI />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/UsersUI" element={<Users />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/UpdateUser" element={<UpdateUser />} />
        <Route path="/AddProductForm" element={<AddProductForm />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/UpdateProduct" element={<UpdateProduct />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/Order" element={<Order />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/Testimonial" element={<Testimonial />} />
        <Route path="/ProductCard" element={<ProductCard />} />

        <Route path="/SidebarUI" element={<SidebarUI />} />
        <Route path="/AddSale" element={<AddSale />} />
        <Route path="/Sales" element={<Sales />} />

        <Route path="/Stock_Status" element={<StockStatus />} />
        <Route path="/Trash" element={<Trashboard />} />
      </Routes>
    </div>
  );
};

export default App;
