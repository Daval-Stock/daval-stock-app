import React from 'react'
import {
    GrStatusGood,GoPackage,RiDashboardFill,CiUser,
    FiPackage,TbFileInvoice,BsDatabaseCheck
} from "react-icons/all.js"
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import logoDaval from '../../assets/logoDaval.png'
import alamine from '../../assets/alamine.png'


export default function Dashboard() {
  return (
    <>
        <div>
            <Sidebar showNavBar={true}/>

            <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center items-center justify-center h-30 rounded bg-gray-50 dark:bg-gray-800">
                        <h2 className="text-3xl pt-2 font-semibold text-blue-600 dark:text-gray-400">425</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-500">Qté</span>
                        <div className="flex justify-center space-x-3 md:mt-4 gap-1 pb-3">
                        <GrStatusGood className="text-lg"/>
                            <span className="flex justify-center text-sm text-gray-600 dark:text-gray-400">ETAT DU STOCK</span>
                        </div>
                    </div>
                    <div className="text-center items-center justify-center h-30 rounded bg-gray-50 dark:bg-gray-800">
                        <h2 className="text-3xl pt-2 font-semibold text-red-600 dark:text-gray-400">13</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-500">Colis</span>
                        <div className="flex justify-center space-x-3 md:mt-4 gap-1 pb-3">
                        <GoPackage className="text-lg"/>
                            <span className="flex justify-center text-sm text-gray-600 dark:text-gray-400">COMMANDES EN COURS</span>
                        </div>
                    </div>
                    <div className="text-center items-center justify-center h-30 rounded bg-gray-50 dark:bg-gray-800">
                        <h2 className="text-3xl pt-2 font-semibold text-red-600 dark:text-gray-400">224</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-500">Colis</span>
                        <div className="flex justify-center space-x-3 md:mt-4 gap-1 pb-3">
                        <GoPackage className="text-lg"/>
                            <span className="flex justify-center text-sm text-gray-600 dark:text-gray-400">VENTE DU JOUR</span>
                        </div>
                    </div>  
                </div>
                <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50  dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">ss</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
                    </div>
                </div>
                <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </>
    
  )
}