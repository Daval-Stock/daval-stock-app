import React, { useState, useEffect } from "react";
import axiosInstance from '../axiosInstance';
import { Link } from "react-router-dom";

import {
  RiDashboardFill,
  CiUser,
  FiPackage,
  TbFileInvoice,
  BsDatabaseCheck,
} from "react-icons/all.js";
import Navbar from "../Navbar/Navbar";
import logoDaval from "../../assets/logoDaval.png";
import alamine from "../../assets/alamine.png";
import Sidebar from "../Sidebar/Sidebar";

function Users({ shhowNavbar }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Utiliser axiosInstance au lieu d'axios
    axiosInstance
      .get("/users/all-user")
      .then((response) => {
        setUsers(response.data);
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
          <div className="p-4 border-2 border-blue-300 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="items-center justify-between m-10">
              <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-center text-gray-900 uppercase  bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                        Prénom et Nom
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Téléphone
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Rôle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.name}
                        </th>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.mobile}</td>
                        <td className="px-6 py-4">{user.role}</td>
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

export default Users;