import React, { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import app from "../config/firebase.js";
import { db } from "../config/firebase.js";
import { setDoc, doc } from "firebase/firestore";
import SignUP from "../Assets/image/SignUP.png";
import { Link } from "react-router-dom";
import GoogleLogo from "../Assets/image/LogoGoogle.png";

const SignUp = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phonNumber, setPhonNumber] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [birth, setBirth] = useState("");
  const [live, setLive] = useState("");
  const [gender, setGender] = useState("");
  const [from, setFrom] = useState("");
  const [role, setRole] = useState("user");
  const [agreeToTheTermsConditions, setAgreeToTheTermsConditions] =
    useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [steps, setSteps] = useState(true);
  const [pointes, setPointes] = useState(".");
  const [showPassWord, setSwowPassWord] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const SignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        fname,
        lname,
        birth,
        from,
        live,
        gender,
        phonNumber,
        email: user.email,  
        role,
      });
      setSuccess(true);  
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const showHandling = () => {
    setSwowPassWord(!showPassWord);
  };

  const formHandileing = (e) => {
    e.preventDefault();
    console.log(fname, lname, phonNumber, gender, live, from, birth);
  };

  const signUpHandling = async (e) => {
    e.preventDefault();
    if (
      /^[a-z0-9](?:[a-z0-9_%+-]*\.[a-z0-9_%+-]+|[a-z0-9_%+-]*)@gmail\.com$/i.test(
        email
      ) &&
      password.length >= 6 &&
      agreeToTheTermsConditions &&
      password === passwordConfirm
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          fname,
          lname,
          birth,
          from,
          live,
          gender,
          phonNumber,
          email,
          role,
          isBanned: false,
          img: "",
        });
        setSuccess(!success);
      } catch (err) {
        console.error(err);
        setError(err);
        console.log(error);
      }
    }
  };
  const SuccessHandling = () => {
    setInterval(() => {
      setPointes(pointes + ".");
    }, 750);

    setTimeout(() => {
      navigate("/");
    }, 3000);

    return (
      <div className="w-screen h-screen bg-[#00000050] fixed top-0 left-0 z-[10000] flex justify-center items-center">
        <div className="w-[500px] h-[300px] max-md:w-[300px] max-md:h-[200px] bg-white z-[9999] rounded-xl shadow-xl flex flex-col items-center justify-center text-siteColor">
          <div className="text-center">
            <i className="fa-solid fa-check text-[40px] text-white bg-green-500 border-4 px-4 py-3 rounded-full border-green-500"></i>
          </div>
          <p className="text-center mt-5">You are logged in!</p>
          <p className="text-center">
            Welcome back! We’re glad to see you again.
          </p>
          <p className="text-center">
            We will redirect you to the home page shortly{pointes}
          </p>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full  h-screen overflow-hidden flex items-center font-poppins container gap-8">
      {success ? SuccessHandling() : ""}
      <div className="w-full max-md:w-[75%] max-md:m-auto h-[75vh]">
        <div>
          <Link
            to="/"
            className=" max-md:flex md:hidden text-xl font-bold text-siteColor mb-4 items-center gap-2"
          >
            <i
              className="fa-solid fa-house text-secondColor"
              title="Go BACK TO HOME HUNY"
            ></i>
            <p>
              {" "}
              Go <span className="text-secondColor">back</span> to hom
              <span className="text-secondColor">e</span>
            </p>
          </Link>
          <h1 className="  text-4xl font-bold text-siteColor">
            W<span className="text-secondColor">elc</span>ome{" "}
            <span className="text-secondColor">in</span> our{" "}
            <span className="text-secondColor">Hos</span>pital
          </h1>
          <p className="text-gray-500 pt-2">
            do you have an account?{" "}
            <Link to="/signin" className="underline text-secondColor">
              signIn
            </Link>
          </p>
          <div className={`${steps ? "block" : "hidden"}`}>
            <form
              onSubmit={(e) => formHandileing(e)}
              className="flex flex-col my-[50px] gap-6 xl:pr-[100px]"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="your first name"
                  className="bg-[#eee] pl-12 w-full  border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white duration-500 focus:bg-white"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                  minLength={6}
                  maxLength={12}
                />
                <i className="fa-solid fa-user absolute top-[16px] text-[18px] text-gray-400 left-4"></i>
              </div>
              <div className="relative">
                <input
                  required
                  type="text"
                  placeholder="your second name"
                  className="bg-[#eee] pl-12 w-full  border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white focus:bg-white duration-500"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  minLength={6}
                  maxLength={12}
                />
                <i className="fa-solid fa-user absolute top-[16px] text-[18px] text-gray-400 left-4"></i>
              </div>
              <div className="relative">
                <input
                  required
                  type="text"
                  className="   bg-[#eee] pl-12 w-full  border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white focus:bg-white duration-500"
                  placeholder="Phone"
                  value={phonNumber}
                  onChange={(e) => setPhonNumber(e.target.value)}
                  minLength={10}
                  maxLength={10}
                />
                <i className="fa-solid fa-phone absolute top-[16px] left-4 text-gray-400"></i>
              </div>
              <div className="flex gap-2  justify-center">
                <div className="relative w-[50%]">
                  <select
                    required
                    className="bg-[#eee] p-3 pl-12 w-full h-[50px] border-[1.5px] border-gray-300 rounded-lg focus:border-secondColor focus:outline-none hover:border-l-secondColor hover:bg-white focus:bg-white duration-500 text-gray-400"
                    name="gender"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setGender(e.target.value);
                    }}
                  >
                    <option value="gender">your Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <i className="fa-solid fa-venus-mars absolute top-[16px] left-4 text-gray-400"></i>
                </div>

                <div className="relative w-[50%]">
                  <select
                    required
                    name="gender"
                    className="bg-[#eee] p-3 pl-12 w-full h-[50px] border-[1.5px] border-gray-300 rounded-lg focus:border-secondColor focus:outline-none hover:border-l-secondColor hover:bg-white focus:bg-white duration-500 text-gray-400"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setFrom(e.target.value);
                    }}
                  >
                    <option value="gender">From</option>
                    <option value="America">America</option>
                    <option value="Syria">Syria</option>
                    <option value="Germany">Germany</option>
                  </select>
                  <i className="fa-solid fa-earth-americas absolute top-[16px] left-4 text-gray-400"></i>
                </div>
              </div>

              <div className="relative">
                <input
                  required
                  type="date"
                  className="bg-[#eee] p-3 pl-12 w-full h-[50px] border-[1.5px] border-gray-300 rounded-lg focus:border-secondColor focus:outline-none hover:border-l-secondColor hover:bg-white focus:bg-white duration-500"
                  onChange={(e) => setBirth(e.target.value)}
                />
                <i className="fa-solid fa-cake-candles absolute top-[16px] left-4 text-gray-400"></i>
              </div>

              <div className="relative flex justify-between gap-3 w-full">
                <div className="w-[48%]">
                  <input
                    required
                    type="password"
                    className="bg-[#eee] pl-12 w-full h-[50px] border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none hover:border-l-secondColor hover:bg-white focus:bg-white duration-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                  />
                  <i className="fa-solid fa-lock absolute top-[16px] left-4 text-gray-400"></i>
                </div>
                <div className="w-[48%]">
                  <input
                    required
                    type="password"
                    className="bg-[#eee] pl-12 w-full h-[50px] border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none hover:border-l-secondColor hover:bg-white focus:bg-white duration-500"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    minLength={6}
                  />
                  <i className="fa-solid fa-lock absolute top-[16px] left-4 text-gray-400"></i>
                </div>
              </div>

              <div className="flex gap-2 justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-success"
                    onChange={() =>
                      setAgreeToTheTermsConditions(!agreeToTheTermsConditions)
                    }
                  />
                  <span> Agree to the terms and conditions</span>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-[200px] text-lg text-white bg-secondColor px-6 py-3 rounded-md disabled:opacity-60"
                    disabled={!agreeToTheTermsConditions}
                  >
                    SignUp
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-8 mb-5">
            <button
              onClick={SignInWithGoogle}
              className="w-full border-[1px] border-siteColor text-center py-2 text-siteColor rounded-xl flex justify-center gap-4 items-center text-lg hover:bg-siteColor hover:text-white duration-300"
            >
              <img src={GoogleLogo} alt="google logo" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
      <div className="w-[45%] max-md:hidden">
        <img src={SignUP} className="w-full h-full object-cover" alt="signup" />
      </div>
    </div>
  );
};

export default SignUp;
