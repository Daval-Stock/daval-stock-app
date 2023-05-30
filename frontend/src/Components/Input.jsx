import clsx from "clsx";

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
          <input
            className={clsx(
              className,
              "block w-full px-4 py-2 mt-2 text-gray-600 dark:text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            )}
            type={type}
            name={name}
            placeholder={placeholder}
            aria-label={ariaLabel}
            value={value}
            onChange={onChange}
          />
          {error && <span>{error}</span>}
        </>
      ) : (
        <input
          className={clsx(
            className,
            "block w-full px-4 py-2 mt-2 text-gray-600 dark:text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
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
