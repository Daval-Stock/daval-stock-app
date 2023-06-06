import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";
import logoDaval from "../../assets/logoDaval.png";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import FooterLink from "../Footer/FooterLink";
import Input from "../Input";
import Button from "../Button";
import Container from "../Container";
import Form from "../Form";
import FormCard from "../FormCard";

export default function ConnexionUI() {
  // State pour stocker les valeurs du formulaire et les erreurs
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const navigateTo = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formValues?.email) {
      errors.email = "L'adresse e-mail est requise";
      isValid = false;
    }

    if (!formValues?.password) {
      errors.password = "Le mot de passe est requis";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  // Fonction appelée lorsque le formulaire est soumis
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Envoyer les données du formulaire au serveur
      axiosInstance
        .post("users/login", {
          email: formValues.email,
          password: formValues.password,
        })
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem("authToken", token);
          navigateTo("/");
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
    <Container>
      <FormCard>
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
          <Form
            handleSubmit={handleSubmit}
            email={formValues.email}
            handleInputChange={handleInputChange}
            password={formValues.password}
            buttonLabel="Se connecter"
            errors={formErrors}
          />
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
      </FormCard>
    </Container>
  );
}
