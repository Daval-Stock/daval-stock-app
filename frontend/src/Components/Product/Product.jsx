import axiosInstance from '../axiosInstance';
import React, { useState, useEffect } from "react";
import Sidebar from '../Sidebar/Sidebar';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiCartAdd } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Product() {
  const [product, setProduct] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // Vérification de l'état de connexion de l'utilisateur
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if(userLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    // Utiliser axiosInstance au lieu d'axios
    axiosInstance
      .get("/products/all-product")
      .then((response) => {
        setProduct(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Affichage conditionnel en fonction de l"état de connexion
  if (!isLoggedIn) {
    return(
      <>
        <Sidebar/>
        <div className="p-4 sm:ml-64 bg-gray-800">
            <div className="p-4 border-2 border-blue-300 border-dashed rounded-lg dark:border-gray-700 mt-14">
              <div className="items-center justify-between m-10">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-900 uppercase  bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nom du produit
                </th>
                <th scope="col" className="px-6 py-3">
                  Categories
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantité
                </th>
                <th scope="col" className="px-6 py-3">
                  Prix
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {product.map((product) => (
                <tr key={product._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row" id=""
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4 text-center">{product.category}</td>
                  <td className="px-6 py-4 text-center">{product.quantity}</td>
                  <td className="px-6 py-4 text-center">{product.price}</td>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex">
                      <Link to="/AddProductForm">
                        <button className="text-blue-600 text-2xl mr-2">
                          <BiCartAdd/>
                        </button>
                      </Link>
                      <button className="text-gray-600 text-xl mr-2">
                        <FiEdit/>
                      </button>
                      <button className="text-red-500 text-xl">
                        <RiDeleteBinLine/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
                </div>
              </div>
            </div>
          </div>
      </>
    )
  } else{
    return (
      <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-red-500 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="items-center justify-between m-10">
              <div className="relative overflow-x-auto text-center">
              <h1 className="text-2xl uppercase font-bold text-red-500">Connexion Requise</h1>
              <p className="text-gray-600 pb-8 pt-4 text-xl">Veuillez vous connecter pour voir la liste des produits</p>
              <Link to="/ConnexionUI">
                <button type="submit" className="px-6 py-3 text-sm font-medium  text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Se connecter
                </button>
              </Link>
              
              </div>
            </div>
          </div>
        </div>
  
    </>
    );
  }
  
};
