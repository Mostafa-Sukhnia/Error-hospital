import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import app from "../config/firebase.js";
import { getAuth } from "firebase/auth";
import emailjs from "emailjs-com";
const BookAnAppointment = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  const [daySelected, setDaySelected] = useState("");
  const [allDateSelected, setAllDateSelected] = useState("");

  useEffect(() => {
    const fetchDoctorData = async () => {
      setLoading(true);
      try {
        const userRef = doc(db, "users", id);
        const user = await getDoc(userRef);
        const doctorData = user.data();
        setDoctor(doctorData);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorData();
  }, [id]);

  const auth = getAuth(app);
  const bookHandler = async () => {
    console.log(auth.currentUser.email,
      auth.currentUser.displayName,
      allDateSelected)
    try {
      // تحويل allDateSelected إلى كائن Date
      const selectedDate = new Date(allDateSelected);

      // استرداد بيانات الموعد المحدد
      const selectedAppointment = doctor.appointments.find(
        (appointment) =>
          appointment?.timeSlot?.start.toDate().toISOString() ===
          selectedDate.toISOString()
      );

      if (!selectedAppointment) {
        console.error("Appointment not found.");
        return;
      }

      // تحديث بيانات الموعد: تعيين الحالة إلى "busy" وإضافة patientId
      const updatedAppointment = {
        ...selectedAppointment,
        status: "busy",
        patientId: auth.currentUser.uid, // افتراض أنك تستخدم auth
      };

      // إزالة الموعد القديم
      await updateDoc(doc(db, "users", id), {
        appointments: arrayRemove(selectedAppointment),
      });

      // إضافة الموعد الجديد
      await updateDoc(doc(db, "users", id), {
        appointments: arrayUnion(updatedAppointment),
      });

      const sendEmail = (userEmail, userName, appointmentDate) => {
        const templateParams = {
          user_email: userEmail,
          user_name: userName,
          appointment_date: appointmentDate,
        };

        emailjs
          .send(
            "service_dc0jfvm", // استبدل بـ Service ID
            "template_85opurc", // استبدل بـ Template ID
            templateParams,
            "B34V_267Xdt6xwStX" // استبدل بـ Public Key
          )
          .then(
            (response) => {
              console.log(
                "Email sent successfully!",
                response.status,
                response.text
              );
            },
            (error) => {
              console.error("Failed to send email:", error);
            }
          );
      };
      sendEmail(
        auth.currentUser.email,
        auth.currentUser.displayName,
        allDateSelected
      );
      console.log("Appointment updated successfully.");
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-[100%] h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-[5px] border-t-gray-300 border-x-gray-300 border-b-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="container flex flex-col items-center space-y-8 mt-4">
      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full"
        style={{ marginTop: "0px" }}
      >
        {/* بيانات الطبيب */}
        <div className="w-full flex flex-col items-center bg-gradient-to-t from-blue-200 to-[rgba(48,123,196,0.1)] rounded-xl border border-gray-100 shadow-sm">
          <div className="relative shadow-sm">
            <img
              src={doctor.img}
              alt="Doctor"
              className="block w-[350px] h-[400px] object-cover  opacity-80 mix-blend-multiply"
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

        <div className="col-span-2 bg-gradient-to-b from-blue-300 to-[rgba(48,123,196,0.1)] w-full max-lg:mt-4 rounded-xl border border-gray-100 shadow-md p-4 flex flex-col gap-4 min-h-[80vh]">
          <div className="bg-white w-full max-lg:mt-4 rounded-xl border border-gray-100 shadow-md p-4">
            <h2 className="text-xl font-semibold  mb-6 text-center text-blue-500 ">
              Doctor Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <p className="font-semibold w-24 text-secondColor">
                  First Name:
                </p>
                <p className="text-gray-800">{doctor.fname}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold w-24 text-secondColor">
                  Second Name:
                </p>
                <p className="text-gray-800">{doctor.lname}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold w-24 text-secondColor">
                  Experience:
                </p>
                <p className="text-gray-800">{doctor.experienceYears} Years</p>
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
                <p className="text-gray-800">{doctor.phonNumber}</p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md flex-grow rounded-lg p-2 relative overflow-hidden">
            <p className="text-center text-lg font-bold text-blue-400">
              Get your Book an Appointment
            </p>
            <div>
              <ul className="flex justify-center flex-wrap gap-4 w-full mt-4 ">
                {(() => {
                  const uniqueDays = new Set();
                  return doctor?.appointments?.map((appointment) => {
                    try {
                      if (!appointment.timeSlot?.start) return null;
                      const startDate = appointment.timeSlot.start.toDate();

                      const dayName = startDate.toLocaleDateString("en-US", {
                        weekday: "short",
                      });
                      const dayOfMonth = startDate.getDate();
                      const uniqueKey = `${dayName}-${dayOfMonth}`;
                      if (uniqueDays.has(uniqueKey)) return null;
                      uniqueDays.add(uniqueKey);

                      return (
                        <li
                          key={uniqueKey}
                          onClick={() => setDaySelected(dayOfMonth)}
                          className={`flex flex-col items-center justify-center gap-2 px-4 py-2 w-[70px] min-w-[60px] max-w-[80px] bg-[argb(255,255,255,0.1)] backdrop-blur-md shadow-lg z-10 rounded-[20px] text-blue-500 border-[2px] 
                    ${
                      daySelected === dayOfMonth
                        ? "bg-gradient-to-t from-blue-200 via-white to-[rgba(17,136,255,0.1)] scale-110 border-0"
                        : "border-gray-100"
                    }
                    cursor-pointer duration-200 shadow-md
                    hover:scale-105`}
                        >
                          <p className="text-md sm:text-lg font-bold">
                            {dayName}
                          </p>
                          <p className="text-md font-semibold">{dayOfMonth}</p>
                        </li>
                      );
                    } catch (error) {
                      console.error("Error parsing appointment:", error);
                      return null;
                    }
                  });
                })()}
              </ul>
              <div>
                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-[80%] mx-auto mt-10 gap-3">
                  {daySelected === "" ? (
                    <div className="text-blue-600 z-10 w-full text-center col-span-5">
                      Select a day please!!
                    </div>
                  ) : (
                    doctor.appointments
                      .filter(
                        (appointment) =>
                          appointment?.timeSlot?.start.toDate().getDate() ===
                            daySelected && appointment.status !== "busy"
                      )
                      .map((item) => (
                        <div
                          key={item.timeSlot.start}
                          onClick={() => {
                            setAllDateSelected(
                              String(item.timeSlot.start.toDate())
                            );
                            console.log(item.timeSlot.start.toDate());
                          }}
                          className={`${
                            allDateSelected !==
                            String(item.timeSlot.start.toDate())
                              ? ""
                              : "border-blue-400"
                          } w-fit p-2 px-6 bg-[rgba(255,255,255,0.1)] shadow-md backdrop-blur-md rounded-full z-10 border border-gray-200 text-blue-600 cursor-pointer duration-500`}
                        >
                          {`${String(
                            item.timeSlot.start.toDate().getHours()
                          ).padStart(2, "0")}:${String(
                            item.timeSlot.start.toDate().getMinutes()
                          ).padStart(2, "0")}`}
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
            <div className="absolute top-[20%] right-[-20%] w-[470px] h-[470px] rounded-full bg-gradient-to-t animate-move from-blue-200 via-white to-[rgba(48,123,196,0.1)] bg-blue-400 opacity-50"></div>
            {allDateSelected !== "" ? (
              <div
                style={{ textAlign: "center", marginTop: "10px", zIndex: "10" }}
              >
                <button
                  onClick={() => {
                    console.log("hour:", allDateSelected);
                    console.log(bookHandler());
                  }}
                >
                  Book a place
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAnAppointment;
