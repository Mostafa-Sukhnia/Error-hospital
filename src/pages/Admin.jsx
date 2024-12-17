import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { collection,onSnapshot } from "firebase/firestore";
import app from "../config/firebase.js";
import { getAuth, signOut } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { Link, useNavigate  } from "react-router-dom";
const Admin = () => {
  const [data, setData] = useState([]);
  const [searchbyName, setSearchByName] = useState("");
  const [setting, setSetting] = useState(null);
  // const [userBanned, setUserBanned] = useState("");
  const auth = getAuth(app);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(usersData); // تحديث البيانات
    });
  
    return () => unsubscribe(); // إلغاء الاشتراك عند إزالة المكون
  }, []);
  
  



  // function Banned user

  const Bannedfun = async (idBanned) => {
    try {
      const idAsString = String(idBanned);
      // الحصول على مرجع الوثيقة
      const userRes = doc(db, "users", idAsString);

      // قراءة البيانات من الوثيقة
      const userDoc = await getDoc(userRes);

      // التحقق إذا كانت الوثيقة موجودة
      if (userDoc.exists()) {
        const userData = userDoc.data(); // الحصول على بيانات الوثيقة

        const isBanned = userData.isBanned;

        // تبديل حالة isBanned
        await updateDoc(userRes, {
          isBanned: !userData.isBanned, // تغيير حالة الحظر بناءً على الحالة الحالية
        });
        alert(`User has been ${isBanned ? "un" : ""} Banned successfully!`);
      } else {
        console.error("User not found.");
        alert("User not found.");
      }
    } catch (err) {
      console.error("Error banning user: ", err);
    }
  };

  const Admin = async (idHowWillBeAdmin) => {
    const userRef = doc(db, "users", idHowWillBeAdmin);
    const res = await getDoc(userRef);
    const userData = res.data();

    try {
      await updateDoc(userRef, {
        role: userData.role === "admin" ? "user" : "admin",
      });
      alert(
        ` ${userData.role === "user" ? "user" : "admin"} has been ${
          userData.role === "admin" ? "user" : "admin"
        } successfully!`
      );
    } catch (err) {
      console.error(err);
      alert(`User not found, ${err}`);
    }
  };
  const doctor = async (idHowWillBeAdmin) => {
    const userRef = doc(db, "users", idHowWillBeAdmin);
    const res = await getDoc(userRef);
    const userData = res.data();

    try {
      await updateDoc(userRef, {
        role: userData.role === "doctor" ? "user" : "doctor",
      });
      alert(
        ` ${userData.role === "user" ? "user" : "doctor"} has been ${
          userData.role === "doctor" ? "user" : "doctor"
        } successfully!`
      );
    } catch (err) {
      alert(`User not found, ${err}`);

      console.error(err);
    }
  };

  const SignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="container my-3 bg-white h-[96.5vh] rounded-xl border-[1px] border-gray-200 shadow-lg">
      {/* Header */}
      <div className="w-full h-1/5 relative overflow-hidden">
        <div className="w-full h-full bg-transparent backdrop-blur-[10px] rounded-xl border-[1px] border-gray-200 relative z-10">
          <div className="w-full h-full p-4 flex justify-between items-center text-xl text-gray-500">
            <div className="p-4 flex items-center gap-4  bg-white rounded-xl shadow-xl">
              <Link to="doctors" title="Doctors and appointments">
              <i className="fa-solid fa-business-time text-blue-500"></i>
              </Link>
              <p className="font-bold text-siteColor">
                Welcom <span className="text-secondColor">A</span>dmin
              </p>

              <i
                className="fa-solid fa-arrow-right-from-bracket cursor-pointer text-blue-500"
                onClick={() => SignOut()}
                title="exit"
              ></i>
            </div>
            <Link to="addDoc" className="flex items-center gap-4">
              <div className=" shadow-sm shadow-blue-500 border-2 border-blue-300 bg-blue-500 p-6 text-white rounded-full flex justify-center items-center w-2 h-2 cursor-pointer animate-spin hover:animate-none">
                <i className="fa-solid fa-plus"></i>
              </div>
            </Link>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute w-[100px] h-[100px] bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl shadow-purple-500/50 rounded-tl-[50%] rounded-tr-[40%] rounded-br-[60%] rounded-bl-[50%] top-10 left-10 animate-float"></div>
        <div className="absolute w-[120px] h-[120px] bg-gradient-to-r from-cyan-500 to-blue-500 shadow-xl shadow-blue-500/50 rounded-full bottom-16 right-12 animate-spin"></div>
        <div className="absolute w-[80px] h-[80px] bg-gradient-to-r from-yellow-400 to-orange-500 shadow-xl shadow-orange-400/50 rounded-tl-[50%] rounded-tr-[40%] rounded-br-[60%] rounded-bl-[50%] top-20 left-40 animate-wiggle"></div>
        <div className="absolute w-[90px] h-[90px] bg-gradient-to-r from-green-400 to-teal-500 shadow-xl shadow-green-500/50 rounded-full bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search user by name"
          className="p-2 rounded-lg border-[1px] border-blue-600 bg-transparent text-secondColor placeholder:text-blue-400 focus:outline-none caret-secondColor mt-4 w-full"
          maxLength={10}
          // value={searchbyName}
          onChange={(e) => {
            setSearchByName(e.target.value);
          }}
        />
        <i className="fa-solid fa-magnifying-glass absolute top-[50%] right-4 text-secondColor"></i>
      </div>

      {/* Table Section */}
      <div className="w-full h-[70%] mt-4 rounded-xl bg-[#fafbfd] border-[1px] border-gray-200 overflow-auto">
        <table className="w-full mt-4 border-collapse table-auto">
          <thead>
            <tr>
              <th className="text-siteColor px-4 py-2">Fname</th>
              <th className="text-siteColor px-4 py-2">Lname</th>
              <th className="text-siteColor px-4 py-2">Email</th>
              <th className="text-siteColor px-4 py-2">Role</th>
              <th className="text-siteColor px-4 py-2">From</th>
              <th className="text-siteColor px-4 py-2">Live</th>
              <th className="text-siteColor px-4 py-2">Birth</th>
              <th className="text-siteColor px-4 py-2">Phone</th>
              <th className="text-siteColor px-4 py-2">Gender</th>
              <th className="text-siteColor px-4 py-2">
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((target) => {
                if (target.fname.toLowerCase().includes(searchbyName.toLowerCase()) ) {
                  return target;
                } else if (searchbyName === "") {
                  return target;
                } else {
                  return null;
                }
              })
              .map((target) => (
                <tr
                  key={target.id}
                  className={`border-b hover:bg-gray-100 text-[#9ca3af] hover:text-[#9ca3af] text-center ${
                    target.isBanned ? "bg-red-300 text-gray-600 hover:bg-red-200 hover:text-gray-700" : ""
                  } duration-500`}
                >
                  <td className="px-4 py-2 text-secondColor">{target.fname}</td>
                  <td className="px-4 py-2">{target.lname}</td>
                  <td className="px-4 py-2">{target.email}</td>
                  <td
                    className={`px-4 py-2  ${
                      target.role === "user"
                        ? "text-green-500"
                        : target.role === "doctor"
                        ? "text-secondColor"
                        : "text-red-500"
                    } `}
                  >
                    {target.role}
                  </td>
                  <td className="px-4 py-2">{target.from}</td>
                  <td className="px-4 py-2">{target.live}</td>
                  <td className="px-4 py-2">{target.birth}</td>
                  <td className="px-4 py-2">+963 {target.phonNumber}</td>
                  <td className="px-4 py-2">{target.gender}</td>
                  {target.email === "admin@gmail.com" ? null : (
                    <td
                      className="px-4 py-2 cursor-pointer relative"
                      onClick={() => {
                        setSetting(setting === target.id ? null : target.id);
                      }}
                    >
                      {setting === target.id ? (
                        <i className="fa-regular fa-circle-xmark text-red-500"></i>
                      ) : (
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      )}
                      {setting === target.id ? (
                        <div className="absolute  border border-gray-300 top-8 right-9 bg-white text-black rounded-md w-fit z-10  shadow-md">
                          <div
                            className={`flex gap-2 items-center border-b border-gray-300 text-sm whitespace-nowrap px-2 ${
                              target.isBanned
                                ? "hover:bg-green-600"
                                : "hover:bg-red-600"
                            } py-1 rounded-t-md hover:text-white justify-between`}
                            onClick={() => Bannedfun(target.id)}
                          >
                            {target.isBanned ? (
                              <p>un Ban the user</p>
                            ) : (
                              <p>Ban the user</p>
                            )}
                            <i className="fa-solid fa-user-lock "></i>
                          </div>
                          <div
                            className="flex items-center whitespace-nowrap px-2 py-1 justify-between border-b  hover:text-white hover:bg-blue-500 text-sm gap-2 rounded-b-md"
                            onClick={() => {
                              Admin(target.id);
                            }}
                          >
                            {target.role === "admin"
                              ? "be not admin"
                              : "be admin"}
                            <i className="fa-solid fa-user-tie "></i>
                          </div>
                          {/* <div
                            className="flex items-center whitespace-nowrap px-2 py-1 justify-between rounded-b-md hover:text-white hover:bg-blue-500 text-sm gap-2"
                            onClick={() => {
                              doctor(target.id);
                            }}
                          >
                            {target.role === "doctor"
                              ? "be not doctor"
                              : "be doctor"}
                            <i className="fa-solid fa-stethoscope"></i>
                          </div> */}
                        </div>
                      ) : null}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
