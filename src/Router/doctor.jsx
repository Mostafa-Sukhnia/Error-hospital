import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase.js";

const Doctor = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1); // إضافة يوم واحد

  // تصفية المواعيد لليوم والغد فقط
  const todayAndTomorrowAppointments = doctor.appointments?.filter(
    (appointment) => {
      const startTime = appointment.timeSlot?.start;
      if (!(startTime instanceof Timestamp)) {
        console.error("Invalid start time format:", startTime);
        return false;
      }

      const startDate = startTime.toDate();
      const isToday =
        startDate.getDate() === today.getDate() &&
        startDate.getMonth() === today.getMonth() &&
        startDate.getFullYear() === today.getFullYear();

      const isTomorrow =
        startDate.getDate() === tomorrow.getDate() &&
        startDate.getMonth() === tomorrow.getMonth() &&
        startDate.getFullYear() === tomorrow.getFullYear();

      return isToday || isTomorrow;
    }
  );

  // جلب بيانات الطبيب
  useEffect(() => {
    const fetchDoctorData = async () => {
      setLoading(true); // بدأ تحميل البيانات
      try {
        const userRef = doc(db, "users", id);
        const user = await getDoc(userRef);
        const doctorData = user.data();
        setDoctor(doctorData);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false); // إيقاف الـ loading بعد جلب البيانات
      }
    };
    fetchDoctorData();
  }, [id]);

  // تنسيق تاريخ الميلاد
  const birth = doctor.birth
    ? doctor.birth.split("-").reverse().join("/")
    : "Birth date is undefined";

  if (loading) {
    return (
      <div className="w-[100%] h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-[5px] border-t-gray-300 border-x-gray-300 border-b-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold text-secondColor text-center mt-4 mb-8">
        <Link to="/admin/doctors">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>{" "}
        Additional information about the doctor{" "}
        <i className="fa-solid fa-stethoscope"></i>
      </h1>

      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full"
        style={{ marginTop: "0px" }}
      >
        <div className="w-full flex flex-col items-center bg-gradient-to-t from-blue-200 to-[rgba(48,123,196,0.1)] rounded-xl border border-gray-100 shadow-sm">
          <div className="relative shadow-sm">
            <img
              src={doctor.img}
              alt="Doctor"
              className="block w-[350px] h-[400px] object-cover"
            />
            <div className="w-[80%] bg-[#0d86ff8a] text-white absolute bottom-0 left-[10%] text-center p-2 rounded-t-xl">
              <p className="text-sm">{doctor.department} Department</p>
            </div>
          </div>
          <div className="bg-white w-full h-[50%] text-center flex flex-col gap-6 pt-3 rounded-b-xl px-4 pb-3">
            <p className="font-bold text-siteColor text-xl">
              Dr.{doctor.fname} {doctor.lname}
            </p>
            <p className="font-bold text-siteColor text-md">
              {doctor.department}
            </p>
            <p className="text-center text-[#2747607d] text-sm">
              Dr. {doctor.fname} is a highly skilled {doctor.department} with
              expertise in the treatment of conditions related to{" "}
              {doctor.department}. She is board-certified in {doctor.department}{" "}
              and has{" "}
              <span className="text-secondColor">{doctor.experienceYears}</span>{" "}
              years of experience.
            </p>
            <p className="text-[#307BC4]">+963 {doctor.phonNumber}</p>
          </div>
        </div>
        <div className="col-span-2 bg-gradient-to-b from-blue-300 to-[rgba(48,123,196,0.1)] w-full max-lg:mt-4 rounded-xl border border-gray-100 shadow-md p-4">
          <div className="bg-white w-full max-lg:mt-4 rounded-xl border border-gray-100 shadow-md p-4">
            <h2 className="text-xl font-semibold text-siteColor mb-6 text-center">
              Doctor Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <p className="font-semibold w-24 text-secondColor">
                  Full Name:
                </p>
                <p className="text-gray-800">
                  {doctor.fname} {doctor.lname}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold w-24 text-secondColor">Email:</p>
                <p className="text-gray-800">{doctor.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold w-24 text-secondColor">
                  Experience:
                </p>
                <p className="text-gray-800">{doctor.experienceYears} Years</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold w-24 text-secondColor">Lives in:</p>
                <p className="text-gray-800">{doctor.live}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold w-24 text-secondColor">From:</p>
                <p className="text-gray-800">{doctor.from}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold w-24 text-secondColor">Gender:</p>
                <p className="text-gray-800">{doctor.gender}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold w-24 text-secondColor">Phone:</p>
                <p className="text-gray-800">+963 {doctor.phonNumber}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold w-24 text-secondColor">Birth:</p>
                <p className="text-gray-800">{birth}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto w-full bg-white rounded-md shadow-md mt-4 mb-4">
        <table className="w-full table-auto">
          <thead className="bg-blue-200 ">
            <tr className="text-center text-sm font-semibold  p-4">
              <th className="px-4 py-2">Day</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">patientId</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">
                <i className="fa-solid fa-sliders"></i>
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {todayAndTomorrowAppointments &&
            todayAndTomorrowAppointments.length > 0 ? (
              todayAndTomorrowAppointments.map((appointment, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-blue-50" : "bg-white"
                  } hover:bg-blue-100 transition-colors duration-200`}
                >
                  <td className="px-4 py-2">{appointment.day}</td>
                  <td
                    className={`px-4 py-2 ${
                      appointment.status === "available"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }`}
                  >
                    {appointment.status}
                  </td>
                  <td className="px-4 py-2">
                    {appointment.patientId || "unknow"}
                  </td>
                  <td className="px-4 py-2">
                    {appointment.timeSlot.start.toDate().toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {appointment.timeSlot.end.toDate().toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                  No appointments available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctor;
