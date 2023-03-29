import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div classNameName='text-white'>
      
<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
  <Link to="/" href="#" className="flex items-center">
      {/*<img src="#" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />*/}
      <span className="self-center text-xl text-gray-600 font-semibold whitespace-nowrap dark:text-white">Daval-stock</span>
  </Link>
  <div className="flex md:order-2">
    <Link to="/ConnexionUI">
      <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800">Se connecter</button>
        <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
      </button>
    </Link>
      
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
      <Link to="/">
       <a href="#" className="block py-2 pl-3 pr-4 text-white text-base bg-blue-600 rounded md:bg-transparent md:text-blue-600 md:p-0 dark:text-white" aria-current="page">Acueil</a>
      </Link>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-base text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-base text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 text-base pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
      </li>
    </ul>
  </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar
