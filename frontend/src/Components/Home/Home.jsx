import React, {useContext } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import UserProfile from '../Users/UserProfile';
import UserContext from '../Users/UserContext';
import Search from "../Search/Search";


export default function Home() {
  const userProfile = useContext(UserContext);
  return (
    
    <>
      <Navbar/>
      <div className="bg-white dark:bg-gray-900">
        <div className="relative isolate px-6 pt-8 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-3xl py-30 sm:py-16 lg:py-50 ">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <img src="" alt="" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-semiBold tracking-tight text-gray-800 sm:text-5xl dark:text-gray-200">
                Bienvenue {<UserProfile />} <br /> sur l'application Daval Stock
              </h1>
              <div>
                <Search/>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>
          
        </h1>
      </div>
      
      <Footer />
    </>
  );
}
