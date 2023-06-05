import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import Sidebar from "../Sidebar/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";
import { toast } from "react-toastify";

function StockStatus() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/products/all-product")
      .then((response) => {
        setProducts(response.data);
        response.data.forEach((product) => {
          if (product.quantity === 0) {
            toast.error(`Produit en rupture de stock: ${product.name}`);
          } else if (product.quantity < 10) {
            toast.warning(
              `Quantité faible: ${product.name} est presque en rupture de stock`
            );
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .map((item) => ({
      name: item.name,
      quantity: item.quantity,
    }));

  const COLORS = ["green", "yellow", "red"]; // Colors for high, medium, and low stock levels

  return (
    <>
      <div className="relative overflow-x-auto">
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar dataKey="quantity" fill="#8884d8">
            {data.map((entry, index) => {
              const color =
                entry.quantity > 50
                  ? COLORS[0]
                  : entry.quantity > 20
                  ? COLORS[1]
                  : COLORS[2];
              return <Cell key={`cell-${index}`} fill={color} />;
            })}
            <LabelList dataKey="quantity" position="top" />
          </Bar>
        </BarChart>
      </div>
    </>
  );
}

export default StockStatus;
