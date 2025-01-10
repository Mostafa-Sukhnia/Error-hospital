import React, { useState } from "react";
import app from "../config/firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import LoginPhotot from "../Assets/image/Login.png";
import { Link } from "react-router-dom";
import GoogleLogo from "../Assets/image/LogoGoogle.png";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

const SignIn = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [userName, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassWord, setShowPassWord] = useState(false);
  const [send, setSend] = useState(false);
  const [breds, setBreds] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, userName, password);
      const userRes = doc(db, "users", res.user.uid);
      const userr = await getDoc(userRes);
      const userData = userr.data();
      if (userData?.role === "admin") {
        setSuccess("admin");
      } else if (userData?.isBanned) {
        setError("You are banned from accessing the site.");
        await auth.signOut();
        alert("You are banned from accessing the site.");
        navigate("/");
      } else {
        setError("");
        navigate("/");
      }
      setSuccess("");
    } catch (err) {
      setError("Email or password is wrong, Try again");
    }
  };

  const showHandling = () => {
    setShowPassWord(!showPassWord);
  };

  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const successHandler = (x) => {
    setInterval(() => {
      setBreds(breds + ".");
    }, 800);
    setTimeout(() => {
      navigate(`/${x}`);
      clearInterval();
    }, 3000);
    return (
      <div className="w-screen h-screen bg-[#00000050] fixed top-0 left-0 z-[10000] flex justify-center items-center">
        <div className=" px-8 pt-14 pb-8 bg-white z-[9999] rounded-xl shadow-xl flex flex-col items-center justify-center text-siteColor relative">
          <p className="text-center ">You are logged in!</p>
          <p className="text-center">
            Welcome back! We’re glad to see you again.
          </p>
          <p className="text-center">Redirecting you shortly{`${breds}`}</p>
          <div className="flex justify-center items-center w-[85px] h-[85px]  bg-green-500 border-4  rounded-full border-green-500 absolute -top-10 left-[50%] translate-x-[-50%]">
            <i className="fa-solid fa-check text-[40px] text-white"></i>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen overflow-hidden flex items-center font-poppins">
      {success !== null ? successHandler(success) : ""}
      <form
        className="container mx-auto flex items-center gap-8"
        onSubmit={signIn}
      >
        <div className="bg-gradient-to-r relative from-blue-500 to-cyan-500 w-full rounded-xl h-[95vh] overflow-hidden max-md:hidden">
          <img
            src={LoginPhotot}
            className="w-[100%] 2xl:w-[85%] h-full object-cover object-center"
            alt="Login"
          />
          <h1 className="text-3xl font-bold text-[#fff] absolute top-6 left-6">
            E<span className="text-[#06b6d4]">r</span>r
            <span className="text-[#06b6d4]">o</span>r
          </h1>
          <Link
            to="/"
            className="flex gap-2 items-top text-xl font-bold text-[#fff] absolute top-8 right-6"
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
            <h1 className="text-4xl font-bold text-siteColor">
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
              className={`w-full bg-[#eee] border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none hover:border-l-secondColor hover:bg-white duration-500 ${
                error ? "border-red-500 bg-red-100" : ""
              }`}
              value={userName}
              onChange={(e) => setUser(e.target.value)}
              required
            />
            <div className="w-full relative">
              <input
                type={`${showPassWord ? "text" : "password"}`}
                placeholder="Password"
                className={`w-full bg-[#eee] border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none hover:border-l-secondColor hover:bg-white duration-500 ${
                  error ? "border-red-500 bg-red-100" : ""
                }`}
                value={password}
                maxLength={20}
                minLength={6}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa-regular fa-eye ${
                  error ? "text-red-500" : ""
                } absolute top-[18px] right-4 z-[1000] text-siteColor cursor-pointer hover:text-secondColor duration-200 ${
                  showPassWord ? "block" : "hidden"
                }`}
                onClick={showHandling}
              ></i>
              <i
                className={`fa-regular fa-eye-slash ${
                  error ? "text-red-500" : ""
                } absolute top-[18px] right-4 z-[1000] text-siteColor cursor-pointer hover:text-secondColor duration-200 ${
                  showPassWord ? "hidden" : "block"
                }`}
                onClick={showHandling}
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
                  className={` text-white  cursor-pointer z-30 ${
                    send ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  value="Login"
                  disabled={send}
                  onClick={() => setSend(!send)}
                />
              )}
            </div>

            <p className="text-red-500 text-[12px]">{error}</p>
            <div className="relative">
              <p className="text-center bg-white font-bold text-siteColor">
                Or login with
              </p>
              <button
                className="flex gap-3 items-center border-[1px] border-gray-300 pr-4 pl-2 py-2 rounded-lg w-full justify-between mt-[20px] hover:bg-[#eee] duration-500 hover:text-[#4286f5]"
                onClick={SignInWithGoogle}
                disabled={send}
              >
                <img
                  src={GoogleLogo}
                  alt="Sign in with Google"
                  className="w-[40px]"
                />
                <p className="font-bold">Google</p>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
