import React, { useState } from "react";
import Input from "./Input";
import { Link } from "react-router-dom";
import Button from "./Button";

const Form = ({
  formValues,
  handleSubmit,
  productName,
  quantity,
  price,
  description,
  category,
  categories,
  mobile,
  email,
  handleInputChange,
  handleImageChange,
  password,
  confirmPassword,
  site,
  sites,
  ExpirationDate,
  role,
  name,
  buttonLabel,
  encType,
  dropFile,
  method,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (e, name) => {
    setShowPassword({
      ...showPassword,
      [name]: !showPassword[name],
    });
  };
  return (
    <form onSubmit={handleSubmit} encType={encType} method={method}>
      {name && (
        <Input
          className=""
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          ariaLabel="username"
          value={formValues.name}
          onChange={handleInputChange}
          error={errors.email}
        />
      )}

      {productName && (
        <Input
          className=""
          type="text"
          name="productName"
          placeholder="Libellé du produit"
          value={formValues.productName}
          onChange={handleInputChange}
        />
      )}

      {price && (
        <Input
          className=""
          type="number"
          name="price"
          placeholder="Prix du produit"
          value={formValues.price}
          onChange={handleInputChange}
        />
      )}

      {quantity && (
        <Input
          className=""
          type="number"
          name="quantity"
          placeholder="Quantité du produit"
          value={formValues.quantity}
          onChange={handleInputChange}
        />
      )}
      
      {ExpirationDate && (
        <div className="flex items-center gap-2" >
        <label htmlFor="ExpirationDate" className="px-6">
          Date d'expiration: 
       
        </label>
           <Input
          className=""
          type="date"
          name="ExpirationDate"
          placeholder="Date d'expiration"
          value={formValues.ExpirationDate}
          onChange={handleInputChange}
        />
        </div>
      )}

      {category && (
        <div className="flex items-center gap-2">
          <label htmlFor="category" className="px-6">
            Categories:{" "}
          </label>
          <div className="sm:col-span-3">
            <select
              name="category"
              value={formValues.category}
              onChange={handleInputChange}
              className="block w-[700px] mt-4 text-center bg-gray-900text-gray-400 rounded-md border-0 py-3 shadow-sm ring-1 ring-inset text-gray-600 bg-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option> choisir une catégorie</option>
              {categories.map((categorie) => (
                <option key={categorie?._id} value={categorie?.name}>
                  {categorie?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {email && (
        <Input
          className=""
          type="email"
          name="email"
          placeholder="Adresse Email"
          ariaLabel="Email Address"
          value={formValues.email}
          onChange={handleInputChange}
          error={errors.email}
        />
      )}

      {mobile && (
        <Input
          className=""
          type="text"
          name="mobile"
          placeholder="Téléphone"
          value={formValues.mobile}
          onChange={handleInputChange}
          error={errors.mobile}
        />
      )}

      {dropFile && (
        <Input type="file" onChange={handleImageChange} name="image" />
      )}
      {site && (
        <div className="flex items-center gap-2">
          <label htmlFor="isAdmin" className="px-6">
            Site:{" "}
          </label>
          <div className="sm:col-span-3">
            <select
              name="site"
              value={formValues.site}
              onChange={handleInputChange}
              className="block w-[700px] mt-4 text-center bg-gray-900text-gray-400 rounded-md border-0 py-3 shadow-sm ring-1 ring-inset text-gray-600 bg-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option> choisir une site</option>
              {sites.map((site) => (
                <option key={site?._id} value={site?.name}>
                  {site?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {description && (
        <Input
          className=""
          type="textarea"
          name="description"
          placeholder="Description"
          value={formValues.description}
          onChange={handleInputChange}
        />
      )}

      {password && (
        <Input
          className=""
          type="password"
          name="password"
          placeholder="Mot de Passe"
          aria-label="Password"
          value={formValues.password}
          onChange={handleInputChange}
          error={errors.password}
          showPassword={showPassword.password}
          setShowPassword={setShowPassword}
          togglePasswordVisibility={(e) =>
            togglePasswordVisibility(e, "password")
          }
        />
      )}

      {confirmPassword && (
        <Input
          className=""
          type="password"
          name="confirmPassword"
          placeholder="Confirmez le Mot de Passe"
          value={formValues.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          showPassword={showPassword.confirmPassword}
          setShowPassword={setShowPassword}
          togglePasswordVisibility={(e) =>
            togglePasswordVisibility(e, "confirmPassword")
          }
        />
      )}

      {role && (
        <Input
          type="select"
          name="role"
          value={formValues.role}
          roleChange={handleInputChange}
        />
      )}

      <div className="flex flex-col items-center justify-between gap-y-4 mt-4">
        <Button
          type="submit"
          onClick={() => {}}
          className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
};

export default Form;
