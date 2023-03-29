import React from "react";
import {AiFillCaretRight} from 'react-icons/all';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="justify-center text-center">
      <h1 className="text-center text-blue-600 text-3xl pb-8 pt-10">
        Bienvenue sur l'application de gestion de stock
        <span className="text-center text-gray-700"> Daval Stock</span>
      </h1>
      <Link to="/Sidebar">
      <button type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Aller sur le tableau de bord
            <AiFillCaretRight className="w-5 h-5 ml-2 -mr-1" />
        </button>
      </Link>
        
    </div>
  );
}
