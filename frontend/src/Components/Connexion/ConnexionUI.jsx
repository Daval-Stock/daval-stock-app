import React, { useState } from "react";
import axiosInstance from '../axiosInstance';
import { Link } from "react-router-dom";
import logoDaval from "../../assets/logoDaval.png";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import FooterLink from "../Footer/FooterLink";

export default function ConnexionUI() {
  // State pour stocker les valeurs du formulaire et les erreurs
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const navigateTo = useNavigate();
  

  // Fonction de validation qui vérifie si les champs requis sont remplis et retourne un objet contenant les erreurs s'il y en a
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formValues.email) {
      errors.email = "L'adresse e-mail est requise";
      isValid = false;
    }

    if (!formValues.password) {
      errors.password = "Le mot de passe est requis";
      isValid = false;
    }
    console.log(errors);
    setFormErrors(errors);
    return isValid;
  };

  // Fonction appelée lorsque le formulaire est soumis
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Envoyer les données du formulaire au serveur
      axiosInstance
        .post("users/login", { email: formValues.email, password: formValues.password })
        .then((response) => {
          // Traitement de la réponse du serveur
          console.log(response.data);
          const token = response.data.token;
          localStorage.setItem('authToken', token);
          navigateTo('/');
        })
        .catch((error) => {
    let errors = {};

          errors.serverError = "Email ou mot de passe incorrect";
          setFormErrors(errors);
  console.log("Axios error: ", error);
  console.log("Axios error response: ", error.response);
});
    }
  };

  // Fonction pour mettre à jour les valeurs du formulaire en fonction de l'entrée de l'utilisateur
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  return (
    <>
      <Navbar />
      <div className="relative isolate px-6 pt-32 pb-32 lg:px-16 dark:bg-gray-900">
        <div
          className="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg drop-shadow-md dark:bg-gray-900">
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <Link to="/">
                <img className="w-auto h-7 sm:h-8" src={logoDaval} alt="" />
              </Link>
            </div>

            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
              Se connecter
            </h3>

            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
              en seulement deux clics
            </p>
            {formErrors.serverError}
            <form onSubmit={handleSubmit}>
              <div className="w-full mt-4">
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                  name="email"
                  placeholder="Adresse Email"
                  aria-label="Email Address"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && <span>{formErrors.email}</span>}
              </div>

              <div className="w-full mt-4">
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                  name="password"
                  placeholder="Mot de Passe"
                  aria-label="Password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                {formErrors.password && <span>{formErrors.password}</span>}
              </div>

              <div className="flex items-center justify-between mt-4">
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
                >
                  Mot de Passe oublié ?
                </a>
                  <button type="submit" className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Connexion
                  </button>                
              </div>
            </form>
          </div>

          <div className="flex items-center justify-center py-4 text-center bg-gray-200 dark:bg-gray-800">
            <span className="text-sm text-gray-600 dark:text-gray-200">
              Vous n'avez pas de compte ?{" "}
            </span>

            <Link
              to="/RegisterUI"
              href="#"
              className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
      <FooterLink />
    </>
  );
}
