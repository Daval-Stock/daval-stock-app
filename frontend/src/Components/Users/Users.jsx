import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/all.js";
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

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (id, name) => {
    let choice = confirm("Vous êtes sûr de vouloir supprimer " + name + "?");

    if (choice) {
      axiosInstance
        .delete("users/delete/" + id)
        .then((response) => {
          console.log("L'utilisateur a été supprimé!");
          navigateTo("/UsersUI");
        })
        .catch((error) => {
          console.log("Axios error:", error);
          console.log("Axios error response:", error.response);
        });
    } else {
      console.log("Action annulé!");
    }
  };
  useEffect(() => {
    // Utiliser axiosInstance au lieu d'axios
    axiosInstance
      .get("/users/all-user")
      .then((response) => {
        setUsers(response.data);
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
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
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
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr
                      key={user?._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <Link
                          to="/UpdateUser"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/UpdateUser", { state: user });
                          }}
                        >
                          {user?.name}
                        </Link>
                      </th>
                      <td className="px-6 py-4">{user?.email}</td>
                      <td className="px-6 py-4">{user?.mobile}</td>
                      <td className="px-6 py-4">{user?.role}</td>
                      <td className="px-6 py-4">
                        <button
                          // onClick={handleDelete(user?._id, user?.name)}
                          className="w-15 px-3 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
                        >
                          <div className="flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700">
                            <AiFillDelete className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" />
                          </div>
                        </button>
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

export default Users;
