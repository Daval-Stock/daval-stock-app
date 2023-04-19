import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Navbar from "../Navbar/Navbar";
import FooterLink from "../Footer/FooterLink";
import logoDaval from "../../assets/logoDaval.png";

export default function RegisterUI() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordComplexity, setPasswordComplexity] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", formValues.username);
      formData.append("email", formValues.email);
      formData.append("mobile", formValues.mobile);
      formData.append("password", formValues.password);
      console.log("formValue: ", formValues);
      if (profileImage) {
        formData.append("image", profileImage); // Ajoutez l'image avec le bon nom de champ ici
      }
      axiosInstance

        .post("users/register", formData)
        .then((response) => {
          navigateTo("/ConnexionUI");
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
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight dark:text-gray-300 text-gray-900 sm:text-4xl">S'incrire</h2>
        <p className="mt-2 text-md pb-6 leading-8 text-gray-600 dark:text-gray-300">
          Veuillez remplir tous les champs du formulaire pour vous inscrire 
        </p>
      </div>

        <section className=" pb-10">
          <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
            <form
              className="w-full max-w-md"
              onSubmit={handleSubmit}
              action="/register"
              method="post"
              encType="multipart/form-data"
            >
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
                <p className="mt-2 text-sm text-red-500">
                  {formErrors.message}
                </p>
              )}
              {/* User name */}
              <div className="relative flex items-center mt-8">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  name="username"
                  value={formValues.username}
                  onChange={handleInputChange}
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Nom d'utilisateur"
                />
                {formErrors.username && (
                  <p className="mt-2 text-sm text-red-500">
                    {formErrors.username}
                  </p>
                )}
              </div>
              {/* User image */}
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

                <h2 className="mx-3 text-gray-400">Photo profil</h2>

                <input
                  id="dropzone-file"
                  type="file"
                  onChange={handleImageChange}
                  className=""
                  name="image"
                />
              </label>
              {/* User email */}
              <div className="relative flex items-center mt-6">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>

                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Adresse Email"
                />
                {formErrors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {formErrors.email}
                  </p>
                )}
              </div>
              {/* User phone */}
              <div className="relative flex items-center mt-6">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>
                </span>

                <input
                  type="mobile"
                  name="mobile"
                  value={formValues.mobile}
                  onChange={handleInputChange}
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Mobile"
                />
                {formErrors.mobile && (
                  <p className="mt-2 text-sm text-red-500">
                    {formErrors.mobile}
                  </p>
                )}
              </div>
              {/* Password  */}
              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                    passwordComplexity === "strong"
                      ? "border-green-500"
                      : passwordComplexity === "medium"
                      ? "border-yellow-500"
                      : "border-red-500"
                  }`}
                  placeholder="Mot de passe"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >

                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 12a2 2 0 11-4 0 2 2 0 014 0zm2 0a2 2 0 104 0 2 2 0 00-4 0zm-6 0a6 6 0 1112 0 6 6 0 01-12 0z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 7a5 5 0 00-9.975 1.975A9.994 9.994 0 0112 4c4.764 0 8.863 2.686 9.975 6.975A5 5 0 0012 7zm0 2a3 3 0 015.292 2.295A9.005 9.005 0 0112 18.938 9.005 9.005 0 016.708 11.295 3 3 0 015 9zm-3 3a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
                      />
                    )}
                  </svg>
                </button>

                {formErrors.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {formErrors.password}
                  </p>
                )}
              </div>
              {/* Confirm password */}

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type="password"

                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Confirmez le mot de passe"
                />

                {formErrors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-500">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  S'inscrire
                </button>

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
            </form>
          </div>
        </section>
      </div>
      <FooterLink />
    </>
  );
}
