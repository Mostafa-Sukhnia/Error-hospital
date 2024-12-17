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
        email,
        role,
      });
      console.log("Logged in with Google and user data stored");
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
          isBanned:false,
          img:'',
        });
        setSuccess(!success);
      } catch (err) {
        console.error(err);
        setError(err)
        console.log(error)
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
                  <i className="fa-solid fa-venus-mars absolute top-[18px] text-gray-400 left-4"></i>
                </div>

                <input
                  required
                  type="date"
                  className=" h-[50px] bg-[#eee] p-3 text-gray-400 w-[50%]  border-[1.5px] border-gray-300 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white focus:bg-white duration-500"
                  value={birth}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setBirth(e.target.value);
                  }}
                />
              </div>

              <div className="flex gap-2">
                <div>
                  <select
                    required
                    id="province"
                    className="bg-[#eee] p-3  w-full h-[50px]  border-[1.5px] border-gray-300 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white focus:bg-white duration-500 text-gray-400"
                    name="provinces"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setFrom(e.target.value);
                    }}
                  >
                    <option className="bg-black" value="">
                      your province
                    </option>
                    <option className="bg-black" value="aleppo">
                      Aleppo
                    </option>
                    <option className="bg-black" value="damascus">
                      Damascus
                    </option>
                    <option className="bg-black" value="homs">
                      Homs
                    </option>
                    <option className="bg-black" value="hama">
                      Hama
                    </option>
                    <option className="bg-black" value="idlib">
                      Idlib
                    </option>
                    <option className="bg-black" value="latakia">
                      Latakia
                    </option>
                    <option className="bg-black" value="tartus">
                      Tartus
                    </option>
                    <option className="bg-black" value="daraa">
                      Daraa
                    </option>
                    <option className="bg-black" value="sweida">
                      As-Suwayda
                    </option>
                    <option className="bg-black" value="deir-ez-zor">
                      Deir ez-Zor
                    </option>
                    <option className="bg-black" value="raqqa">
                      Raqqa
                    </option>
                    <option className="bg-black" value="hasakah">
                      Al-Hasakah
                    </option>
                    <option className="bg-black" value="quneitra">
                      Quneitra
                    </option>
                    <option className="bg-black" value="not-from-syria">
                      Not from Syria
                    </option>
                  </select>
                </div>
                <div>
                  {/* <label className="text-gray-400">
                    <i className="fa-solid fa-location-crosshairs text-blue-500"></i>{" "}
                    
                  </label> */}
                  <select
                    required
                    onChange={(e) => {
                      console.log(e.target.value);
                      setLive(e.target.value);
                    }}
                    className="bg-[#eee] p-3  w-full h-[50px]  border-[1.5px] border-gray-300 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white focus:bg-white duration-500 text-gray-400 scroll-bar-500"
                    name="villages"
                  >
                    <optgroup className="bg-black" label="Idlib Countryside">
                      <option value=" ">your loacation</option>
                      <option value="aqrabat">aqrabat</option>
                      <option value="Atma">Atma</option>
                      <option value="sarmada">Sarmada</option>
                      <option value="al-dana">Al-Dana</option>
                      <option value="maaratalnuman">Maarat Al-Numan</option>
                      <option value="kafr-nabl">Kafr Nabl</option>
                      <option value="binnish">Binnish</option>
                      <option value="taftanaz">Taftanaz</option>
                      <option value="ariha">Ariha</option>
                      <option value="killi">Killi</option>
                      <option value="harim">Harim</option>
                      <option value="salqin">Salqin</option>
                      <option value="qahtaniya">Qahtaniya</option>
                      <option value="darkush">Darkush</option>
                    </optgroup>
                    <optgroup className="bg-black" label="Aleppo Countryside">
                      <option value="al-bab">Al-Bab</option>
                      <option value="jarablus">Jarablus</option>
                      <option value="azaz">Azaz</option>
                      <option value="mare">Mare</option>
                      <option value="tel-rifaat">Tel Rifaat</option>
                      <option value="suran">Suran</option>
                      <option value="qabasin">Qabasin</option>
                      <option value="bza'a">Bza'a</option>
                      <option value="afrin">Afrin</option>
                      <option value="jindires">Jindires</option>
                      <option value="sharan">Sharan</option>
                      <option value="bulbul">Bulbul</option>
                      <option value="rajo">Rajo</option>
                      <option value="sheikh-hadid">Sheikh Hadid</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <button
                className="bg-white p-3 font-medium hover:bg-blue-500 hover:text-white w-full h-[50px] border-2 rounded-lg focus:outline-none border-blue-500 duration-500 text-blue-500 flex items-center justify-between"
                onClick={() => {
                  if (
                    fname !== "" &&
                    lname !== "" &&
                    phonNumber !== "" &&
                    gender !== "your Gender" &&
                    birth !== "" &&
                    from !== "" &&
                    live !== ""
                  ) {
                    setSteps(!steps);
                  } else {
                    setError("you should fill the inputs");
                  }
                }}
              >
                <p>Next</p>
                <i
                  className="fa-solid fa-right-long"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                ></i>
              </button>
              {/* <p className="text-red-500">{error}!</p> */}
            </form>
          </div>
          {/* *******+******** */}
          <form
            className={`flex flex-col my-[50px] gap-6 xl:pr-[100px] ${
              steps === false ? "flex" : "hidden"
            }`}
            onSubmit={(e) => {
              signUpHandling(e);
            }}
          >
            <div className="relative">
              <input
                required
                type="email"
                className="   bg-[#eee] pl-12 w-full  border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white focus:bg-white duration-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="fa-solid fa-user absolute top-[16px] left-4 text-gray-400"></i>
            </div>

            <div className="relative">
              <input
                minLength={6}
                maxLength={12}
                required
                type={`${showPassWord ? "text" : "password"}`}
                className="   bg-[#eee] pl-12 w-full  border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white focus:bg-white duration-500"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa-regular fa-eye absolute top-[16px] right-4 text-gray-400 cursor-pointer ${
                  showPassWord ? "hidden" : "block"
                }`}
                onClick={showHandling}
              ></i>
              <i
                className={`fa-regular fa-eye-slash absolute top-[16px] right-4 text-gray-400 cursor-pointer ${
                  showPassWord ? "block" : "hidden"
                }`}
                onClick={showHandling}
              ></i>
              <i className="fa-solid fa-key absolute top-[16px] left-4 text-gray-400"></i>
            </div>
            <div className="relative">
              <input
                required
                type={`${showPassWord ? "text" : "password"}`}
                className="   bg-[#eee] pl-12 w-full  border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white focus:bg-white duration-500"
                placeholder="password"
                minLength={6}
                maxLength={12}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <i
                className={`fa-regular fa-eye absolute top-[16px] right-4 text-gray-400 cursor-pointer ${
                  showPassWord ? "hidden" : "block"
                }`}
                onClick={showHandling}
              ></i>
              <i
                className={`fa-regular fa-eye-slash absolute top-[16px] right-4 text-gray-400 cursor-pointer ${
                  showPassWord ? "block" : "hidden"
                }`}
                onClick={showHandling}
              ></i>
              <i className="fa-solid fa-key absolute top-[16px] left-4 text-gray-400"></i>
            </div>
            <div className="flex gap-2 items-end">
              <input
                type="checkbox"
                id="check"
                required
                checked={agreeToTheTermsConditions}
                onChange={() =>
                  setAgreeToTheTermsConditions(!agreeToTheTermsConditions)
                }
                className="h-[25px] w-[25px]"
              />
              <div className="w-full justify-between">
                <label htmlFor="check">I agree to the </label>
                <Link to="/" className="text-secondColor underline">
                  Terms&Conditions
                </Link>
              </div>
            </div>
            <input
              value="submit"
              type="submit"
              className="bg-white p-3 text-center font-medium hover:bg-blue-500 hover:text-white  w-full h-[50px]  border-[2px]  rounded-lg  focus:outline-none  border-blue-500 duration-500 text-blue-500"
            />
            <p className="text-center bg-white font-bold  text-siteColor">
              Or SignUp with
            </p>

            <button
              className="flex gap-3 items-center border-[1px] border-gray-300 pr-4 pl-2 py-2 rounded-lg w-full justify-between hover:bg-[#eee] duration-500 hover:text-[#4286f5]"
              onClick={SignInWithGoogle}
            >
              <img
                src={GoogleLogo}
                alt="sign in with google"
                className="w-[40px]"
              />{" "}
              <p className="font-bold">Google</p>
            </button>
            <p
              onClick={() => setSteps(!steps)}
              className="cursor-pointer text-center font-bold text-secondColor"
            >
              Back
            </p>
          </form>
        </div>
      </div>
      <div className="bg-gradient-to-r  to-blue-500 from-cyan-500 w-full rounded-xl h-[95vh] overflow-hidden max-md:hidden relative flex justify-center">
        <img
          src={SignUP}
          className=" w-[100%] 2xl:w-[85%] h-full object-cover object-center"
          alt="Login"
        />
        <h1 className="text-3xl font-bold text-[#fff] absolute top-6  left-6">
          Error
        </h1>
        <Link
          to="/"
          className=" flex gap-2 items-center text-xl font-bold text-[#fff] absolute top-8 right-6"
        >
          <p>Home</p>
          <i className="fa-solid fa-house"></i>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
