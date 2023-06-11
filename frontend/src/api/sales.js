import { toast } from "react-toastify";
import axiosInstance from "../Components/axiosInstance";

export const getSales = async () => {
  try {
    const response = await axiosInstance.get("/sales/all-sales");
    return { data: response.data };
  } catch (error) {
    console.log(error.response.data.message);
    return { error: error.response.data.message };
  }
};
