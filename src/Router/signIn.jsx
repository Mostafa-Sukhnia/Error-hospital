import React, { useState } from "react";
import app from "../config/firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import LoginPhotot from "../Assets/image/Login.png";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from "../Assets/image/LogoGoogle.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { useSelector } from "react-redux";
const SignIn = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [userName, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassWord, setShowPassWord] = useState(false);
  const [send, setSend] = useState(false);
  const navigate = useNavigate();
  const mode = useSelector((state) => state.state.mode);
  // دالة لتسجيل الدخول باستخدام البريد وكلمة المرور
  const signIn = async (e) => {
    e.preventDefault();
    setSend(true);
    try {
      const res = await signInWithEmailAndPassword(auth, userName, password);
      const userRes = doc(db, "users", res.user.uid);
      const userr = await getDoc(userRes);
      const userData = userr.data();
      handleUserRole(userData);
    } catch (err) {
      setError("Email or password is wrong, Try again");
    } finally {
      setSend(false);
    }
  };

  // دالة للتعامل مع الدور
  const handleUserRole = (userData) => {
    if (userData?.role === "admin") {
      navigate("admin");
    } else if (userData?.isBanned) {
      setError("You are banned from accessing the site.");
      alert("You are banned from accessing the site.");
      navigate("/");
    } else {
      setError("");
      navigate("/");
    }
  };

  // دالة لإظهار أو إخفاء كلمة المرور
  const togglePasswordVisibility = () => {
    setShowPassWord(!showPassWord);
  };

  // دالة لتسجيل الدخول باستخدام حساب جوجل
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={`${mode ? "dark" : ""}`}>
      <div className="dark:bg-[#121212] h-[100vh] flex justify-center items-center">
        <form
          className="container mx-auto flex items-center gap-8"
          onSubmit={signIn}
        >
          <div className="bg-gradient-to-r relative from-blue-500 to-cyan-500 w-full rounded-xl h-[95vh] overflow-hidden max-md:hidden dark:to-[#121212]">
            <img
              src={LoginPhotot}
              className="h-full object-cover"
              alt="Login"
            />
            <h1 className="text-3xl font-bold text-[#fff] absolute top-6 left-6">
              E<span className="text-[#06b6d4]">r</span>r
              <span className="text-[#06b6d4]">o</span>r
            </h1>
            <Link
              to="/"
              className="flex gap-2 items-center text-xl font-bold text-[#fff] dark:text-secondColor absolute top-8 right-6"
            >
              <i className="fa-solid fa-house"></i>
              <p>Home</p>
            </Link>
          </div>
          <div className="w-full max-md:w-[75%] max-md:m-auto h-[75vh]">
            <div className="xl:px-[100px]">
              <Link
                to="/"
                className="max-md:flex md:hidden text-xl font-bold text-siteColor mb-4 items-center gap-2"
              >
                <i
                  className="fa-solid fa-house text-secondColor"
                  title="Go BACK TO HOME HUNY"
                ></i>
                <p>
                  Go <span className="text-secondColor">back</span> to hom
                  <span className="text-secondColor">e</span>
                </p>
              </Link>
              <h1 className="text-4xl font-bold text-siteColor dark:text-blue-400">
                Log in to our Hospital
              </h1>
              <p className="text-gray-500 pt-2">
                Don't have an account?{" "}
                <Link to="/signup" className="underline text-secondColor">
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="flex flex-col my-[50px] gap-6 xl:px-[100px]">
              <input
                type="email"
                placeholder="Email"
                className={`w-full bg-[#eee] border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none hover:border-l-secondColor hover:bg-white duration-500  dark:bg-darkColor dark:text-gray-400 ${
                  error ? "border-red-500 bg-red-100" : ""
                }`}
                value={userName}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <div className="w-full relative">
                <input
                  type={showPassWord ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full bg-[#eee] border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none hover:border-l-secondColor hover:bg-white duration-500 dark:bg-darkColor dark:text-gray-400 ${
                    error ? "border-red-500 bg-red-100" : ""
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i
                  className={`fa-regular fa-eye ${
                    showPassWord ? "block" : "hidden"
                  } absolute top-[18px] right-4 z-[1000] text-siteColor cursor-pointer`}
                  onClick={togglePasswordVisibility}
                ></i>
                <i
                  className={`fa-regular fa-eye-slash ${
                    !showPassWord ? "block" : "hidden"
                  } absolute top-[18px] right-4 z-[1000] text-siteColor cursor-pointer`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
              <div
                className={`w-full bg-blue-500 p-2 rounded-lg ${
                  send ? "cursor-auth" : "cursor-pointer"
                } flex justify-center items-center`}
              >
                {send ? (
                  <div className="w-6 h-6 border-[2px] border-t-gray-300 border-x-gray-300 border-b-transparent rounded-full animate-spin"></div>
                ) : (
                  <input
                    required
                    type="submit"
                    className={`text-white cursor-pointer z-30 ${
                      send ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    value="Login"
                    disabled={send}
                  />
                )}
              </div>
              <p className="text-red-500 text-[12px]">{error}</p>
              <div className="relative">
                <p className="text-center font-bold text-siteColor">
                  Or login with
                </p>
                <button
                  className="flex gap-3 items-center border-[1px] border-gray-300 pr-4 pl-2 py-2 rounded-lg w-full justify-between mt-[20px] hover:bg-[#eee] duration-500 hover:text-[#4286f5]"
                  onClick={signInWithGoogle}
                  disabled={send}
                >
                  <img
                    src={GoogleLogo}
                    alt="Sign in with Google"
                    className="w-[40px]"
                  />
                  <p className="font-bold dark:text-secondColor">Google</p>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
