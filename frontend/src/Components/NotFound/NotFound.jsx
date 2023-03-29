import React from 'react'
import {BiArrowBack} from 'react-icons/all'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    //Initialisation de la naviagtion
    const navigate = useNavigate()
    //Fonction pour retourner à la page d'accueil en cas d'erreur
    const goHome = () =>{
        navigate("/")
    }


  return (
    <div className="text-center text-2xl">
      <h1 className="pt-10 pb-10 text-red-500">Wops, Cette page n'existe pas</h1>
      <button onClick={goHome} type="button" className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2">
        <BiArrowBack className="w-4 h-4 mr-2 -ml-1 text-[#626890]"/>
        Retour à l'accueil
        </button>
    </div>
  )
}