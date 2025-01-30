import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../Assets/image/bg-home.png";
import home_photo from "../Assets/image/home-photo.png";
import Dark from "../components/Dark.jsx";
import { useSelector } from "react-redux";
import aboutUs from "../Assets/image/aboutUs.png";
import img1 from "../Assets/image/department_icon_1.svg fill.png";
import img2 from "../Assets/image/department_icon_2.svg fill.png";
import img3 from "../Assets/image/department_icon_3.svg fill.png";
import img4 from "../Assets/image/department_icon_4.svg fill.png";
import img5 from "../Assets/image/department_icon_5.svg fill.png";
import department from "../Assets/image/department.png";
import avatar_1 from "../Assets/image/avatar_1.png.png";
import avatar_2 from "../Assets/image/avatar_2.png.png";
import avatar_3 from "../Assets/image/avatar_3.png.png";
import b1 from "../Assets/image/div.cs_brand-1.png";
import b2 from "../Assets/image/div.cs_brand-2.png";
import b3 from "../Assets/image/div.cs_brand-3.png";
import b4 from "../Assets/image/div.cs_brand-4.png";
import b5 from "../Assets/image/div.cs_brand-5.png";
import b6 from "../Assets/image/div.cs_brand-6.png";
import b7 from "../Assets/image/div.cs_brand.png";
import b8 from "../Assets/image/b2.png";
import homezip from '../Assets/image/home-photo.zip';
const Home = () => {
  const mode = useSelector((state) => state.state.mode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const [usually, setUsually] = useState(3);

  const usuallyHandler = (x) => {
    if (x === usually) {
      setUsually(0);
    } else {
      setUsually(x);
    }
  };
  return (
    <>
      {loading && (
        <div className="w-screen h-screen fixed top-0 l-0 bg-white flex justify-center items-center z-[1000]">
          <div className="w-12 h-12 border-[4px] border-t-gray-400 border-x-gray-400 border-b-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className={`${mode ? "dark" : ""} `}>
        <div
          className={`relative w-full h-[93.1vh] bg-cover bg-center flex gap-4 justify-center items-center`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center dark:grayscale-[75%] duration-200 transition-all"
            style={{ backgroundImage: `url(${bg})` }}
          ></div>
          <Dark />
          <div className="flex justify-center relative container">
            <div className="w-[50%] max-lg:text-center">
              <h1 className="text-siteColor text-[3rem] font-bold mt-6">
                Your Partner in
                <br />
                Health and Wellness
              </h1>
              <p className="text-siteColor text-md mt-4">
                We are committed to providing you with the best medical and
                healthcare services to help you live healthier and <br />{" "}
                happier.
              </p>
              <a
                href="https://youtu.be/PJJsGuWouyk?si=mywQ8ndK_35RLGxc"
                target="_blank"
                className="flex gap-4 items-center mt-10 text-siteColor max-lg:justify-center lg:hidden"
              >
                <div className="border-2 border-siteColor px-2 py-[2px] rounded-full">
                  <i className="fa-solid fa-play text-4xl pt-[1px] pl-[3px]"></i>
                </div>
                <p className="text-lg">See work</p>
              </a>
            </div>
            <img
              src={home_photo}
              alt="doctor"
              className="w-[50%] max-lg:hidden object-contain"
            />
            <ul className="w-[85%] h-[200px] absolute bottom-[-6.5rem] bg-white border-1 border-gray-400 shadow-md rounded-xl max-lg:hidden flex justify-between items-center px-10 dark:bg-[#212121] ">
              <li>
                <div className="flex justify-between gap-4">
                  <div>
                    <i className="fa-solid fa-phone bg-[#307BC4] p-4 text-white rounded-full"></i>
                  </div>
                  <div>
                    <h4 className="text-[#274760] font-bold dark:text-blue-500">
                      {" "}
                      Hotline
                    </h4>

                    <p className="text-[#274760]  dark:text-white">
                      123-456-7890
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex justify-between gap-4">
                  <div>
                    <i className="fa-solid fa-syringe bg-[#307BC4] p-4 text-white rounded-full"></i>
                  </div>
                  <div>
                    <h4 className="text-[#274760] font-bold dark:text-blue-500">
                      {" "}
                      Hotline
                    </h4>

                    <p className="text-[#274760]  dark:text-white">
                      123-456-7890
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex justify-between gap-4">
                  <div>
                    <i className="fa-solid fa-location-dot  bg-[#307BC4] text-white rounded-full px-[18px] py-[16px]"></i>
                  </div>
                  <div>
                    <h4 className="text-[#274760] font-bold dark:text-blue-500">
                      {" "}
                      Hotline
                    </h4>

                    <p className="text-[#274760]  dark:text-white">
                      123-456-7890
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  to="/find-doctor"
                  className=" text-white px-5 rounded-full py-3 flex justify-center items-center gap-4 font-bold bg-gradient-to-r from-[#307BC4] to-[#274760]"
                >
                  <p>Book Now</p>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mb-4">
          <p className="text-center my-12 text-4xl font-bold text-siteColor dark:text-secondColor">
            Our Values
          </p>
          <div className="flex flex-wrap gap-8 justify-center items-center">
            <div className="w-[350px] h-[230px] flex flex-col items-center justify-center   p-4 rounded-xl shadow-md dark:bg-[#151515]">
              <div className="flex justify-center items-center gap-2 text-center mb-3">
                <div className=" w-[45px] h-[45px] text-lg  flex justify-center items-center p-4 rounded-full bg-secondColor">
                  <i className="fa-regular fa-hospital  text-white"></i>
                </div>
                <h2 className="text-2xl text-siteColor font-bold dark:text-secondColor">
                  Compassion
                </h2>
              </div>
              <p className="text-center text-sm w-[90%] m-auto text-gray-400">
                We understand that seeking medical care can be a stressful and
                emotional experience, and we strive to create a welcoming and
                supportive environment that puts our patients at ease and every
                one.
              </p>
            </div>

            <div className="w-[350px] h-[230px] flex flex-col items-center justify-center xl:translate-y-[-25px]  p-4 rounded-xl shadow-md dark:bg-[#151515]">
              <div className="flex justify-center items-center gap-2 text-center mb-3">
                <div className=" w-[45px] h-[45px] text-lg  flex justify-center items-center p-4 rounded-full bg-secondColor">
                  <i className="fa-regular fa-hospital  text-white"></i>
                </div>
                <h2 className="text-2xl text-siteColor font-bold dark:text-secondColor">
                  Excellence
                </h2>
              </div>
              <p className="text-center text-sm w-[90%] m-auto text-gray-400">
                We are committed to providing excellent medical care and
                services to our patients. We believe in continuously improving
                our skills, knowledge, and resources to ensure that we deliver
                the highest quality care possible.
              </p>
            </div>
            <div className="w-[350px] h-[230px] flex flex-col items-center justify-center   p-4 rounded-xl shadow-md dark:bg-[#151515]">
              <div className="flex justify-center items-center gap-2 text-center mb-3">
                <div className=" w-[45px] h-[45px] text-lg  flex justify-center items-center p-4 rounded-full bg-secondColor">
                  <i className="fa-regular fa-hospital  text-white"></i>
                </div>
                <h2 className="text-2xl text-siteColor font-bold dark:text-secondColor">
                  Integrity
                </h2>
              </div>
              <p className="text-center text-sm w-[90%] m-auto text-gray-400">
                We believe in practicing medicine with integrity and honesty. We
                are transparent in our communication and decision-making
                processes, and we always put our patient's interests first &
                provide best solution.
              </p>
            </div>
            <div className="w-[350px] h-[230px] flex flex-col items-center justify-center   p-4 rounded-xl shadow-md dark:bg-[#151515]">
              <div className="flex justify-center items-center gap-2 text-center mb-3">
                <div className=" w-[45px] h-[45px] text-lg  flex justify-center items-center p-4 rounded-full bg-secondColor">
                  <i className="fa-regular fa-hospital  text-white"></i>
                </div>
                <h2 className="text-2xl text-siteColor font-bold dark:text-secondColor">
                  Respect
                </h2>
              </div>
              <p className="text-center text-sm w-[90%] m-auto text-gray-400">
                We treat all individuals with respect and dignity, regardless of
                their background, beliefs, or circumstances. We believe that
                every person deserves to be treated with compassion and
                kindness.
              </p>
            </div>
            <div className="w-[350px] h-[230px] flex flex-col items-center justify-center   p-4 rounded-xl shadow-md dark:bg-[#151515]">
              <div className="flex justify-center items-center gap-2 text-center mb-3">
                <div className=" w-[45px] h-[45px] text-lg  flex justify-center items-center p-4 rounded-full bg-secondColor">
                  <i className="fa-solid fa-hand-holding-heart text-white"></i>
                </div>
                <h2 className="text-2xl text-siteColor font-bold dark:text-secondColor">
                  Teamwork
                </h2>
              </div>
              <p className="text-center text-sm w-[90%] m-auto text-gray-400">
                We believe in working collaboratively with our team membersvand
                other healthcare professionals to provide comprehensive and
                effective care to our patients.
              </p>
            </div>
          </div>
        </div>
        <div className="container grid grid-cols-2 gap-4 max-md:grid-cols-1 mb-10">
          <img
            src={aboutUs}
            alt="about"
            className="w-full max-w-[450px] h-auto object-cover max-md:max-w-full"
          />
          <div className="h-auto mt-14 max-md:mt-10">
            <h3 className="text-4xl font-bold text-siteColor dark:text-blue-400">
              About Us
            </h3>
            <p className="text-xl font-semibold text-secondColor">PRO HEALTH</p>
            <div className="flex gap-4 mt-16">
              <i className="fa-solid fa-arrow-right text-2xl text-secondColor"></i>
              <div>
                <h4 className="text-xl text-gray-300">
                  ProHealth is a team of experienced medical professionals
                </h4>
                <p className="text-wrap text-gray-400 mt-8">
                  Dedicated to providing top-quality healthcare services. We
                  believe in a holistic approach to healthcare that focuses on
                  treating the whole person, not just the illness or symptoms.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container max-xl:mb-[260px]  max-sm:mb-[425px]">
          <div
            className="w-full h-[300px] md:h-[250px] object-cover relative rounded-xl"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <p className="text-siteColor text-3xl font-bold text-center absolute top-[20%] w-full">
              Departments
            </p>
            <div className="flex justify-center items-center gap-8 max-md:gap-4 break-words translate-y-36 max-md:translate-y-22  flex-wrap text-wrap">
              <div className="w-[150px] h-[180px] rounded-md flex justify-center items-center gap-6 flex-col text-siteColor text-center font-semibold text-sm shadow-lg bg-white dark:bg-[#151515] hover:scale-105 -rotate-6 hover:rotate-0 transition-all duration-300">
                <img src={img1} alt="img" className="w-[60px]" />
                <p className="dark:text-[#307BC4]">
                  Emergency
                  <br /> Department
                </p>
              </div>
              <div className="w-[150px] h-[180px] rounded-md flex justify-center items-center gap-6 flex-col text-siteColor text-center font-semibold text-sm shadow-lg bg-white dark:bg-[#151515] hover:scale-105 hover:-rotate-6 transition-all duration-300">
                <img src={img2} alt="img" className="w-[60px]" />
                <p className="dark:text-[#307BC4]">
                  Pediatric <br /> Departement
                </p>
              </div>
              <div className="w-[150px] h-[180px] rounded-md flex justify-center items-center gap-6 flex-col text-siteColor text-center font-semibold text-sm shadow-lg bg-white dark:bg-[#151515] hover:scale-105 hover:-rotate-6 transition-all duration-300">
                <img src={img3} alt="img" className="w-[60px]" />
                <p className="dark:text-[#307BC4]">
                  Gynecology
                  <br /> Department
                </p>
              </div>
              <div className="w-[150px] h-[180px] rounded-md flex justify-center items-center gap-6 flex-col text-siteColor text-center font-semibold text-sm shadow-lg bg-white dark:bg-[#151515] hover:scale-105 hover:-rotate-6 transition-all duration-300">
                <img src={img4} alt="img" className="w-[60px]" />
                <p className="dark:text-[#307BC4]">
                  Cardiology
                  <br /> Department
                </p>
              </div>
              <div className="w-[150px] h-[180px] rounded-md flex justify-center items-center gap-6 flex-col text-siteColor text-center font-semibold text-sm shadow-lg bg-white dark:bg-[#151515] hover:scale-105 hover:-rotate-6 transition-all duration-300">
                <img src={img5} alt="img" className="w-[60px]" />
                <p className="dark:text-[#307BC4]">
                  Neurology
                  <br /> Department
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-20">
          <p className="text-4xl font-bold text-siteColor dark:text-blue-400">
            Departments
          </p>
          <div className="flex items-center mt-10 gap-4 justify-center flex-wrap">
            <div className=" min-h-[265px] w-[230px] shadow-lg p-4 bg-white rounded-lg dark:bg-darkColor">
              <div className="grid grid-cols-3 gap-4">
                <img src={department} alt="department" className="" />
                <h6 className=" dark:text-blue-400 grid col-span-2 text-sm text-siteColor">
                  Malcolm <br />
                  Baldrige National Quality Award
                </h6>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                This award recognizes healthcare organizations that have
                demonstrated excellence in leadership, strategic planning,
                customer and employee satisfaction, and operational efficiency.
              </p>
            </div>
            <div className=" min-h-[265px] w-[230px] shadow-lg p-4 bg-white rounded-lg dark:bg-darkColor">
              <div className="grid grid-cols-3 gap-4">
                <img src={department} alt="department" className="" />
                <h6 className=" dark:text-blue-400 grid col-span-2 text-sm text-siteColor">
                  Malcolm <br />
                  Baldrige National Quality Award
                </h6>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                This award recognizes healthcare organizations that have
                demonstrated excellence in leadership, strategic planning,
                customer and employee satisfaction, and operational efficiency.
              </p>
            </div>
            <div className=" min-h-[265px] w-[230px] shadow-lg p-4 bg-white rounded-lg dark:bg-darkColor">
              <div className="grid grid-cols-3 gap-4">
                <img src={department} alt="department" className="" />
                <h6 className=" dark:text-blue-400 grid col-span-2 text-sm text-siteColor">
                  Malcolm <br />
                  Baldrige National Quality Award
                </h6>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                This award recognizes healthcare organizations that have
                demonstrated excellence in leadership, strategic planning,
                customer and employee satisfaction, and operational efficiency.
              </p>
            </div>
            <div className=" min-h-[265px] w-[230px] shadow-lg p-4 bg-white rounded-lg dark:bg-darkColor">
              <div className="grid grid-cols-3 gap-4">
                <img src={department} alt="department" className="" />
                <h6 className=" dark:text-blue-400 grid col-span-2 text-sm text-siteColor">
                  Malcolm <br />
                  Baldrige National Quality Award
                </h6>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                This award recognizes healthcare organizations that have
                demonstrated excellence in leadership, strategic planning,
                customer and employee satisfaction, and operational efficiency.
              </p>
            </div>
          </div>
          <div className="text-center mb-8 mt-8">
            <h2 className="text-2xl font-bold text-siteColor">Some Reviews</h2>
            <h3 className="text-md font-bold text-secondColor uppercase">
              Of our clients
            </h3>
          </div>
          <div className="flex justify-between items-center max-lg:flex-col">
            <div className="flex flex-col gap-8  rounded-lg p-4 w-[40%] max-lg:w-full text-nowrap">
              <div className="flex items-center gap-4">
                <img
                  src={avatar_1}
                  className="w-[55px] h-[55px]"
                  alt="avatars"
                />
                <div>
                  <h6 className="text-[18px] text-siteColor dark:text-secondColor">
                    PAULO HUBERT
                  </h6>
                  <p className="text-[10px]">New York, USA</p>
                </div>
              </div>
              <div className="w-fit pr-8 flex items-center rounded-xl gap-4 translate-x-12 shadow-lg p-3 dark:bg-darkColor">
                <img
                  src={avatar_2}
                  className="w-[55px] h-[55px]"
                  alt="avatars"
                />
                <div>
                  <h6 className="text-[18px] text-siteColor dark:text-blue-400">
                    LAURENCE VENDETTA
                  </h6>
                  <p className="text-[10px]">New York, USA</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={avatar_3}
                  className="w-[55px] h-[55px]"
                  alt="avatars"
                />
                <div>
                  <h6 className="text-[18px] text-siteColor dark:text-secondColor">
                    PAULO HUBERT
                  </h6>
                  <p className="text-[10px]">New York, USA</p>
                </div>
              </div>
            </div>
            <div className="w-[1px] h-[260px] bg-secondColor relative max-lg:hidden">
              <div className="w-[7px] h-[7px] rounded-full bg-secondColor absolute top-[15%] left-[50%] translate-x-[-50%]"></div>
              <div className="w-[12px] h-[12px] rounded-full bg-secondColor absolute top-[50%] left-[50%] translate-x-[-50%]"></div>
              <div className="w-[7px] h-[7px] rounded-full bg-secondColor absolute top-[85%] left-[50%] translate-x-[-50%]"></div>
            </div>
            <div className="relative w-[40%] max-lg:w-full max-lg:mt-24">
              <i className="absolute max-sm:left-0 -top-20 -left-12 text-5xl text-secondColor fa-solid fa-quote-left"></i>
              <div className="">
                <p className="text-wrap text-gray-400 text-sm">
                  The pediatrician was great with him and made him feel at ease,
                  and the entire staff was kind and attentive. I recently had to
                  bring my child to ProHealth for a minor injury, and I was so
                  impressed with the care he received.
                </p>
                <div className="flex items-center gap text-secondColor mt-10">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h4 className="text-2xl font-bold text-center mb-2 text-secondColor">
            What People
          </h4>
          <p className="text-md text-center text-gray-600 mb-6">
            Usually Asked
          </p>

          <div className="flex flex-col gap-6 ">
            <div
              className={`flex flex-col border p-4 rounded-xl shadow-lg transition-all duration-500 ${
                usually === 1
                  ? "translate-x-7 bg-[#D2EAEF] max-md:translate-x-3"
                  : "dark:bg-darkColor"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-800 dark:text-secondColor">
                  What services does ProHealth offer?
                </p>
                <div
                  className="w-9 h-9 flex justify-center items-center border-2 rounded-full border-secondColor text-secondColor cursor-pointer transition-transform transform hover:scale-110"
                  onClick={() => usuallyHandler(1)}
                >
                  <i
                    className={`fa-solid fa-arrow-up transition-transform duration-300 ${
                      usually === 1 ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  usually === 1 ? "max-h-96 mt-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-700 text-sm">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesent voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui.
                </p>
              </div>
            </div>
            <div
              className={`flex flex-col border p-4 rounded-xl shadow-lg transition-all duration-500 ${
                usually === 2
                  ? "translate-x-7 bg-[#D2EAEF] max-md:translate-x-3"
                  : "dark:bg-darkColor"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-800 dark:text-secondColor">
                  What services does ProHealth offer?
                </p>
                <div
                  className="w-9 h-9 flex justify-center items-center border-2 rounded-full border-secondColor text-secondColor cursor-pointer transition-transform transform hover:scale-110"
                  onClick={() => usuallyHandler(2)}
                >
                  <i
                    className={`fa-solid fa-arrow-up transition-transform duration-300 ${
                      usually === 2 ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  usually === 2 ? "max-h-96 mt-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-700 text-sm">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesent voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui.
                </p>
              </div>
            </div>
            <div
              className={`flex flex-col border p-4 rounded-xl shadow-lg transition-all duration-500 ${
                usually === 3
                  ? "translate-x-7 bg-[#D2EAEF] max-md:translate-x-3"
                  : "dark:bg-darkColor"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-800 dark:text-secondColor">
                  What services does ProHealth offer?
                </p>
                <div
                  className="w-9 h-9 flex justify-center items-center border-2 rounded-full border-secondColor text-secondColor cursor-pointer transition-transform transform hover:scale-110"
                  onClick={() => usuallyHandler(3)}
                >
                  <i
                    className={`fa-solid fa-arrow-up transition-transform duration-300 ${
                      usually === 3 ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  usually === 3 ? "max-h-96 mt-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-700 text-sm">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesent voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui.
                </p>
              </div>
            </div>
            <div
              className={`flex flex-col border p-4 rounded-xl shadow-lg transition-all duration-500 ${
                usually === 4
                  ? "translate-x-7 bg-[#D2EAEF] max-md:translate-x-3"
                  : "dark:bg-darkColor"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-800 dark:text-secondColor">
                  What services does ProHealth offer?
                </p>
                <div
                  className="w-9 h-9 flex justify-center items-center border-2 rounded-full border-secondColor text-secondColor cursor-pointer transition-transform transform hover:scale-110"
                  onClick={() => usuallyHandler(4)}
                >
                  <i
                    className={`fa-solid fa-arrow-up transition-transform duration-300 ${
                      usually === 4 ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  usually === 4 ? "max-h-96 mt-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-700 text-sm">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesent voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui.
                </p>
              </div>
            </div>
            <div
              className={`flex flex-col border p-4 rounded-xl shadow-lg transition-all duration-500 ${
                usually === 5
                  ? "translate-x-7 bg-[#D2EAEF] max-md:translate-x-3"
                  : "dark:bg-darkColor "
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-800 dark:text-secondColor">
                  What services does ProHealth offer?
                </p>
                <div
                  className="w-9 h-9 flex justify-center items-center border-2 rounded-full border-secondColor text-secondColor cursor-pointer transition-transform transform hover:scale-110"
                  onClick={() => usuallyHandler(5)}
                >
                  <i
                    className={`fa-solid fa-arrow-up transition-transform duration-300 ${
                      usually === 5 ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  usually === 5 ? "max-h-96 mt-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-700 text-sm">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesent voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 mt-10 gap-8 max-md:grid-cols-3">
            <img src={b1} alt="brand1" className="w-[140px] mx-auto" />
            <img src={b2} alt="brand2" className="w-[140px] mx-auto" />
            <img src={b3} alt="brand3" className="w-[140px] mx-auto" />
            <img src={b4} alt="brand4" className="w-[140px] mx-auto" />
            <img src={b5} alt="brand5" className="w-[140px] mx-auto" />
            <img src={b6} alt="brand6" className="w-[140px] mx-auto" />
            <img src={b7} alt="brand6" className="w-[140px] mx-auto" />
            <img src={b8} alt="brand6" className="w-[140px] mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
