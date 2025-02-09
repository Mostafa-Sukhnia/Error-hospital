import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
const Header = () => {
  const mode = useSelector((state) => state.state.mode);
  const [slidingMenu, setSlidingMenu] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const navigate = useNavigate();
  // Fetch data from Firestore
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const SignOut = async () => {
    await signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state on login/logout
      if (currentUser?.email === "admin@gmail.com") {
        navigate("/admin"); // Redirect to admin page
      }
    });

    fetchData(); // Fetch data on component mount

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [auth]);

  return (
    <div className={`w-full shadow-lg ${mode ? "dark" : ""}`}>
      <div className="dark:bg-[#121212]">
        <header className="font-poppins container flex justify-between py-4 items-center ">
          <div
            className={`fixed top-0 right-0 ${
              slidingMenu ? "w-[80%]" : "w-0"
            } transition-all duration-500 h-screen bg-[#eee] z-50`}
          >
            <div
              className={`w-[100%] h-full bg-[#307bc4] duration-500 delay-500 absolute top-0 left-0 z-[1000] redred ${
                slidingMenu ? "!w-[0%]" : "delay-0 duration-[300ms] !w-[100%]"
              } dark:bg-[#212121]`}
            ></div>

            <div className="w-full flex justify-between items-center text-siteColor pb-4 border-b-[0.5px] border-gray-300 px-4 shadow-md pt-[20px] dark:bg-[#22262B] ">
              <p className="font-bold text-2xl">
                Se<span className="text-secondColor">tt</span>ings
              </p>
              <div className="relative">
                <i className="fa-solid fa-gear animate-spin text-2xl"></i>
                <i className="fa-solid fa-gear absolute top-4 right-6 animate-spin text-secondColor"></i>
              </div>
            </div>

            <div className="w-full h-[81vh] bg-gray-100 dark:bg-[#1E1E1E] flex flex-col">
              <Link
                className=" hover:text-secondColor font-bold text-siteColor text-xl hover:translate-x-5 transition-all duration-200 p-8 border-b"
                to="/find-doctor"
              >
                find doctor
              </Link>
              <Link
                className=" hover:text-secondColor font-bold text-siteColor text-xl hover:translate-x-5 transition-all duration-200 p-8 border-b"
                to="/about"
              >
                about
              </Link>
              <Link
                className=" hover:text-secondColor font-bold text-siteColor text-xl hover:translate-x-5 transition-all duration-200 p-8 border-bx"
                to="/contact"
              >
                contact
              </Link>
            </div>

            <div className="w-full h-[12vh] shadow-lg flex items-center justify-between px-4 dark:bg-[#22262B]">
              <ul className="flex gap-4 w-full lg:hidden justify-between">
                <li>
                  {user ? (
                    <button
                      onClick={SignOut}
                      className="bg-[#307BC4] p-2 rounded-lg text-white font-bold"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      to="/signup"
                      className="bg-[#307BC4] p-2 rounded-lg text-white font-bold border-b-[2px] border-[#1b4b7a] shadow-md w-1/2"
                    >
                      Sign Up
                    </Link>
                  )}
                </li>
                {!user && (
                  <li>
                    <Link
                      to="/signin"
                      className="border-2 border-[#307BC4] p-2 text-[#307BC4] font-bold rounded-lg shadow-lg hover:shadow-md hover:shadow-[#307BC4] duration-200 w-1/2"
                    >
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <i
              className={`fa-solid fa-circle-xmark absolute z-[100] top-[50%] left-[-18px] text-4xl duration-500 delay-[600ms] cursor-pointer ${
                slidingMenu === false
                  ? "rotate-180 left-[18px] text-blue-500"
                  : "left-[-18px] text-[#307bc4]"
              }`}
              onClick={() => {
                setSlidingMenu(!slidingMenu);
              }}
            ></i>
          </div>
          <Link to="/" className="text-3xl font-bold text-[#274760]">
            E<span className="text-[#307BC4]">rr</span>or
          </Link>

          <ul className="flex gap-6 max-lg:hidden text-[#274760] dark:text-secondColor ">
            <li>
              <NavLink className="hover:text-blue-400" to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink className="hover:text-blue-400" to="/find-doctor">
                Find Doctor
              </NavLink>
            </li>

            <li>
              <NavLink className="hover:text-blue-400" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          <div>
            <ul className="flex gap-4 max-lg:hidden">
              {user === null ? (
                <>
                  <li>
                    <Link
                      to="/signup"
                      className="bg-[#307BC4] p-2 rounded-lg text-white font-bold border-b-[2px] border-[#1b4b7a] shadow-md"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signin"
                      className="border-2 border-[#307BC4] p-2 text-[#307BC4] font-bold rounded-lg shadow-lg hover:shadow-md hover:shadow-[#307BC4] duration-200"
                    >
                      Sign In
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={SignOut}
                    className="bg-[#307BC4] p-2 rounded-lg text-white font-bold"
                  >
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </div>

          <i
            className="fa-solid fa-bars block text-2xl text-secondColor cursor-pointer lg:hidden"
            onClick={() => {
              setSlidingMenu(!slidingMenu);
            }}
          ></i>
        </header>
      </div>
    </div>
  );
};

export default Header;
