import React from "react";
import ConnexionUI from "./Components/ConnexionUI.jsx";
import Navbar from "./Components/Navbar.jsx";
import RegisterUI from "./Components/RegisterUI.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";

const App = () => {
  return (
    <div>
      <Navbar />
      <RegisterUI/>
      <Sidebar/>
    </div>
  );
};

export default App;
