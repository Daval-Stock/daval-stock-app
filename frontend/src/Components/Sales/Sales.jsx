import React, { useEffect, useState } from 'react';
import axiosInstance from "../axiosInstance";
import Sidebar from '../Sidebar/Sidebar';
import { saveAs } from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { format } from 'date-fns';
import { getSales } from '../../api/sales';
import Loader from '../Loader';
import Layout from "../Layout";
import Container from "../Container";
import { Link } from 'react-router-dom';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await getSales();
      if (data) {
        setSales(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleDownloadPDF = () => {
    let bodyData = [];

    const headerData = [
      { text: 'Product', style: 'tableHeader' },
      { text: 'User', style: 'tableHeader' },
      { text: 'Quantity', style: 'tableHeader' },
      { text: 'Total Price', style: 'tableHeader' },
      { text: 'Site', style: 'tableHeader' },
      { text: 'Created At', style: 'tableHeader' },
    ];

    bodyData.push(headerData);

    filteredSales.map((sale) => {
      bodyData.push([
        `${sale.product?.sku} , ${sale.product?.name}`,
        `${sale.user?.name ?? 'N/A'}`,
        sale.quantity,
        sale.totalPrice,
        sale.site,
        new Date(sale.createdAt).toLocaleDateString(),
      ]);
    });
    const docDefinition = {
    content: [
      { text: 'Sales Report', style: 'header' },
      {
        style: 'tableExample',
        table: {
          widths: ['*', '*', '*', '*', '*', '*'],
          body: bodyData,
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
    },
  };

    pdfMake.createPdf(docDefinition).download("sales_report.pdf");
  };

  const filteredSales = sales.filter(sale => {
    const saleYear = new Date(sale.createdAt).getFullYear();
    const saleMonth = new Date(sale.createdAt).getMonth() + 1;
    return saleYear === Number(selectedYear) && selectedMonth.includes(saleMonth);
  });
  const handleCheckboxChange = (event) => {
    const value = Number(event.target.value);
    setSelectedMonth((prev) => {
      if (prev.includes(value)) {
        return prev.filter((month) => month !== value);
      } else {
        return [...prev, value];
      }
    });
  };


  return (
    <>
    <Layout>
    <Container>
        {isLoading ? (
            <Loader/>
            ) : (
                    <div className="container mx-auto py-8 p-4 ">

                    <h1 className="text-2xl font-bold mb-4">Sales</h1>


                    <div className="flex mb-4">
                        <div className="mr-4">
                       <label htmlFor="month" className="mr-2">Select months:</label>
                        <div>
                            {[...Array(12).keys()].map((_, i) => (
                            <label key={i} className="inline-flex items-center mr-3">
                                <input type="checkbox" value={i + 1} checked={selectedMonth.includes(i + 1)} onChange={handleCheckboxChange} className="form-checkbox" />
                                <option className="ml-2">{format(new Date(1970, i), 'MMMM')}</option>
                            </label>
                            ))}
                        </div>
                        </div>
                        <div className="mr-4">
                        <label htmlFor="year" className="mr-2">Select year:</label>
                        <select id="year" value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="py-2 px-4 rounded">
                            <option value={2023}>2023</option>
                            <option value={2022}>2022</option>
                            <option value={2021}>2021</option>
                        </select>
                        </div>
                     
                    </div>
                    <div className='container mx-auto flex justify-between py-5'>
                       <button className="bg-blue-500 text-white  px-10 rounded" onClick={handleDownloadPDF}>
                        Download PDF
                        </button>
                        <div>
                <Link to="/AddSale">
                  <button
                    className="inline-flex items-center text-blue-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-2 text-blue-600 dark:text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    Ajouter une vente
                  </button>
                </Link>
              </div>
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
            )}
     </Container>
     </Layout>
    </>
  );
};

export default Sales;
