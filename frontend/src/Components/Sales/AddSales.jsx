import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import FooterLink from "../Footer/FooterLink";
import axiosInstance from "../axiosInstance";
import { Link, useNavigate } from "react-router-dom";

export default function Sale() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [search, setSearch] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      productIdentifier: selectedProduct,
      quantity: quantity,
    };

    axiosInstance
      .post("/sales/create", formData)
      .then((response) => {
        navigateTo("/Sales");
      })
      .catch((error) => {
        console.log("Axios error:", error);
        console.log("Axios error response:", error.response);
        if (error.response && error.response.data) {
          console.log("Erreur: ", error);
        }
      });
  };

  useEffect(() => {
    axiosInstance
      .get("/products/all-product")
      .then((Response) => {
        setProducts(Response.data);
      })
      .catch((error) => {
        console.log("Erreur lors de la récupération des produits :", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="isolate bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h3 className="text-xl text-center dark:text-gray-100 font-bold tracking-tight text-gray-800 sm:text-2xl">
            Ajout d'une nouvelle vente
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className=" pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="search"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                    >
                      Chercher par SKU ou Nom
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full text-center dark:bg-gray-900 dark:text-gray-400 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="product"
                      className="block text-sm dark:text-gray-100 font-medium leading-6 text-gray-900"
                    >
                      Produit
                    </label>
                    <div className="mt-2">
                      <select
                        name="product"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="block w-full text-center dark:bg-gray-900 dark:text-gray-400 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option> choisir un produit</option>
                        {products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) || product.sku.toLowerCase().includes(search.toLowerCase())).map((product) => (
                          <option key={product?._id} value={product?.sku}>
                            {product?.name},{product?.sku}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                    >
                      Quantité vendue
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="block w-full text-center dark:bg-gray-900 dark:text-gray-400 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 pb-12">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Ajouter
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <FooterLink />
    </>
  );
}
