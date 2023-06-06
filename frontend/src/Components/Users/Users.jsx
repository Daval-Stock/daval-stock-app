import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { AiFillDelete } from "react-icons/ai";
import {  RiDashboardFill} from "react-icons/ri";
import {  BsFillPersonFill} from "react-icons/bs";
import {  BsFillPersonPlusFill} from "react-icons/bs";
import {CiUser} from "react-icons/ci";
import {  FiPackage} from "react-icons/fi";
import {  GrStatusGood} from "react-icons/gr";
import {  TbFileInvoice} from "react-icons/tb";
import {  BsDatabaseCheck} from "react-icons/bs";
import Navbar from "../Navbar/Navbar";
import logoDaval from "../../assets/logoDaval.png";
import alamine from "../../assets/alamine.png";
import Sidebar from "../Sidebar/Sidebar";
=======

>>>>>>> aa7ee6d68af34083f201125773752a43bf61589a
import Container from "../Container";
import Layout from "../Layout";
import Loader from "../Loader";
import { deleteUser, getAllUsers } from "../../api/authentication";
import { toast } from "react-toastify";
import { BsPencilSquare, BsSearch } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillDelete, AiOutlineUserAdd } from "react-icons/ai";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (id, name) => {
    setIsLoading(true);
    let choice = confirm("Vous êtes sûr de vouloir supprimer " + name + "?");

    if (choice) {
      setForceUpdate((prev) => !prev);
      const { data, error } = await deleteUser(id);
      console.log(data);
      if (data) {
        setIsLoading(false);
        toast.success("L'utilisateur a été supprimé avec succès!");
        setUsers(users.filter((user) => user.id !== id));
      } else {
        setIsLoading(false);
        toast.error(error);
      }
    } else {
      console.log("Action annulé!");
    }
  };

  useEffect(() => {
    // Utiliser axiosInstance au lieu d'axios
    async function fetchData() {
      const { data, error } = await getAllUsers();
      if (data) {
        setUsers(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, [users]);

  return (
    <Layout>
      <Container>
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className="mb-4">
              <h1 className="text-white text-3xl font-semibold">
                Utilisateurs
              </h1>
            </div>
            <div className="flex items-center justify-between pb-4">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <BsSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for users"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div>
                <Link to="/RegisterUI">
                  <button
                    className="inline-flex items-center text-blue-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <AiOutlineUserAdd className="w-5 h-5 mr-2" />
                    Ajouter un Utilisateur
                  </button>
                </Link>
              </div>
            </div>
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
                    Site
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users
                  ?.filter((u) =>
                    u.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((user) => (
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
                            navigateTo("/UpdateUser", { state: user });
                          }}
                        >
                          {user?.name}
                        </Link>
                      </th>
                      <td className="px-6 py-4">{user?.email}</td>
                      <td className="px-6 py-4">{user?.mobile}</td>
                      <td className="px-6 py-4">{user?.role}</td>
                      <td className="px-6 py-4">{user?.site?.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-4">
                          <button
                            className="text-green-500 text-xl"
                            onClick={(e) => {
                              e.preventDefault();
                              navigateTo("/UpdateUser", { state: user });
                            }}
                          >
                            <BsPencilSquare className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(user?._id, user?.name)}
                            className="text-red-500 text-xl"
                          >
                            <AiFillDelete className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </Container>
    </Layout>
  );
}

export default Users;
