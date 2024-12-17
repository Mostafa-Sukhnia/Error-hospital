import React from "react";
import InsideLogoFooter from "../Assets/image/InsideLogoFooter.png";
import footerlogo from "../Assets/image/footerlogo.png";
import SigUP from "../Assets/image/SignUP.png";
const Footer = () => {
  return (
    <>
      <div className="relative w-full min-h-[45vh] bg-gradient-to-t from-[#86BBF1] to-[#D2EAEF] mt-[170px] z-20">
        <div className="absolute top-[-77px] w-full bg-[#D2EAEF] h-[20vh] clip-triangle z-10"></div>
        {/* <img src={SigUP} className="absolute w-[350px] top-[-570px] right-10 z-5 max-lg:hidden"/> */}
        <div className="absolute top-[-200px] left-[50%] translate-x-[-50%] z-20">
          <img
            src={InsideLogoFooter}
            alt=""
            className="absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50px] z-30"
          />
          <p className="absolute top-[65%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-white ">
            Error
          </p>
          <img src={footerlogo} alt="" className="w-[200px]" />
        </div>

        <div className="container h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-20 ">
          <div className=" flex flex-col gap-4 text-[#274760] pt-[60px]">
            <p className="text-[#86bbf1] text-4xl font-bold">Error</p>

            <p className="flex gap-4 items-center">
              <i class="fa-solid fa-location-dot bg-[#307BC4] text-[#FFFFFF] text-[15px] rounded-full py-[0.45rem] px-[0.55rem]"></i>
              <p>123 Anywhere St., Any City 12345</p>
            </p>
            <p className="flex gap-4 items-center">
              <i class="fa-solid fa-phone  bg-[#307BC4] text-[#FFFFFF] text-[14px] rounded-full py-[0.45rem] px-[0.50rem]"></i>
              <p>123-456-7890</p>
            </p>
            <p className="flex gap-4 items-center">
              <i class="fa-solid fa-envelope  bg-[#307BC4] text-[#FFFFFF] text-[14px] rounded-full py-[0.45rem] px-[0.50rem]"></i>
              <p>hellocallcenter@gmail.com</p>
            </p>
          </div>
          <div className="flex flex-col gap-4 pl-5 pt-[60px]">
            <p className="text-[#274760]">About Us</p>
            <p className="text-[#274760]">Departments</p>
            <p className="text-[#274760]">Doctors</p>
            <p className="text-[#274760]">Timetable</p>
            <p className="text-[#274760]">Appointment</p>
            <p className="text-[#274760]">Testimonials</p>
          </div>
          <div className="flex flex-col gap-4 pl-5 pt-[60px]">
            <p className="text-[#274760]">Blog</p>
            <p className="text-[#274760]">Contact Us</p>
            <p className="text-[#274760]">FAQs</p>
            <p className="text-[#274760]">Privacy Policy</p>
            <p className="text-[#274760]">Terms and Conditions</p>
          </div>
        </div>
      </div>

      <div className="w-[100%] bg-[#307BC4]">
        <div className="container flex justify-between items-center max-sm:flex-col px-0">
          <ul className="flex justify-between w-[160px] items-center">
            <li>
              <p className="text-white">Follow Us</p>
            </li>
            <li>
              <i class="fa-brands fa-instagram text-[#307BC4] bg-[#FFFFFF50] rounded-full py-1 px-[0.35rem] "></i>
            </li>
            <li>
              <i class="fa-brands fa-facebook-f text-[#307BC4] bg-[#FFFFFF50] rounded-full py-1 px-[0.35rem]"></i>
            </li>
            <li>
              <i class="fa-brands fa-linkedin-in text-[#307BC4] bg-[#FFFFFF50] rounded-full py-1 px-[0.35rem]"></i>
            </li>
          </ul>
          <div>
            <p className="text-[#ffffff50]">
              Copyright © 2024 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
