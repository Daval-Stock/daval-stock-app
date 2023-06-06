import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";

/* import {
  RiDashboardFill,
  CiUser,
  FiPackage,
  TbFileInvoice,
  BsDatabaseCheck,
} from "react-icons/all.js"; */
import Navbar from "../Navbar/Navbar";
import logoDaval from "../../assets/logoDaval.png";
import alamine from "../../assets/alamine.png";
=======
>>>>>>> aa7ee6d68af34083f201125773752a43bf61589a
import Sidebar from "../Sidebar/Sidebar";
import axiosInstance from "../axiosInstance";

function Order({ showNavbar }) {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    // Utiliser axiosInstance au lieu d'axios
    axiosInstance
      .get("/orders/")
      .then((response) => {
        setOrder(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="items-center justify-between m-10">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Order Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Supplier
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Site
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Cost
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delivery Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.map((order) => (
                    <tr
                      key={order._id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {order.order_number}
                      </th>
                      <td className="px-6 py-4">{order.supplier}</td>
                      <td className="px-6 py-4">{order.site}</td>
                      <td className="px-6 py-4">{order.total_cost}</td>
                      <td className="px-6 py-4">{order.order_status}</td>
                      <td className="px-6 py-4">
                        {new Date(order?.delivery_date).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
