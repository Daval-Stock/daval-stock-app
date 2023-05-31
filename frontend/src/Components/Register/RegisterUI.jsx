import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Navbar from "../Navbar/Navbar";
import FooterLink from "../Footer/FooterLink";
import logoDaval from "../../assets/logoDaval.png";
import Container from "../Container";
import FormCard from "../FormCard";
import Form from "../Form";
import Layout from "../Layout";
import { toast } from "react-toastify";

export default function RegisterUI() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    mobile: "",
    site: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    mobile: "",
    site: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordComplexity, setPasswordComplexity] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [site, setSite] = useState("");
  const [sites, setSites] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  const navigateTo = useNavigate();

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
      errors.password = "Le mot de passe est requis";

      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formValues.password
      )
    ) {
      errors.password =
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)";

      isValid = false;
    }

    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  useEffect(() => {
    axiosInstance
      .get("/sites/")
      .then((Response) => {
        setSites(Response.data);
      })
      .catch((error) => {
        console.log("Erreur lors de la récupération des sites :", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", formValues.username);
      formData.append("email", formValues.email);
      formData.append("mobile", formValues.mobile);
      formData.append("siteName", formValues.site);
      formData.append("password", formValues.password);
      console.log("formValue: ", formValues);
      if (profileImage) {
        formData.append("image", profileImage); // Ajoutez l'image avec le bon nom de champ ici
      }

      axiosInstance
        .post("users/register", formData)
        .then((response) => {
          toast.success("Votre compte a été créé avec succès");
          navigateTo("/");
        })
        .catch((error) => {
          console.log("Axios error:", error);
          console.log("Axios error response:", error.response);
          if (error.response && error.response.data) {
            console.log("Erreur: ", error);
            formErrors.message = "Cet utilisateur existe déjà!";
            toast.error(error.response.data.message);
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
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === "password") {
      updatePasswordComplexity(value);
    }
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
        <FormCard>
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <Link to="/">
                <img className="w-auto h-7 sm:h-8" src={logoDaval} alt="" />
              </Link>
            </div>

            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
              Créer un compte
            </h3>

            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
              Remplissez le formulaire en renseignat toutes les informations !
            </p>
            {formErrors.serverError}
            <Form
              formValues={formValues}
              handleSubmit={handleSubmit}
              name={true}
              email={true}
              mobile={true}
              handleInputChange={handleInputChange}
              password={true}
              confirmPassword={true}
              buttonLabel="S'inscrire"
              errors={formErrors}
              site={true}
              setSite={setSite}
              sites={sites}
              dropFile={true}
              method="post"
              encType="multipart/form-data"
            />
          </div>

          <div className="flex items-center justify-center rounded-b-lg py-4 text-center bg-gray-200 dark:bg-gray-800">
            <span className="text-sm text-gray-600 dark:text-gray-200">
              Vous avez déjà un compte?{" "}
            </span>

            <Link
              to="/ConnexionUI"
              href="#"
              className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
            >
              Se connecter
            </Link>
          </div>
        </FormCard>
      </Container>
    </Layout>
  );
}
