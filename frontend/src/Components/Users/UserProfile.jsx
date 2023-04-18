import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import UserContext from "./UserContext";
import Navbar from "../Navbar/Navbar";
import defaultProfilImage from "../../assets/default-profile-image-url.jpg";

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

    <>
      <Navbar />
      {userProfile && (
        <div className="bg-white">
          <div className="relative isolate px-6 pt-8 lg:px-8">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
            <div className="mx-auto max-w-3xl py-30 sm:py-16 lg:py-50">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <img src="" alt="" />
              </div>
              <div className="">
                <div className="bg-dark  dark:bg-gray-900 shadow-md rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Profil de l'utilisateur
                  </h2>
                  <div className="center ml-64">
                    <img
                      src={profileImageUrl}
                      alt="Profil"
                      width="200"
                      height="200"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>

                  <div className="">
                    <strong>Nom :</strong>{" "}
                    <span className="text-gray-900">{userProfile?.name}</span>
                  </div>
                  <div>
                    <strong>Email :</strong>{" "}
                    <span className="text-gray-900">{userProfile?.email}</span>
                  </div>
                  <div>
                    <strong>Numéro de téléphone :</strong>{" "}
                    <span className="text-gray-900">{userProfile?.mobile}</span>
                  </div>
                  <div>
                    <strong>Rôle :</strong>{" "}
                    <span className="text-gray-900">{userProfile?.role}</span>
                  </div>
                  <div className="mt-8">
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
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
