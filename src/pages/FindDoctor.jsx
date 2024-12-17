import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase.js";
import { collection, getDocs } from "firebase/firestore";
const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const fetchDoctor = async () => {
    try {
      const allUsers = collection(db, "users");
      const users = await getDocs(allUsers);
      const data = users.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setDoctors(
        data.filter((user) => {
          if (user.role === "doctor") {
            return true;
          }
          return false;
        })
      );
      console.log(doctors);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);
  return (
    <div className="min-h-[90vh] container">
      <div className="">FindDoctor</div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {doctors.map((doctor) => (
          <li
            key={doctor.id}
            className="flex flex-col items-center bg-gradient-to-t from-[rgba(26,140,255,0.4)] to-[rgba(48,123,196,0.1)] rounded-xl border border-gray-100 shadow-sm cursor-pointer"
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
              <div className="w-[80%] bg-[#0d86ff8a] text-white absolute bottom-0 left-[10%] text-center p-2 rounded-t-xl">
                <p className="text-sm">{doctor.department} Department</p>
              </div>
            </Link>
            <div className="bg-white w-full h-[50%] text-center flex flex-col gap-6 pt-3 rounded-b-xl px-4 pb-3   ">
              <p className="font-bold text-siteColor text-xl">
                Dr.{doctor.fname} {doctor.lname}
              </p>
              <p className="font-bold text-siteColor text-md">
                {doctor.department || null}
              </p>
              <p className="text-center text-[#274760] opacity-50 text-sm">
                Dr. {doctor.fname} is a highly skilled {doctor.department} with
                expertise in the treatment of conditions related to{" "}
                {doctor.department}. She is board-certified in{" "}
                {doctor.department} and experience{" "}
                <span className="text-secondColor">
                  {doctor.experienceYears}
                </span>{" "}
                Years.
              </p>

              <p className="text-[#307BC4] opacity-60">
                +963 {doctor.phonNumber}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindDoctor;
