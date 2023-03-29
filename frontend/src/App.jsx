import React from "react";
import ConnexionUI from "./Components/Connexion/ConnexionUI.jsx";
import RegisterUI from "./Components/Register/RegisterUI.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import UsersUI from "./Components/Users/UsersUI"


const App = () => {
  const [showNavbar, setShowNavbar] = React.useState(true);
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Sidebar" element={<Sidebar showNavbar={showNavbar}/>} /> 
        <Route path="/ConnexionUI" element={<ConnexionUI/>} />
        <Route path="/RegisterUI" element={<RegisterUI/>} />
        <Route path="/UsersUI" element={<UsersUI/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
};

export default App;
