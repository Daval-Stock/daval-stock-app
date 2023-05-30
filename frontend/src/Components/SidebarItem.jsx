import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const SidebarItem = ({ icon: Icon, label, active, href }) => {
  return (
    <Link
      to={href}
      className={twMerge(
        `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
        active && "text-white"
      )}
    >
      <Icon size={26} className="w-6 h-6" />
      <p className="truncat w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
