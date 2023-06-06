import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  type = "button",
  onClick,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        `w-full rounded-full bg-orange-400 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition`,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
