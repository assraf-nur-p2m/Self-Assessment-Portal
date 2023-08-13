import { Link } from "react-router-dom";
import signUp from "../../assets/Images/signUp.png";

export default function Registration() {
  return (
    <div className="login-page min-h-screen p-4 md:p-16 flex justify-center items-center">
      <div className="p-4 rounded-xl bg-white bg-opacity-40 w-full accent-color shadow-md">
        <div className="login-box md:flex md:justify-center shadow-md md:items-center bg-white rounded-xl p-8 bg-opacity-90 w-full md:w-full">
          <div className="grid lg:grid-cols-2 gap-4 w-full">
            <div className="md:flex md:justify-center md:items-center">
              <img
                className="w-full md:w-9/12 max-w-lg mx-auto"
                src={signUp}
                alt=""
              />
            </div>
            <div className="flex justify-center items-center">
              <div className="bg-[#E5EBF5] shadow-lg px-12 py-9 rounded-lg w-9/12">
                <h2 className="text-center font-bold text-4xl">Sign Up</h2>
                <p className="text-center">It's free and easy</p>

                <form action="">
                  <div className="mt-5">
                    <p className="mb-0 ms-1 text-[#656566]">Enter Your Name</p>
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-bordered w-full max-w-lg border-none shadow-sm"
                    />

                    <p className="mb-0 ms-1 mt-5 text-[#656566]">
                      Enter Your Mail
                    </p>
                    <input
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full max-w-lg border-none shadow-sm"
                    />

                    <p className="mb-0 ms-1 mt-5 text-[#656566]">
                      Enter Your Password
                    </p>
                    <input
                      type="password"
                      placeholder="Password"
                      className="input input-bordered w-full max-w-lg border-none shadow-sm"
                    />
                    <small className="ms-1 text-[#7d7e80]">
                      Must be 8 character at least
                    </small>

                    <div className="mt-4 flex items-center">
                      <input
                        type="checkbox"
                        className="me-1 ms-1 h-4 w-4 mb-[1px]"
                        id="termsCheckbox"
                      />
                      <label className="text-[#656566]" htmlFor="termsCheckbox">
                        I agree to the{" "}
                        <span className="font-bold">Terms and Conditions</span>
                      </label>
                    </div>

                    <div className="mt-3">
                      <p className="ms-1 text-[#656566] mb-2">
                        Already have account?{" "}
                        <span className="underline text-[#004AAD] font-semibold">
                          <Link to="/login">Login</Link>
                        </span>{" "}
                        here
                      </p>
                    </div>

                    <div className="text-center">
                      <input
                        type="submit"
                        className="w-full bg-[#004AAD] text-white p-3 rounded-lg cursor-pointer"
                        value="Sign Up"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
