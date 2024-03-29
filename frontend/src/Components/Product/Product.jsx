import axiosInstance from "../axiosInstance";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

import Container from "../Container";
import Layout from "../Layout";
import Loader from "../Loader";
import { getAllProducts } from "./../../api/products";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (id, name) => {
    let choice = confirm("Vous êtes sûr de vouloir supprimer " + name + "?");
    console.log(choice);
    if (choice) {
      axiosInstance
        .delete("products/delete/" + id)
        .then((response) => {
          console.log("Le produit a été supprimé!");
          setProducts(products.filter((product) => product.id !== id));
          setForceUpdate((prev) => !prev);
        })
        .catch((error) => {
          console.log("Axios error:", error);
          console.log("Axios error response:", error.response);
        });
    } else {
      console.log("Action annulé!");
    }
  };

  useEffect(() => {
    // Utiliser axiosInstance au lieu d'axios
    async function fetchData() {
      const { data, error } = await getAllProducts();
      if (data) {
        setProducts(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="mb-4">
              <h1 className="text-white text-3xl font-semibold">Produits</h1>
            </div>
            <div className="flex items-center justify-between pb-4">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div>
                <Link to="/AddProductForm">
                  <button
                    className="inline-flex items-center text-blue-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-2 text-blue-600 dark:text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    Ajouter un Produit
                  </button>
                </Link>
              </div>
            </div>
            <table className="w-full rounded-lg text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-center text-gray-900 uppercase  bg-blue-300 dark:bg-gray-700 dark:text-white">
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
                      Date d'expiration
                    </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Site
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((p) =>
                    p.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
              
                    <tr
                      key={item._id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-blue-0"
                    >
                      <th
                        scope="row"
                        id=""
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.name}
                      </th>
                      <td className="px-6 py-4 text-center">{item.category}</td>
                      <td className="px-6 py-4 text-center">{item.quantity}</td>
                      <td className="px-6 py-4 text-center">{item.price}</td>
                      <td className="px-6 py-4 text-center">{item.ExpirationDate?
                       new Date(item?.ExpirationDate).toLocaleDateString(): " "}</td>
                      <td className="px-6 py-4 text-center">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 text-center">{item?.site}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-4">
                          <button className="text-gray-600 text-xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item?._id, item?.name)}
                            className="text-red-500 text-xl"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
}
