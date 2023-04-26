import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import FooterLink from "../Footer/FooterLink";
import axiosInstance from "../axiosInstance";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddProductForm() {
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [quantite, setQuantite] = useState(0);
  const [price, setPrice] = useState(0);
  const [categorie, setCategorie] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [description, setDescription] = useState("");
  const navigateTo = useNavigate();

  const [formErrors, setFormErrors] = useState({
    productName: "",
    quantite: "",
    price: "",
    categories: "",
  });

  function generateProductSKU() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let code = "";

    // Ajoute trois lettres aléatoires
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      code += letters[randomIndex];
    }

    // Ajoute trois chiffres aléatoires
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      code += numbers[randomIndex];
    }

    return code;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("quantity", quantite);
    formData.append("price", price);
    formData.append("description", description);
    console.log(categorie);
    formData.append("categoryName", categorie);
    // formData.append("siteName", site);
    formData.append("sku", generateProductSKU());
    if (productImage) {
      formData.append("image", productImage); // Ajoutez l'image avec le bon nom de champ ici
    }
    axiosInstance
      .post("/products/createProduct", formData)
      .then((response) => {
        navigateTo("/Product");
      })
      .catch((error) => {
        console.log("Axios error:", error);
        console.log("Axios error response:", error.response);
        if (error.response && error.response.data) {
          console.log("Erreur: ", error);
          formErrors.message = "Cet produit existe déjà!";
          setFormErrors({ ...formErrors, ...error.response.data.errors });
        }
      });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("Image:", event.target.files[0]);
    if (file) {
      setProductImage(file);
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/categories/")
      .then((Response) => {
        setCategories(Response.data);
      })
      .catch((error) => {
        console.log("Erreur lors de la récupération des catégories :", error);
      });

    //   axiosInstance
    //     .get("/sites/")
    //     .then((Response) => {
    //       setSites(Response.data);
    //     })
    //     .catch((error) => {
    //       console.log("Erreur lors de la récupération des sites :", error);
    //     });
  }, []);
  return (
    <>
      <Navbar />
      <div className="isolate bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl">
          <h3 className="text-xl text-center dark:text-gray-100 font-bold tracking-tight text-gray-800 sm:text-2xl">
            Ajout d'un nouveau produit
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className=" pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="product-name"
                      className="block text-sm dark:text-gray-100 font-medium leading-6 text-gray-900"
                    >
                      Nom du Produit
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="product-name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="block w-full dark:text-gray-400 rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:bg-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-200 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                    >
                      Quantité
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="quantity"
                        value={quantite}
                        onChange={(e) => setQuantite(e.target.value)}
                        className="block w-full dark:bg-gray-900 dark:text-gray-400 text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                    >
                      Prix du produit
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="block dark:bg-gray-900 dark:text-gray-400 text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                    >
                      Catégorie
                    </label>
                    <div className="mt-2">
                      <select
                        name="category"
                        value={categorie}
                        onChange={(e) => setCategorie(e.target.value)}
                        className="block w-full text-center dark:bg-gray-900 dark:text-gray-400 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option> choisir une catégorie</option>
                        {categories.map((category) => (
                          <option key={category?._id} value={category?.name}>
                            {category?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm: col-span-3">
                    <label
                      htmlFor="dropzone-file"
                      className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>

                      <h2 className="mx-3 text-gray-400">Photo du produit</h2>

                      <input
                        id="dropzone-file"
                        type="file"
                        onChange={handleImageChange}
                        className=""
                        name="image"
                      />
                    </label>
                  </div>

                  {/* <div className="sm:col-span-3">
                    <label
                      htmlFor="site"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                    >
                      Site
                    </label>
                    <div className="mt-2">
                      <select
                        name="site"
                        value={site}
                        onChange={(e) => setSite(e.target.value)}
                        className="block w-full text-center dark:bg-gray-900 dark:text-gray-400 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option> choisir une site</option>
                        {sites.map((site) => (
                          <option key={site?._id} value={site?.name}>
                            {site?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <Link to="/Product">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Annuler
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Enregistrer
                  </button>
                </div>
                <p className="mt-10 text-sm leading-6 text-gray-700">
                  Noter que tous les produits enregistrer seront directement
                  stocké dans la base de donnée. Retrouvez le produits saisi à
                  la page produit du tableau de bord
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <FooterLink />
    </>
  );
}
