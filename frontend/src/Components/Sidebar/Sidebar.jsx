import React from "react";
import { FiPackage, TbFileInvoice, BsDatabaseCheck } from "react-icons/all.js";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import Container from "../Container";

export default function Sidebar({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const authToken = localStorage.getItem("authToken");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (authToken) {
      axiosInstance
        .get("/users/profile")
        .then((response) => {
          setUserProfile(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [authToken]);

  useEffect(() => {
    if (userProfile?.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userProfile]);

  return (
    <>
      <Container>
        <div className="flex">
          <aside
            className=" h-auto w-72 py-40 pt-20 transition-transform -translate-x-full bg-gray-100 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-900 dark:border-gray-600"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-100 dark:bg-gray-900">
              <ul className="space-y-2">
                <Link to="/Dashboard">
                  <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                      />
                    </svg>

                    <span className="ml-3">Tableau de bord</span>
                  </div>
                </Link>
                {isAdmin && (
                  <Link to="/UsersUI">
                    <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>

                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Utilisateurs
                      </span>
                    </div>
                  </Link>
                )}

                <Link to="/Product">
                  <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <FiPackage className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Produits
                    </span>
                  </div>
                </Link>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <TbFileInvoice className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Factures
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <BsDatabaseCheck className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Etat du stock
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Réglages
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          <section className="">
            <div className="p-4">
              <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <div className="items-center justify-between m-10">
                  <div className="relative overflow-x-auto">{children}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
