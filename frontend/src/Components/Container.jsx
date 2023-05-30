import Footer from "./Footer/Footer";
import FooterLink from "./Footer/FooterLink";
import Navbar from "./Navbar/Navbar";
import { clsx } from "clsx";

const Container = ({ children, className }) => {
  const authToken = localStorage.getItem("authToken");

  return (
    <>
      <div className={clsx(className, "mx-2 min-h-lg p-30 sm:py-16 lg:py-50")}>
        {children}
      </div>
    </>
  );
};

export default Container;
