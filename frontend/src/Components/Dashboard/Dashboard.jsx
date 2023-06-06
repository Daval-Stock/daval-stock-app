import React from "react";
/* import {
  GrStatusGood,
  GoPackage,
  RiDashboardFill,
  CiUser,
  FiPackage,
  TbFileInvoice,
  BsDatabaseCheck,
} from "react-icons/all.js"; */
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import logoDaval from "../../assets/logoDaval.png";
import alamine from "../../assets/alamine.png";
import FooterLink from "../Footer/FooterLink";
import axiosInstance from "../axiosInstance";
import { useState, useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Utiliser axiosInstance au lieu d'axios
    axiosInstance
      .get("/products/all-product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
    //Télécharger la liste des produits
  const handleDownloadPDF = () => {
    const documentDefinition = {
      content: [
        { text: 'Products', style: 'header' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'SKU', style: 'tableHeader' },
                { text: 'Nom', style: 'tableHeader' },
                { text: 'Catégorie', style: 'tableHeader' },
                { text: 'Quantité', style: 'tableHeader' },
                { text: 'Prix', style: 'tableHeader' },
                { text: 'Description', style: 'tableHeader' },
                { text: 'Site', style: 'tableHeader' },
                { text: "Date d'expiration", style: 'tableHeader' },
              ],
              ...products.map((product) => [
                  product.name,
                  product.sku,
                  product.category,
                  product.quantity,
                  product.price,
                  product.description,
                  product.site,
                  product.ExpirationDate? new Date(product?.ExpirationDate).toLocaleDateString(): " ",
                
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          marginBottom: 10,
        },
        tableHeader: {
          bold: true,
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download('product.pdf');
       <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleDownloadPDF}>
                  Download PDF
                </button>
  };

  return (
    <>
      <Sidebar/>
      <div className="p-4 sm:ml-64">
     

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        </div>
      
    </>
  );
}
