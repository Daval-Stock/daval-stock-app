import React from 'react'
import ConnexionUI from '../Connexion/ConnexionUI'
import backgroundImage from '../../assets/pharmacie.jpg'

export default function Homepage() {
  return (
    <div className='flex h-screen bg-white'>
      <div className="w-1/2 bg-white self-center">
        <div className="ml-16 mr-16">
            <h1 className="text-6xl font-bold text-blue-600 sm:text-6xl">Bienvenue sur Daval Stock</h1>
            <p className="pt-6 text-md font-medium text-gray-800">Connectez vous pour accéder au services de Daval Stock</p>
            <div className="pt-2"><ConnexionUI/></div>
        </div>
      </div>
      <div className="w-1/2 bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`}}>
        
      </div>
    </div>
  )
}
