import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import axiosInstance from "../axiosInstance";
import Navbar from "../Navbar/Navbar";
import FooterLink from "../Footer/FooterLink";
import logoDaval from "../../assets/logoDaval.png";
import Container from "../Container";
import Layout from "../Layout";
import Loader from "../Loader";
import FormCard from "../FormCard";
import Form from "../Form";
import { toast } from "react-toastify";

export default function UpdateUser() {
  const location = useLocation();
  const user = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const navigateTo = useNavigate();
  const [passwordComplexity, setPasswordComplexity] = useState("");
  const [role, setRole] = useState(user?.role);
  const [site, setSite] = useState(user?.site?.name);
  const [sites, setSites] = useState([]);
  const [formValues, setFormValues] = useState({
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
    site: user?.site?.name,
    role: role,
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formValues.username) {
      errors.username = "Le nom d'utilisateur est requis";
      isValid = false;
    } else if (formValues.username.length < 4) {
      errors.username =
        "Le nom d'utilisateur doit contenir au moins 4 caractères!";
      isValid = false;
    }
    if (!formValues.email) {
      errors.email = "L'adresse e-mail est requise";
      isValid = false;
    }

    if (!formValues.mobile) {
      errors.mobile = "Le numéro de téléphone mobile est requis";
      isValid = false;
    } else if (!/^(\+33|0)[1-9](\d{2}){4}$/.test(formValues.mobile)) {
      errors.mobile = "Le numéro de téléphone mobile est invalide";
      isValid = false;
    }

    if (!formValues.password) {
      //errors.password = "Le mot de passe est requis";
      //isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formValues.password
      )
    ) {
      errors.password =
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)";
      //isValid = false;
    }

    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
      //isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  useEffect(() => {
    axiosInstance
      .get("/sites/")
      .then((Response) => {
        setSites(Response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Erreur lors de la récupération des sites :", error);
      });
  }, []);

  const handleSubmit = (e) => {
    console.log(formValues);
    e.preventDefault();
    if (true) {
      const formData = new FormData();
      const data = {
        name: formValues.name,
        email: formValues.email,
        mobile: formValues.mobile,
        siteName: formValues.site,
        password: formValues.password,
        role: formValues.role,
      };
      formData.append("name", formValues.name);
      formData.append("email", formValues.email);
      formData.append("mobile", formValues.mobile);
      formData.append("siteName", formValues.site);
      formData.append("password", formValues.password);

      if (profileImage) {
        data.append("profileImage", profileImage);
        formData.append("profileImage", profileImage);
      }
      console.log("first name :", formValues.name);

      axiosInstance
        .put("users/edit-user/" + user?._id, data)
        .then((response) => {
          toast.success("Utilisateur mis à jour avec succès");
          navigateTo("/UsersUI");
        })
        .catch((error) => {
          console.log("Axios error:", error);
          console.log("Axios error response:", error.response);
          if (error.response && error.response.data) {
            formErrors.message = "Cet utilisateur existe déjà!";
            setFormErrors({ ...formErrors, ...error.response.data.errors });
          }
        });
    }
  };

  const updatePasswordComplexity = (password) => {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setPasswordComplexity("strong");
    } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      setPasswordComplexity("medium");
    } else {
      setPasswordComplexity("weak");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("Image:", event.target.files[0]);
    if (file) {
      setProfileImage(file);
    }
  };
  return (
    <Layout>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <FormCard>
            <div className="px-6 py-4">
              <div className="flex justify-center mx-auto">
                <Link to="/">
                  <img className="w-auto h-7 sm:h-8" src={logoDaval} alt="" />
                </Link>
              </div>

              <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                Mettre à jour un compte
              </h3>

              <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                Remplissez le formulaire en renseignant les informations !
              </p>
              {formErrors.serverError}
              <Form
                formValues={formValues}
                handleSubmit={handleSubmit}
                name={true}
                email={true}
                mobile={true}
                handleImageChange={handleImageChange}
                handleInputChange={handleInputChange}
                password={true}
                confirmPassword={true}
                buttonLabel="Modifier"
                errors={formErrors}
                site={true}
                setSite={setSite}
                setRole={setRole}
                role={true}
                sites={sites}
                dropFile={true}
                method="post"
                encType="multipart/form-data"
              />
            </div>
          </FormCard>
        )}

        {/* <div className="relative">
          <div className="flex center p-3">
            <label htmlFor="isAdmin" className="px-6">
              Rôle:{" "}
            </label>

            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
              className="relative appearance-none inline-block h-[30px] w-[120px] cursor-pointer rounded-full bg-slate-300 shadow-md px-5 transition-all"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>
        </div> */}
      </Container>
    </Layout>
  );
}
