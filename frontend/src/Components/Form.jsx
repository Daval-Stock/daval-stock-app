import React from "react";
import Input from "./Input";
import { Link } from "react-router-dom";
import Button from "./Button";
import { AiOutlineDownload } from "react-icons/ai";

const Form = ({
  formValues,
  handleSubmit,
  mobile,
  email,
  handleInputChange,
  handleImageChange,
  password,
  confirmPassword,
  site,
  setSite,
  sites,
  name,
  buttonLabel,
  encType,
  dropFile,
  method,
  errors,
}) => {
  console.log("confirmPassword:", confirmPassword);
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
        <Link
          href="#"
          className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
        >
          Mot de Passe oublié ?
        </Link>
      </div>
    </form>
  );
};

export default Form;
