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
import Layout from "../Layout";
import { postLoginUser } from "../../api/authentication";
import { toast } from "react-toastify";

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Envoyer les données du formulaire au serveur
      const { data, error } = await postLoginUser(formValues);
      if (data) {
        navigateTo("/Trash");
      }
      if (error) {
        toast.error(error);
      }
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
          <div className="">
           {/*  <div className="flex justify-center mx-auto">
              <Link to="/">
                <img className="w-auto h-7 sm:h-8" src={logoDaval} alt="" />
              </Link>
            </div>

            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
              Se connecter
            </h3>

            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
              en seulement deux clics
            </p> */}
            {formErrors.serverError}
            <Form
              formValues={formValues}
              handleSubmit={handleSubmit}
              email={true}
              handleInputChange={handleInputChange}
              password={true}
              buttonLabel="Se connecter"
              errors={formErrors}
            />
          </div>

          <div className="flex pt-6 justify-center rounded-b-lg py-3 text-center">
            <span className="text-sm text-gray-600">
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
          </>
  );
}
