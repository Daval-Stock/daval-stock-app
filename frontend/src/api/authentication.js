import { toast } from "react-toastify";
import axiosInstance from "../Components/axiosInstance";

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/users/profile");

    return { data: response.data };
  } catch (error) {
    console.log(error.response.data.message);
    return { error: error.response.data.message };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users/all-user");
    return { data: response.data };
  } catch (error) {
    console.log(error.response.data.message);
    return { error: error.response.data.message };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete("users/delete/" + id);
    return { data: true };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const putNewPassword = async (newPassword) => {
  try {
    const response = await axiosInstance.put(
      "/users/change-password",
      newPassword
    );
    return { data: true };
  } catch (error) {
    console.log(error.response.data.message);
    return { error: error.response.data.message };
  }
};

export const postRegisterUser = async (formData) => {
  try {
    const response = await axiosInstance.post("users/register", formData);

    // const { token } = response.data;
    // localStorage.setItem("authToken", token);

    return { data: true };
  } catch (error) {
    toast.error(error.response.data.message);
    return { error: error.response.data.message };
  }
};

export const postLoginUser = async (formValues) => {
  try {
    const response = await axiosInstance.post("users/login", {
      email: formValues.email,
      password: formValues.password,
    });

    const { token } = response.data;
    localStorage.setItem("authToken", token);
    toast.success("Login successful!");

    return { data: true };
  } catch (error) {
    return { error: error.response.data.message };
  }
};
