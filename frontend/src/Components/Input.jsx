import clsx from "clsx";
import { AiOutlineDownload } from "react-icons/ai";

const Input = ({
  className,
  type,
  name,
  placeholder,
  ariaLabel,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="w-full mt-4">
      {type === "file" ? (
        <>
          <label
            htmlFor="dropzone-file"
            className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
          >
            <AiOutlineDownload className="w-6 h-6 text-gray-300 dark:text-gray-500" />

            <h2 className="mx-3 text-gray-400">Photo profil</h2>

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

          {error && <span>{error}</span>}
        </>
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
