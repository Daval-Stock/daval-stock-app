import axios from "axios";
import React, { useState, useEffect } from "react";
import FooterLink from "../Footer/FooterLink";
import Navbar from "../Navbar/Navbar";

export default function Product() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products/")
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
    {/* <Navbar /> */}
    <div className="">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
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
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {product.map((product) => (
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">
                  <button
                    href="#"
                    className="font-medium rounded-full bg-orange-500 px-4 py-2 text-white dark:text-white hover:underline"
                  >
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FooterLink />
    </div>
  </>
  );
}
