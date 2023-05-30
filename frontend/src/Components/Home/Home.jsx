import React, { useContext } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

import UserProfile from "../Users/UserProfile";
import UserContext from "../Users/UserContext";
import Search from "../Search/Search";
import Container from "../Container";
import Layout from "../Layout";

export default function Home() {
  const userProfile = useContext(UserContext);
  return (
    <Layout>
      <Container className="flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-semiBold tracking-tight text-gray-900 dark:text-gray-300 sm:text-6xl">
            Bienvenue sur l'application Daval Stock
          </h1>
        </div>
        <div className="w-96">
          <Search />
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/Dashboard"
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Aller sur le Tableau de Bord
          </Link>
          <Link
            to="/Testimonial"
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Formulaire des Produits
          </Link>
          <Link
            to="/SidebarUI"
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Formulaire des Produits
          </Link>
        </div>
      </Container>
    </Layout>
  );
}
