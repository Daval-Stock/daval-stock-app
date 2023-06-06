import Footer from "./Footer/Footer";
import Header from "./Header";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  return (
    <div className="">
      <Sidebar>
        <div className="bg-neutral-800 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
          <Header>
            <div className="mb-1">{children}</div>
          </Header>
          <Footer />
        </div>
      </Sidebar>
    </div>
  );
};

export default Layout;
