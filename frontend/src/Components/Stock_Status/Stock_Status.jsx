import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import Sidebar from "../Sidebar/Sidebar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell, LabelList } from 'recharts';

function StockStatus() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axiosInstance
        .get("/products/all-product")
        .then((response) => {
            setProducts(response.data);
            response.data.forEach(product => {
                if (product.quantity < 10) {
                    alert(`Low stock alert for ${product.name}`);
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const data = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())).map((item) => ({
        name: item.name,
        quantity: item.quantity
    }));

    const COLORS = ['green', 'yellow', 'red']; // Colors for high, medium, and low stock levels

    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="items-center justify-between m-10">
                        <div className="relative overflow-x-auto">
                            <div className="flex"></div>
                            <div className="flex items-center justify-between pb-4">
                                <input
                                    type="text"
                                    id="stock-search"
                                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search for items"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                            </div>
                            <BarChart width={500} height={300} data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Bar dataKey="quantity" fill="#8884d8">
                                    {
                                        data.map((entry, index) => {
                                            const color = entry.quantity > 50 ? COLORS[0] : (entry.quantity > 20 ? COLORS[1] : COLORS[2]);
                                            return <Cell key={`cell-${index}`} fill={color} />;
                                        })
                                    }
                                    <LabelList dataKey="quantity" position="top" />
                                </Bar>
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StockStatus;
