import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../config/firebase.js";
import { db } from "../config/firebase.js";
import { setDoc, doc } from "firebase/firestore";
import SignUP from "../Assets/image/SignUP.png";
import { Link } from "react-router-dom";

const AddDoctor = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phonNumber, setPhonNumber] = useState("");
  const [fname, setFname] = useState("");
  const [url, setUrl] = useState("");
  const [lname, setLname] = useState("");
  const [birth, setBirth] = useState("");
  const [live, setLive] = useState("");
  const [gender, setGender] = useState("");
  const [from, setFrom] = useState("");
  const [steps, setSteps] = useState(true);
  const [error,setError]=useState('')
  const [agreeToTheTermsConditions, setAgreeToTheTermsConditions] =
    useState(false);
  const [success, setSuccess] = useState(false);
  const [pointes, setPointes] = useState(".");
  const [showPassWord, setSwowPassWord] = useState(false);

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

        // توليد المواعيد للطبيب بعد التسجيل
        const appointments = await generateAppointments(user.uid);

        // إضافة بيانات الطبيب مع المواعيد إلى Firestore
        await setDoc(doc(db, "users", user.uid), {
          fname,
          lname,
          birth,
          from,
          live,
          gender,
          phonNumber,
          email,
          role: "doctor",
          department,
          experienceYears,
          img: url,
          appointments, // إضافة المواعيد هنا
        });

        setSuccess(!success);
      } catch (err) {
        console.error(err);
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
  };

  const generateAppointments = async (doctorId) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const startHour = 9; // بداية المواعيد
    const endHour = 17; // نهاية المواعيد
    const intervalMinutes = 30; // الفاصل بين المواعيد

    // التاريخ الحالي
    const today = new Date();

    // مصفوفة لتخزين المواعيد
    const appointments = [];

    // توليد المواعيد لكل يوم
    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
      const dayName = days[dayIndex];

      // نسخ اليوم الحالي وضبط التاريخ ليطابق اليوم المطلوب
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + dayIndex); // إضافة الفارق بالأيام

      // إنشاء المواعيد بين الساعات المحددة
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += intervalMinutes) {
          const appointmentStart = new Date(currentDate);
          appointmentStart.setHours(hour, minute, 0, 0);

          const appointmentEnd = new Date(appointmentStart);
          appointmentEnd.setMinutes(appointmentEnd.getMinutes() + intervalMinutes);

          // إضافة الموعد إلى المصفوفة
          appointments.push({
            doctorId: doctorId,
            day: dayName,
            timeSlot: {
              start: appointmentStart,
              end: appointmentEnd,
            },
            status: "available", // الحالة الافتراضية
            patientId: null, // الموعد غير محجوز
          });
        }
      }
    }

    // إرجاع المواعيد المُولدة
    return appointments;
  };

  return (
    <div className="w-full  h-screen overflow-hidden flex items-center font-poppins container gap-8">
      {success ? SuccessHandling() : ""}
      <div className="w-full max-md:w-[75%] max-md:m-auto h-[75vh]">
        <div>
          <Link
            to="/admin"
            className=" max-md:flex md:hidden text-xl font-bold text-siteColor mb-4 items-center gap-2"
          >
            <i
              className="fa-solid fa-house text-secondColor"
              title="Go BACK TO HOME HUNY"
            ></i>
            <p>
              {" "}
              Go <span className="text-secondColor">back</span> to adm
              <span className="text-secondColor">in</span>
            </p>
          </Link>
          <h1 className="  text-4xl font-bold text-siteColor">
            C<span className="text-secondColor">rea</span>te{" "}
            <span className="text-secondColor">yo</span>ur{" "}
            <span className="text-secondColor">Doc</span>tor
          </h1>

          <div className={`${steps ? "block" : "hidden"}`}>
            <form
              onSubmit={(e) => formHandileing(e)}
              className="flex flex-col my-[50px] gap-6 xl:pr-[100px]"
            >
            
              <div className=" flex gap-2">
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
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <input
                    required
                    type="text"
                    className="   bg-[#eee] pl-12 w-full  border-[1.5px] border-gray-300 p-3 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white focus:bg-white duration-500"
                    placeholder="Doctor's Emergency Number"
                    value={phonNumber}
                    onChange={(e) => setPhonNumber(e.target.value)}
                    minLength={10}
                    maxLength={10}
                  />
                  <i className="fa-solid fa-phone absolute top-[16px] left-4 text-gray-400"></i>
                </div>
                <select className="bg-[#eee] p-3  w-full h-[50px]  border-[1.5px] border-gray-300 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white focus:bg-white duration-500 text-gray-400" onChange={(e)=>{setDepartment(e.target.value)}}>
                  <option>Department</option>
                  <option>Emergency </option>
                  <option>Psychiatry </option>
                  <option>Cardiology </option>
                  <option>Neurology </option>
                  <option>Orthopedics </option>
                  <option>Pediatrics </option>
                  <option>Gynecology </option>
                  <option>Oncology </option>
                  <option>Dermatology </option>
                  <option>Radiology </option>
                  <option>Ophthalmology </option>
                  <option>ENT </option>
                  <option>Surgery </option>
                  <option>Anesthesiology </option>
                  <option>Gastroenterology </option>
                  <option>Urology </option>
                  <option>Nephrology </option>
                  <option>Pulmonology </option>
                  <option>Endocrinology </option>
                  <option>Hematology </option>
                  <option>Infectious Diseases </option>
                  <option>Rehabilitation </option>
                </select>
                
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
                <input type="number" className="bg-[#eee] p-3 w-[150px] h-[50px]  border-[1.5px] border-gray-300 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white focus:bg-white duration-500 text-gray-400" placeholder="Years Experience" maxLength={2} minLength={1} onChange={e=>setExperienceYears(e.target.value)}/>
              </div>
                <input type="text" className="bg-[#eee] p-3 w-full h-[50px]  border-[1.5px] border-gray-300 rounded-lg focus:border-secondColor focus:outline-none  hover:border-l-secondColor hover:bg-white focus:bg-white duration-500 text-gray-400" placeholder="url img" onChange={e=>setUrl(e.target.value)}/>
             
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
          to="/admin"
          className=" flex gap-2 items-center text-xl font-bold text-[#fff] absolute top-8 right-6"
        >
          <p>Admin</p>
          <i className="fa-solid fa-screwdriver-wrench"></i>
        </Link>
      </div>
    </div>
  );
};

export default AddDoctor;
