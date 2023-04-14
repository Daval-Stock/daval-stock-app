import axiosInstance from '../axiosInstance';
import React, { useState, useEffect } from "react";
import Sidebar from '../Sidebar/Sidebar';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiCartAdd } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import FooterLink from '../Footer/FooterLink';

export default function Product() {
  const [product, setProduct] = useState([]);


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

  return (
    <>
    <Sidebar /> 
        <div className="p-4 sm:ml-64">
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
        <FooterLink/>
  </>
  );
};
