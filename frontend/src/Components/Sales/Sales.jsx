import React, { useEffect, useState } from 'react';
import axiosInstance from "../axiosInstance";
import Sidebar from '../Sidebar/Sidebar';

const Sales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/sales/all-sales")
      .then((response) => {
        setSales(response.data);
      })
      .catch((error) => {
        console.log("Erreur lors de la récupération des ventes :", error);
      });
  }, []);

  return (
    <>
    <Sidebar/>
    <div className="container mx-auto py-8 p-4 sm:ml-64">
      <h1 className="text-2xl font-bold mb-4">Sales</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-6 py-4 text-center">Product</th>
            <th className="px-6 py-4 text-center">User</th>
            <th className="px-6 py-4 text-center">Quantity</th>
            <th className="px-6 py-4 text-center">Total Price</th>
            <th className="px-6 py-4 text-center">Site</th>
            <th className="px-6 py-4 text-center">Created At</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td className="px-6 py-4 text-center">{sale.product?.sku} , {sale.product?.name}</td>
              <td className="px-6 py-4 text-center">{sale.user?.name ?? 'N/A'}</td>
              <td className="px-6 py-4 text-center">{sale.quantity}</td>
              <td className="px-6 py-4 text-center">{sale.totalPrice}</td>
              <td className="px-6 py-4 text-center">{sale.site}</td>
              <td className="px-6 py-4 text-center">{sale.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Sales;
