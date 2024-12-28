import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../store/Slices/state.js";
const Dark = () => {
  const mode = useSelector((state) => state.state.mode);
  console.log(mode);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(toggleMode());
      }}
      title={`${mode ? "Dark" : "Light"}`}
      className={`fixed bottom-10 right-10 ${
        mode ? "" : ""
      } border bg-[#2b55ff2f] backdrop-blur-lg text-xl border-white text-white font-bold w-[50px] h-[50px] rounded-full z-[21] animate-bounce duration-200 flex items-center justify-center`}
    >
      {mode ? (
        <i class="fa-solid fa-sun"></i>
      ) : (
        <i class="fa-solid fa-moon"></i>
      )}
    </button>
  );
};

export default Dark;
