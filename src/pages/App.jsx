import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
const App = () => {
  const mode = useSelector((state) => state.state.mode);

  return (
    <div className={`${mode? 'dark' :''}`}>
      <div className={`${mode ? 'bg-[#212121]':''}`}>
      <Header />
      <Outlet/>
      <Footer />
      </div>
    </div>
  );
};

export default App;
