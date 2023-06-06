import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import Sidebar from "../Sidebar/Sidebar";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  FaBoxOpen,
  FaEuroSign,
  FaWarehouse,
  FaExclamationCircle,
} from "react-icons/fa";
import Container from "../Container";
import Layout from "../Layout";
import StockStatus from "../Stock_Status/Stock_Status";

function Trashboard() {
  const [products, setProducts] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);

  useEffect(() => {
    axiosInstance
      .get("/products/all-product")
      .then((response) => {
        setProducts(response.data);
        let quantity = 0;
        let value = 0;
        let outOfStockCount = 0;
        response.data.forEach((product) => {
          quantity += product.quantity;
          value += product.quantity * product.price;
          if (product.quantity === 0) {
            outOfStockCount++;
          }
        });
        setTotalQuantity(quantity);
        setTotalValue(value);
        setOutOfStock(outOfStockCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = [
    { name: "Total Products", value: products.length },
    { name: "Out of Stock", value: outOfStock },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <Layout>
      <Container>
        <div className="flex-col items-center mx-2 p-2">
          <div className="relative overflow-x-auto">
            <div className="mb-4">
              <h1 className="text-white text-3xl font-semibold">
                Statistiques
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded shadow flex items-center">
                <FaBoxOpen className="text-blue-500 text-3xl mr-2" />
                <div>
                  <h3 className="text-xl font-semibold">Total Quantity</h3>
                  <p>{totalQuantity}</p>
                </div>
              </div>
              <div className="p-4 border rounded shadow flex items-center">
                <FaEuroSign className="text-green-500 text-3xl mr-2" />
                <div>
                  <h3 className="text-xl font-semibold">Total Value</h3>
                  <p>€{totalValue.toFixed(2)}</p>
                </div>
              </div>
              <div className="p-4 border rounded shadow flex items-center">
                <FaExclamationCircle className="text-red-500 text-3xl mr-2" />
                <div>
                  <h3 className="text-xl font-semibold">Out of Stock</h3>
                  <p>{outOfStock}</p>
                </div>
              </div>
              <div className="p-4 border rounded shadow flex items-center">
                <FaWarehouse className="text-purple-500 text-3xl mr-2" />
                <div>
                  <h3 className="text-xl font-semibold">Total Products</h3>
                  <p>{products.length}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 text-center">
                <PieChart width={400} height={500}>
                  <Pie
                    data={data}
                    cx={300}
                    cy={200}
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
             
            </div>
             <div>
                <StockStatus />
              </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Trashboard;
