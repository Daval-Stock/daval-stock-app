import React from "react";
import ConnexionUI from "./Components/Connexion/ConnexionUI.jsx";
import RegisterUI from "./Components/Register/RegisterUI.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import Users from "./Components/Users/Users.jsx"
import About from "./Components/About/About.jsx";
import Services from "./Components/Services/Services.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Articles from "./Components/Articles/Articles.jsx";
import Product from "./Components/Product/Product.jsx";
import Order from "./Components/Order/Order.jsx";

const App = () => {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Sidebar" element={<Sidebar/>} /> 
        <Route path="/ConnexionUI" element={<ConnexionUI/>} />
        <Route path="/RegisterUI" element={<RegisterUI/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/Services" element={<Services/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/UsersUI" element={<Users/>} />
        <Route path="/Product" element={<Product/>} />
        <Route path="/Articles" element={<Articles/>} />
        <Route path="/Order" element={<Order/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
};

export default App;