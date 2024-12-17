// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import bg from "../Assets/image/bg-home.png";
import home_photo from "../Assets/image/home-photo.png";
import app from "../config/firebase.js";
import { getAuth, signOut } from "firebase/auth";
const Home = () => {
  const auth = getAuth(app);
  console.log(auth);

  const SignOut = async () => {
    console.log(auth.currentUser);
  await signOut(auth);
  };

  return (
    <>
      <div
        className="w-full h-[91.1vh] bg-cover bg-center flex gap-4 justify-center items-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex justify-center relative container">
          <div className="w-[50%] max-lg:text-center">
            <h1 className="text-siteColor text-[3rem] font-bold mt-6">
              Your Partner in
              <br />
              Health and Wellness
            </h1>
            <p className="text-siteColor text-md mt-4">
              We are committed to providing you with the best medical and
              healthcare services to help you live healthier and <br /> happier.
            </p>
            <a
              href="https://youtu.be/PJJsGuWouyk?si=mywQ8ndK_35RLGxc"
              target="_blank"
              className="flex gap-4 items-center mt-36 max-lg:mt-10 text-siteColor max-lg:justify-center"
            >
              <div className="border-2 border-siteColor px-2 py-[2px] rounded-full">
                <i class="fa-solid fa-play text-4xl pt-[1px] pl-[3px]"></i>
              </div>
              <p className="text-lg">See work</p>
            </a>
          </div>
          <img
            src={home_photo}
            alt="doctor"
            className="w-[60%] max-lg:hidden object-cover "
          />
          <ul className="w-[85%] h-[200px] absolute bottom-[-6.5rem] bg-white border-1 border-gray-400 shadow-md rounded-xl max-lg:hidden flex justify-between items-center px-10">
            <li>
              <div className="flex justify-between gap-4">
                <div>
                  <i class="fa-solid fa-phone bg-[#307BC4] p-4 text-white rounded-full"></i>
                </div>
                <div>
                  <h4 className="text-[#274760] font-bold"> Hotline</h4>

                  <p className="text-[#274760] opacity-55">123-456-7890</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex justify-between gap-4">
                <div>
                  <i class="fa-solid fa-syringe bg-[#307BC4] p-4 text-white rounded-full"></i>
                </div>
                <div>
                  <h4 className="text-[#274760] font-bold"> Ambulance</h4>

                  <p className="text-[#274760] opacity-55">876-256-876</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex justify-between gap-4">
                <div>
                  <i class="fa-solid fa-location-dot  bg-[#307BC4] text-white rounded-full px-[18px] py-[16px]"></i>
                </div>
                <div>
                  <h4 className="text-[#274760] font-bold"> Location</h4>
                  <p className="text-[#274760] opacity-55">New York, US</p>
                </div>
              </div>
            </li>
            <li>
              <Link to="/find-doctor" className=" text-white px-5 rounded-full py-3 flex justify-center items-center gap-4 font-bold bg-gradient-to-r from-[#307BC4] to-[#274760]">
                <p>Book Now</p>
                <i class="fa-solid fa-arrow-right"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-[100%] h-[100vh] lg:mt-[80px] bg-red-400"></div>
<button onClick={SignOut}>sign out</button>
    </>
  );
};

export default Home;



