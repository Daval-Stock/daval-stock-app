import { toast } from "react-toastify";
import axiosInstance from "../Components/axiosInstance";

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products/all-product");
    return { data: response.data };
  } catch (error) {
    console.log(error.response.data.message);
    return { error: error.response.data.message };
  }
};
