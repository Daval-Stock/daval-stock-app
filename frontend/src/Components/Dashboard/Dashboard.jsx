import React from "react";
/* import {
  GrStatusGood,
  GoPackage,
  RiDashboardFill,
  CiUser,
  FiPackage,
  TbFileInvoice,
  BsDatabaseCheck,
} from "react-icons/all.js"; */
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import logoDaval from "../../assets/logoDaval.png";
import alamine from "../../assets/alamine.png";
import FooterLink from "../Footer/FooterLink";
import axiosInstance from "../axiosInstance";
import { useState, useEffect } from "react";
import ProductCard from "../Product/ProductCard";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Utiliser axiosInstance au lieu d'axios
    axiosInstance
      .get("/products/all-product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
    //Télécharger la liste des produits
 
  return (
    <>
      <Sidebar/>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
    
    </>
  );
}
