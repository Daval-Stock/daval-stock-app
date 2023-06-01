import React from "react";
import axiosInstance from "../axiosInstance";
import { useState, useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import Layout from "../Layout";
import Container from "../Container";

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
  return (
    <Layout>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </Layout>
  );
}
