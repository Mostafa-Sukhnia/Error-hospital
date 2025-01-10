import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
const FindDoctor = () => {
  const mode = useSelector((state) => state.state.mode);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchDoctor = async () => {
    try {
      const allUsers = collection(db, "users");
      const users = await getDocs(allUsers);
      const data = users.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDoctors(
        data.filter((user) => {
          if (user.role === "doctor") {
            return true;
          }
          return false;
        })
      );
      setLoading(false)
    } catch (err) {
      console.error(err);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);


  const loadingHandler = () => {
    if(loading) {
      return(<div className="fixed top-0 left-0 w-full h-full bg-white dark:bg-darkColor flex justify-center items-center z-50">
        <div className="w-12 h-12 border-[5px] border-t-gray-300 border-x-gray-300 border-b-transparent rounded-full animate-spin"></div>
      </div>);
    }
  }
  return (
    <div className={`min-h-[90vh] container ${mode ? "dark" : ""}`}>
    {loadingHandler()}
      <div className="">FindDoctor</div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {doctors.map((doctor) => (
          <li
            key={doctor.id}
            className="flex flex-col items-center bg-gradient-to-t from-[rgba(26,140,255,0.4)] to-[rgba(48,123,196,0.1)] rounded-xl border border-gray-100 shadow-sm cursor-pointer dark:border-siteColor"
          >
            <Link
              to={`bookAnAppointment/${doctor.id}`}
              className="relative  shadow-sm"
            >
              <img
                src={doctor.img}
                alt="rere"
                className="block w-[350px] h-[400px] object-cover"
              />
              <div className="w-[80%] bg-[#0d86ff8a] text-white  absolute bottom-0 left-[10%] text-center p-2 rounded-t-xl">
                <p className="text-sm">{doctor.department} Department</p>
              </div>
            </Link>
            <div className="bg-white w-full h-[50%] text-center flex flex-col gap-6 pt-3 rounded-b-xl px-4 pb-3    dark:bg-darkColor">
              <p className="font-bold text-siteColor text-xl dark:text-secondColor">
                Dr.{doctor.fname} {doctor.lname}
              </p>
              <p className="font-bold text-siteColor text-md dark:text-secondColor">
                {doctor.department || null}
              </p>
              <p className="text-center text-[#274760] text-sm dark:text-gray-300">
                Dr. {doctor.fname} is a highly skilled {doctor.department} with
                expertise in the treatment of conditions related to{" "}
                {doctor.department}. She is board-certified in{" "}
                {doctor.department} and experience{" "}
                <span className="text-secondColor">
                  {doctor.experienceYears}
                </span>{" "}
                Years.
              </p>

              <p className="text-[#307BC4]">+963 {doctor.phonNumber}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindDoctor;
