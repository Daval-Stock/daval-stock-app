import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import UserContext from "./UserContext";
import Navbar from "../Navbar/Navbar";
import defaultProfilImage from "../../assets/default-profile-image-url.jpg";
import Container from "../Container";
import Layout from "../Layout";
import FormCard from "../FormCard";

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const authToken = localStorage.getItem("authToken");
  const [passwordChangeValues, setPasswordChangeValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordChangeErrors, setPasswordChangeErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [passwordComplexity, setPasswordComplexity] = useState("");

  useEffect(() => {
    if (authToken) {
      fetchUserProfile();
    }
  }, [authToken]);

  const fetchUserProfile = async () => {
    axiosInstance
      .get("/users/profile")
      .then((response) => {
        console.log("User profile data:", response.data);
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const handleChangePassword = (event) => {
    event.preventDefault();

    let errors = {};
    let isValid = true;

    if (!passwordChangeValues.currentPassword) {
      errors.currentPassword = "Le mot de passe actuel est requis";
      isValid = false;
    }

    if (!passwordChangeValues.newPassword) {
      errors.password = "Le nouveau mot de passe est requis";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        passwordChangeValues.newPassword
      )
    ) {
      errors.password =
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)";
      isValid = false;
    }

    if (
      passwordChangeValues.newPassword !== passwordChangeValues.confirmPassword
    ) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    setPasswordChangeErrors(errors);

    if (isValid) {
      const data = {
        current_password: passwordChangeValues.currentPassword,
        new_password: passwordChangeValues.newPassword,
      };

      axiosInstance
        .put("/users/change-password", data)
        .then((response) => {
          console.log("Mot de passe changé avec succès:", response.data);
          // Réinitialiser les valeurs du formulaire
          setPasswordChangeValues({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          // Afficher un message de succès ou gérer la réussite du changement de mot de passe
        })
        .catch((error) => {
          console.log("Erreur lors du changement de mot de passe:", error);
          // Gérer les erreurs, par exemple afficher un message d'erreur
        });
    } else {
      setPasswordChangeValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };
  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const profileImageUrl = userProfile?.profileImage
    ? `http://localhost:3000/users/profile-image/${
        userProfile?.profileImage &&
        userProfile?.profileImage.split("\\").pop().replace(".png", "")
      }`
    : defaultProfilImage;

  const handlePasswordChangeInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordChangeValues({ ...passwordChangeValues, [name]: value });
  };

  return (
    <Layout>
      <Container>
        <FormCard>
          <div className="relative isolate px-6 pt-32 lg:px-16">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="ml-10">
                  <img
                    src={profileImageUrl}
                    alt="Profil"
                    width="100"
                    height="100"
                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-10 lg:-ml-16 max-w-150-px"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </div>
            </div>
            <div className="text-center mt-28">
              <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                {userProfile?.name}
              </h3>
              <div className="text-lg leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                {userProfile?.email}
              </div>
              <div className="mb-2 text-blueGray-600 mt-10">
                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                <strong>Tel :</strong> {userProfile?.mobile}
              </div>
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                <strong>Rôle :</strong> {userProfile?.role}
              </div>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <h2 className="text-2xl font-bold mb-4">
                    Changer le mot de passe
                  </h2>
                  <form onSubmit={handleChangePassword}>
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
                        name="currentPassword"
                        id="currentPassword"
                        value={passwordChangeValues.currentPassword}
                        onChange={handlePasswordChangeInputChange}
                        className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          passwordComplexity === "strong"
                            ? "border-green-500"
                            : passwordComplexity === "medium"
                            ? "border-yellow-500"
                            : "border-red-500"
                        }`}
                        placeholder="Mot de passe actuel"
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
                    </div>
                    {passwordChangeErrors.currentPassword && (
                      <p className="text-red-500">
                        {passwordChangeErrors.currentPassword}
                      </p>
                    )}

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
                        name="newPassword"
                        id="newPassword"
                        value={passwordChangeValues.newPassword}
                        onChange={handlePasswordChangeInputChange}
                        className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          passwordComplexity === "strong"
                            ? "border-green-500"
                            : passwordComplexity === "medium"
                            ? "border-yellow-500"
                            : "border-red-500"
                        }`}
                        placeholder="Nouveau mot de passe"
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
                    </div>

                    {passwordChangeErrors.newPassword && (
                      <p className="text-red-500">
                        {passwordChangeErrors.newPassword}
                      </p>
                    )}
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
                        name="confirmPassword"
                        id="confirmPassword"
                        value={passwordChangeValues.confirmPassword}
                        onChange={handlePasswordChangeInputChange}
                        className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          passwordComplexity === "strong"
                            ? "border-green-500"
                            : passwordComplexity === "medium"
                            ? "border-yellow-500"
                            : "border-red-500"
                        }`}
                        placeholder="Confirmer le mot de passe"
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
                    </div>
                    {passwordChangeErrors.confirmPassword && (
                      <p className="text-red-500">
                        {passwordChangeErrors.confirmPassword}
                      </p>
                    )}
                    <div className="mt-6">
                      <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Changer de mot de passe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </FormCard>
      </Container>
    </Layout>
  );
}

export default UserProfile;
