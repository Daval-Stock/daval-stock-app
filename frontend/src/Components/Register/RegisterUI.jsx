import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Navbar from "../Navbar/Navbar";
import FooterLink from "../Footer/FooterLink";
import logoDaval from "../../assets/logoDaval.png";
import Container from "../Container";
import FormCard from "../FormCard";
import Form from "../Form";

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
      formData.append("siteName", site);
      formData.append("password", formValues.password);
      console.log("formValue: ", formValues);
      if (profileImage) {
        formData.append("image", profileImage); // Ajoutez l'image avec le bon nom de champ ici
      }

      axiosInstance
        .post("users/register", formData)
        .then((response) => {
          navigateTo("/");
        })
        .catch((error) => {
          console.log("Axios error:", error);
          console.log("Axios error response:", error.response);
          if (error.response && error.response.data) {
            console.log("Erreur: ", error);
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
    <Container>
      <FormCard>
        <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
          Créer un compte
        </h2>
        <p className="mt-2 text-lg text-center leading-8 text-gray-600">
          Remplissez le formulaire en renseignat toutes les informations !
        </p>

        <section className="">
          <div className="flex items-center justify-center min-h-screen px-6 mx-auto">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src={logoDaval} alt="" />
            </div>

            <div className="flex items-center justify-center mt-6">
              <Link
                to="/ConnexionUI"
                href="#"
                className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
              >
                Connexion
              </Link>

              <a
                href="#"
                className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
              >
                S'inscrire
              </a>
            </div>
            {formErrors.message && (
              <p className="mt-2 text-sm text-red-500">{formErrors.message}</p>
            )}
            <Form
              handleSubmit={handleSubmit}
              name={formValues.username}
              email={formValues.email}
              mobile={formValues.mobile}
              handleInputChange={handleInputChange}
              password={formValues.password}
              confirmPassword={formValues.confirmPassword}
              buttonLabel="S'inscrire"
              errors={formErrors}
              site={site}
              setSite={setSite}
              sites={sites}
              dropFile={true}
              method="post"
              encType="multipart/form-data"
            />

            <div className="mt-6 text-center ">
              <Link
                to="/ConnexionUI"
                href="#"
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Vous avez déjà un compte?
              </Link>
            </div>
          </div>
        </section>
      </FormCard>
    </Container>
  );
}
