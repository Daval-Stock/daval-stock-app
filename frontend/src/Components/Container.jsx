import Footer from "./Footer/Footer";
import FooterLink from "./Footer/FooterLink";
import Navbar from "./Navbar/Navbar";
const Container = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  return (
    <>
      <Navbar />
      {children}
      {authToken ? <Footer /> : <FooterLink />}
    </>
  );
};

export default Container;
