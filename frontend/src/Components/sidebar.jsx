import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HiHome, HiUsers } from "react-icons/hi";
import { FiPackage } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { BsGraphUpArrow } from "react-icons/bs";
import Box from "./Box";
import { MdSell } from "react-icons/md";
import SidebarItem from "./SidebarItem";
import logoDaval from "../assets/logoDaval.png";
import { Link } from "react-router-dom";

const Sidebar = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;
  const routes = useMemo(
    () => [
      {
        label: "Home",
        active: pathname === "/",
        href: "/",
        icon: HiHome,
      },
      {
        label: "Search",
        active: pathname === "/Dashboard",
        href: "/Dashboard",
        icon: BiSearch,
      },
    ],
    [pathname]
  );
  const links = useMemo(() => [
    {
      label: "Tableau de bord",
      active: pathname === "/Trash",
      href: "/Trash",
      icon: GoGraph,
    },
    {
      label: "Utilisateurs",
      active: pathname === "/UsersUI",
      href: "/UsersUI",
      icon: HiUsers,
    },
    {
      label: "Produits",
      active: pathname === "/Product",
      href: "/Product",
      icon: FiPackage,
    },
    {
      label: "Ventes",
      active: pathname === "/Sales",
      href: "/Sales",
      icon: MdSell,
    },
    {
      label: "Etat du stock",
      active: pathname === "/#",
      href: "/#",
      icon: BsGraphUpArrow,
    },
  ]);
  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 text-white bg-black h-auto w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-5">
            <Link to="/">
              <img
                className="w-auto h-7 sm:h-8 text-orange-500"
                src={logoDaval}
                alt=""
              />
            </Link>
            {routes.map((item) => (
              <SidebarItem key={item.href} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <div className="flex flex-col gap-y-4 px-5 py-5">
            {links.map((item) => (
              <SidebarItem key={item.href} {...item} />
            ))}
          </div>
        </Box>
      </div>
      <main className="h-full flex-1 py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
