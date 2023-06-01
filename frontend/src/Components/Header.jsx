import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axiosInstance from "./axiosInstance";

const Header = ({ children, className }) => {
  const router = useNavigate();
  const handleLogout = () => {
    //Handle logout  in the future
  };
  const authToken = localStorage.getItem("authToken");
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (authToken) {
      fetchUserProfile();
    } else {
      navigate("/ConnexionUI");
    }
  }, [authToken]);
  const fetchUserProfile = async () => {
    axiosInstance
      .get("/users/profile")
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={twMerge(
        `
    text-white
    h-fit
    bg-gradient-to-b
    from-orange-600
    p-6

  `,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router(-1)}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition "
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router(1)}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition "
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white items-center justify-center hover:opacity-75 transition ">
            <HiHome size={35} className="text-black" />
          </button>
          <button className="rounded-full p-2 bg-white items-center justify-center hover:opacity-75 transition ">
            <BiSearch size={35} className="text-black" />
          </button>
        </div>
        <div className="flex gap-x-4 items-center justify-between">
          {authToken ? (
            <div className="flex ">
              <Link to="/profile">
                <div className="flex items-center gap-x-3 mr-3">
                  <div className="">{userProfile?.name}</div>

                  <div className="">
                    <FaUserCircle size={35} />
                  </div>
                </div>
              </Link>

              <div className="">
                <Link to="/LogoutUI">
                  <Button
                    onClick={() => {}}
                    className="bg-transparent bg-white px-6 py-2 font-medium"
                  >
                    Logout
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={() => {}}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>

              <div>
                <Link to="/ConnexionUI">
                  <Button
                    onClick={() => {}}
                    className="bg-transparent bg-white px-6 py-2 font-medium"
                  >
                    Log In
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
