import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import UserContext from "./UserContext";
import Navbar from "../Navbar/Navbar";
import defaultProfilImage from "../../assets/default-profile-image-url.jpg";
import Container from "../Container";
import Layout from "../Layout";
import { getUserProfile, putNewPassword } from "../../api/authentication";
import FormCard from "../FormCard";
import { AiFillEye, AiFillEyeInvisible, AiFillLock } from "react-icons/ai";
import { toast } from "react-toastify";
import { isPasswordValid } from "../../utils/passwordChecker";
import Loader from "../Loader";

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const authToken = localStorage.getItem("authToken");
  const [passwordChangeValues, setPasswordChangeValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    async function fetchData() {
      if (authToken) {
        const { data } = await getUserProfile();
        setUserProfile(data);
      }
    }
    fetchData();
  }, [authToken]);

  const togglePasswordVisibility = (e, name) => {
    setShowPassword({
      ...showPassword,
      [name]: !showPassword[name],
    });
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const { isValid } = isPasswordValid(passwordChangeValues);

    if (isValid) {
      const newPassword = {
        current_password: passwordChangeValues.currentPassword,
        new_password: passwordChangeValues.newPassword,
      };

      const { data, error } = await putNewPassword(newPassword);

      if (data) {
        toast.success("Mot de passe changé avec succès");
      } else {
        toast.error(error);
      }
    }
    setPasswordChangeValues({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // if (!userProfile) {
  //   return <Loader />;
  // }

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
        {userProfile ? (
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
                          <AiFillLock className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
                        </span>

                        <input
                          type={
                            showPassword.currentPassword ? "text" : "password"
                          }
                          name="currentPassword"
                          id="currentPassword"
                          value={passwordChangeValues.currentPassword}
                          onChange={handlePasswordChangeInputChange}
                          className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                          placeholder="Mot de passe actuel"
                        />
                        <button
                          type="button"
                          name="currentPassword"
                          onClick={(e) =>
                            togglePasswordVisibility(e, "currentPassword")
                          }
                          className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                        >
                          {showPassword.currentPassword ? (
                            <AiFillEye className="w-6 h-6" />
                          ) : (
                            <AiFillEyeInvisible className="w-6 h-6" />
                          )}
                        </button>
                      </div>

                      <div className="relative flex items-center mt-4">
                        <span className="absolute">
                          <AiFillLock className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
                        </span>

                        <input
                          type={showPassword.newPassword ? "text" : "password"}
                          name="newPassword"
                          id="newPassword"
                          value={passwordChangeValues.newPassword}
                          onChange={handlePasswordChangeInputChange}
                          className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                          placeholder="Nouveau mot de passe"
                        />
                        <button
                          type="button"
                          name="newPassword"
                          onClick={(e) =>
                            togglePasswordVisibility(e, "newPassword")
                          }
                          className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                        >
                          {showPassword.newPassword ? (
                            <AiFillEye className="w-6 h-6" />
                          ) : (
                            <AiFillEyeInvisible className="w-6 h-6" />
                          )}
                        </button>
                      </div>

                      <div className="relative flex items-center mt-4">
                        <span className="absolute">
                          <AiFillLock className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
                        </span>

                        <input
                          type={
                            showPassword.confirmPassword ? "text" : "password"
                          }
                          name="confirmPassword"
                          id="confirmPassword"
                          value={passwordChangeValues.confirmPassword}
                          onChange={handlePasswordChangeInputChange}
                          className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                        `}
                          placeholder="Confirmer le mot de passe"
                        />
                        <button
                          type="button"
                          name="confirmPassword"
                          onClick={(e) =>
                            togglePasswordVisibility(e, "confirmPassword")
                          }
                          className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                        >
                          {showPassword.confirmPassword ? (
                            <AiFillEye className="w-6 h-6" />
                          ) : (
                            <AiFillEyeInvisible className="w-6 h-6" />
                          )}
                        </button>
                      </div>

                      <div className="mt-6">
                        <button
                          type="submit"
                          onClick={handleChangePassword}
                          className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        >
                          Changer de mot de passe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </FormCard>
        ) : (
          <Loader />
        )}
      </Container>
    </Layout>
  );
}

export default UserProfile;
