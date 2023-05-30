import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

const Box = ({ children, className }) => {
  console.log(className);
  return (
    <div
      className={twMerge(
        `
        bg-neutral-800
        rounded-lg
        h-fit
        w-full
        `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
