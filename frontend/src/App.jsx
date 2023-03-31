import React from "react";
import ConnexionUI from "./Components/Connexion/ConnexionUI.jsx";
import RegisterUI from "./Components/Register/RegisterUI.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import UsersUI from "./Components/Users/UsersUI"
import Hero from "./Components/Hero/Hero.jsx";
import About from "./Components/About/About.jsx";
import Services from "./Components/Services/Services.jsx";
import Contact from "./Components/Contact/Contact.jsx";


const App = () => {
  const [showNavbar, setShowNavbar] = React.useState(true);
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Sidebar" element={<Sidebar showNavbar={showNavbar}/>} /> 
        <Route path="/ConnexionUI" element={<ConnexionUI/>} />
        <Route path="/RegisterUI" element={<RegisterUI/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/Services" element={<Services/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/UsersUI" element={<UsersUI/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
};

export default App;