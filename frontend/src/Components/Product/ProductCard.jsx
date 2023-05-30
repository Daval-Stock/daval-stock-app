import React from "react";
import defaultProductImage from "../../assets/default-product-image.jpg";

const ProductCard = ({ product }) => {
  const { name, category, quantity, price, description, imageUrl } = product;
  //console.log(product?.productImage.split("\\").pop().replace(".jpg", ""));
  const productImageUrl = product?.productImage
    ? `http://localhost:3000/products/product-image/${
        product?.productImage &&
        product?.productImage?.split("\\").pop().replace(".jpg", "")
      }`
    : defaultProductImage;
  console.log(productImageUrl);
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <img
        src={productImageUrl}
        alt={name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-600">Catégorie : {category}</p>
      <p className="text-sm text-gray-600">Quantité : {quantity}</p>
      <p className="text-sm text-gray-600">Prix : {price}</p>
      <p className="text-sm text-gray-600">Description : {description}</p>
    </div>
  );
};

export default ProductCard;
