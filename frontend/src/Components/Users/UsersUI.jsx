import React, { useState, useEffect } from "react";
import axios from "axios";
import {BsArrowLeft} from 'react-icons/all'
import { Link } from "react-router-dom";

function UsersUI() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/all-user")
      .then((response) => {
        setUsers(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div class="items-center justify-between m-10">
      <Link to="/Sidebar">
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <BsArrowLeft className="w-5 h-5 mr-2 -ml-1"/>
          Retour
        </button>
      </Link>
        

      <div className="pb-10 text-center">
        <h2 class="text-blue-600 text-xl">Listes des utilisateurs</h2>
      </div>


      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Prénom et Nom
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Téléphone
              </th>
              <th scope="col" class="px-6 py-3">
                Rôle
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.name}
                </th>
                <td class="px-6 py-4">{user.email}</td>
                <td class="px-6 py-4">{user.mobile}</td>
                <td class="px-6 py-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersUI;
