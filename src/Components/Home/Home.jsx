import { Link } from "react-router-dom";
import logo from "../../assets/Images/p2mLogo.png";
import homeLapp from "../../assets/Images/homeLapp.png";

export default function Home() {
  return (
    <div className="grid lg:grid-cols-2 h-[100vh] main-banner-page">
      <div className="md:flex md:justify-center md:items-center">
        <div className="p-5 md:p-12 lg:p-12">
          <h2 className="font-semibold text-2xl md:text-3xl lg:text-3xl mt-4 md:mt-8 lg:mt-12 text-center">
            Learning & Assessment <br /> Portal for Professionals
          </h2>

          <h1 className="text-center text-6xl font-bold mt-3 text-blue-700">
            LAPP
          </h1>

          <div className="flex justify-center my-4">
            <img className="w-[40%]" src={logo} alt="" />
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="btn register-button mt-3 md:mt-5 lg:mt-5 bg-[#004AAD] text-white shadow-xl px-6 md:px-12 text-lg md:text-2xl"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
      <div className="md:flex md:justify-center md:items-center p-8">
        <img
          src={homeLapp}
          alt="banner-image"
          className="max-w-full h-auto banner-image"
        />
      </div>
    </div>
  );
}
