import clsx from "clsx";
import { AiOutlineDownload } from "react-icons/ai";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible, AiFillLock } from "react-icons/ai";

const Input = ({
  className,
  type,
  name,
  roleChange,
  placeholder,
  ariaLabel,
  value,
  onChange,
  showPassword,
  setShowPassword,
  togglePasswordVisibility,
  error,
}) => {
  if (error) {
    toast.error(error);
  }

  return (
    <div className="w-full mt-4">
      {type === "file" ? (
        <>
          <label
            htmlFor="dropzone-file"
            className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
          >
            <AiOutlineDownload className="w-6 h-6 text-gray-300 dark:text-gray-500" />

            <h2 className="mx-3 text-gray-400">Image</h2>

            <input
              type={type}
              name={name}
              placeholder={placeholder}
              aria-label={ariaLabel}
              value={value}
              onChange={onChange}
              id="dropzone-file"
              className={clsx(className, "hidden")}
            />
          </label>
        </>
      ) : type === "select" ? (
        <div className="flex items-center gap-2">
          <label htmlFor="isAdmin" className="px-6">
            Rôle:{" "}
          </label>
          <div className="sm:col-span-3">
            <select
              name={name}
              value={value}
              onChange={roleChange}
              className="block w-[700px] mt-4 text-center bg-gray-900text-gray-400 rounded-md border-0 py-3 shadow-sm ring-1 ring-inset text-gray-600 bg-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>
        </div>
      ) : type === "password" ? (
        <div className="relative flex items-center mt-4">
          <span className="absolute">
            <AiFillLock className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
          </span>
          <input
            className={clsx(
              className,
              "w-full px-4 pl-10 py-2 mt-2 text-gray-600 dark:text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            )}
            type={showPassword ? "text" : "password"}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <button
            type="button"
            name={name}
            onClick={(e) => togglePasswordVisibility(e)}
            className="absolute right-3 top-3 text-gray-500 focus:outline-none"
          >
            {showPassword ? (
              <AiFillEye className="w-6 h-6" />
            ) : (
              <AiFillEyeInvisible className="w-6 h-6" />
            )}
          </button>
        </div>
      ) : (
        <input
          className={clsx(
            className,
            "w-full px-4 py-2 mt-2 text-gray-600 dark:text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          )}
          type={type}
          name={name}
          placeholder={placeholder}
          aria-label={ariaLabel}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
