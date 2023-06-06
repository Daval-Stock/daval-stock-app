import React from "react";
import Input from "./Input";
import { Link } from "react-router-dom";
import Button from "./Button";

const Form = ({
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
  return (
    <form onSubmit={handleSubmit} encType={encType} method={method}>
      {name && (
        <Input
          className=""
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          ariaLabel="username"
          value={name}
          onChange={handleInputChange}
          error={errors.email}
        />
      )}

      {dropFile && (
        <label
          htmlFor="dropzone-file"
          className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>

          <h2 className="mx-3 text-gray-400">Photo profil</h2>

          <input
            id="dropzone-file"
            type="file"
            onChange={handleImageChange}
            className=""
            name="image"
          />
        </label>
      )}

      <Input
        className=""
        type="email"
        name="email"
        placeholder="Adresse Email"
        ariaLabel="Email Address"
        value={email}
        onChange={handleInputChange}
        error={errors.email}
      />

      <Input
        className=""
        type="text"
        name="mobile"
        placeholder="Téléphone"
        value={mobile}
        onChange={handleInputChange}
        error={errors.mobile}
      />

      {site && (
        <div className="sm:col-span-3">
          <label
            htmlFor="site"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
          >
            Site
          </label>
          <div className="mt-2">
            <select
              name="site"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="block w-full text-center dark:bg-gray-900 dark:text-gray-400 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
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

      <Input
        className=""
        type="password"
        name="password"
        placeholder="Mot de Passe"
        aria-label="Password"
        value={password}
        onChange={handleInputChange}
        error={errors.password}
      />

      <Input
        className=""
        type="password"
        name="confirmPassword"
        placeholder="Confirmez le Mot de Passe"
        value={confirmPassword}
        onChange={handleInputChange}
        error={errors.confirmPassword}
      />

      <div className="flex items-center justify-between mt-4">
        <Link
          href="#"
          className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
        >
          Mot de Passe oublié ?
        </Link>
        <Button
          label={buttonLabel}
          type="submit"
          onClick={() => {}}
          className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        />
      </div>
    </form>
  );
};

export default Form;
