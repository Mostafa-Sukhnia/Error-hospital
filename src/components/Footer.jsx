import React from "react";
import InsideLogoFooter from "../Assets/image/InsideLogoFooter.png";
import footerlogo from "../Assets/image/footerlogo.png";
import { useSelector } from "react-redux";

const Footer = () => {
  const mode = useSelector((state) => state.state.mode);

  return (
    <div className={`${mode ? "dark" : ""}`}>
      <div className="relative w-full min-h-[45vh] bg-gradient-to-t from-[#86BBF1] to-[#D2EAEF] mt-[170px] z-20 dark:from-[#1c1c1c] dark:to-[#111111]">
        <div className="absolute top-[-72.5px] max-sm:top-[-90px] w-full bg-[#D2EAEF] h-[20vh] clip-triangle z-10 dark:bg-[#111111]"></div>

        <div className="absolute top-[-200px] left-[50%] translate-x-[-50%] z-20">
          <img
            src={InsideLogoFooter}
            alt=""
            className="absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50px] z-30"
          />
          <p className="absolute top-[65%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-white">
            Error
          </p>
          <img src={footerlogo} alt="" className="w-[200px]" />
        </div>

        <div className="container h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-20">
          <div className="flex flex-col gap-4 text-[#274760] pt-[60px] dark:text-[#c3c3c3]">
            <p className="text-[#86bbf1] text-4xl font-bold dark:text-[#ffffff]">
              Error
            </p>
            <p className="flex gap-4 items-center">
              <i className="fa-solid fa-location-dot bg-[#307BC4] text-[#FFFFFF] text-[15px] rounded-full py-[0.45rem] px-[0.55rem]"></i>
              <span>123 Anywhere St., Any City 12345</span>
            </p>
            <p className="flex gap-4 items-center">
              <i className="fa-solid fa-phone bg-[#307BC4] text-[#FFFFFF] text-[14px] rounded-full py-[0.45rem] px-[0.50rem]"></i>
              <span>123-456-7890</span>
            </p>
            <p className="flex gap-4 items-center">
              <i className="fa-solid fa-envelope bg-[#307BC4] text-[#FFFFFF] text-[14px] rounded-full py-[0.45rem] px-[0.50rem]"></i>
              <span>hellocallcenter@gmail.com</span>
            </p>
          </div>
          <div className="flex flex-col gap-4 pl-5 pt-[60px] dark:text-[#c3c3c3]">
            <p>About Us</p>
            <p>Departments</p>
            <p>Doctors</p>
            <p>Timetable</p>
            <p>Appointment</p>
            <p>Testimonials</p>
          </div>
          <div className="flex flex-col gap-4 pl-5 pt-[60px] dark:text-[#c3c3c3]">
            <p>Blog</p>
            <p>Contact Us</p>
            <p>FAQs</p>
            <p>Privacy Policy</p>
            <p>Terms and Conditions</p>
          </div>
        </div>
      </div>

      <div className="w-[100%] bg-[#307BC4] dark:bg-[#1c1c1c]">
        <div className="container flex justify-between items-center max-sm:flex-col px-0">
          <ul className="flex justify-between  items-center gap-2">
            <li>
              <p className="text-white dark:text-[#ffffff80]">Follow Us</p>
            </li>
            <li className=" text-blue-500 bg-[#FFFFFF50] rounded-full flex justify-center items-center p-2 w-[35px] h-[35px]">
              <i className="fa-brands fa-instagram"></i>
            </li>
            <li className=" text-blue-500 bg-[#FFFFFF50] rounded-full flex justify-center items-center p-2 w-[35px] h-[35px]">
              <i className="fa-brands fa-facebook-f "></i>
            </li>
            <li className="text-blue-500 bg-[#FFFFFF50] rounded-full flex justify-center items-center p-2 w-[35px] h-[35px]">
              <i className="fa-brands fa-linkedin-in"></i>
            </li>
          </ul>
          <div>
            <p className="text-[#ffffff50]">
              Copyright © 2024 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
