import { Link } from "react-router-dom";
import banner from "../../assets/Images/banner2.jpg";

export default function Home() {
  return (
    <div className="grid lg:grid-cols-2 h-[100vh] main-banner-page">
      <div className="md:flex md:justify-center md:items-center">
        <div className="p-5 md:p-12 lg:p-12">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center">
            Check your domain knowledge on{" "}
            <span className="text-[#FF8202] font-extrabold text-3xl md:text-4xl lg:text-7xl">
              AML/CFT
            </span>{" "}
            <br /> with us !
          </h1>

          <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl mt-4 md:mt-8 lg:mt-12 text-center">
            Level up yourself and boost your career
          </h2>
          <h3 className="text-center mt-0 md:mt-0 lg:mt-0 text-xl md:text-2xl lg:text-2xl">
            Give Test Online and get your score instantly
          </h3>

          <div className="text-center">
            <Link
              to="/login"
              className="btn register-button mt-3 md:mt-12 lg:mt-12 bg-[#FF8202] text-white shadow-xl px-6 md:px-12 text-lg md:text-2xl"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
      <div className="md:flex md:justify-center md:items-center p-12">
        <img
          src={banner}
          alt="banner-image"
          className="max-w-full h-auto banner-image"
        />
      </div>
    </div>
  );
}
