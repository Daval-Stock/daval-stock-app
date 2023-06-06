import React, { useEffect, useState } from 'react';
import axiosInstance from "../axiosInstance";
import Sidebar from '../Sidebar/Sidebar';
import { saveAs } from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { format } from 'date-fns';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

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

  const handleDownloadPDF = () => {
    // code for PDF download goes here
  };

  const filteredSales = sales.filter(sale => {
    const saleMonth = new Date(sale.createdAt).getMonth() + 1;
    return saleMonth === selectedMonth;
  });

  return (
    <>
    <Sidebar/>
    <div className="container mx-auto py-8 p-4 sm:ml-64">
      <h1 className="text-2xl font-bold mb-4">Sales</h1>
      <div className="flex mb-4">
        <div className="mr-4">
          <label htmlFor="month" className="mr-2">Select month:</label>
          <select id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="py-2 px-4 rounded">
            {[...Array(12).keys()].map((_, i) => (
              <option key={i} value={i + 1}>
                {format(new Date(1970, i), 'MMMM')}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-6 py-4 text-center border">Product</th>
            <th className="px-6 py-4 text-center border">User</th>
            <th className="px-6 py-4 text-center border">Quantity</th>
            <th className="px-6 py-4 text-center border">Total Price</th>
            <th className="px-6 py-4 text-center border">Site</th>
            <th className="px-6 py-4 text-center border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => (
            <tr key={sale._id}>
              <td className="px-6 py-4 text-center border">{sale.product?.sku} , {sale.product?.name}</td>
              <td className="px-6 py-4 text-center border">{sale.user?.name ?? 'N/A'}</td>
              <td className="px-6 py-4 text-center border">{sale.quantity}</td>
              <td className="px-6 py-4 text-center border">{sale.totalPrice}</td>
              <td className="px-6 py-4 text-center border">{sale.site}</td>
              <td className="px-6 py-4 text-center border">{new Date(sale.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Sales;
