import clsx from "clsx";

const Button = ({ label, type, onClick, className }) => {
  return (
    <button type={type} onClick={onClick} className={clsx(className)}>
      {label}
    </button>
  );
};

export default Button;
