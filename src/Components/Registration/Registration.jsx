import { Link, useNavigate } from "react-router-dom";
import signUp from "../../assets/Images/signUp.png";
import { useState } from "react";

export default function Registration() {
  const [termsChecked, setTermsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const { name, mail, password } = e.target;
    const userSignUp = {
      name: name.value,
      email: mail.value,
      password: password.value,
    };

    fetch("http://192.168.1.7:8081/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userSignUp),
    })
      .then((response) => {
        if (response.ok) {
          navigate(`/otp?email=${mail.value}`);
        } else {
          console.error("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="login-page min-h-screen p-4 md:p-16 flex justify-center items-center">
      <div className="p-4 rounded-xl bg-white bg-opacity-40 accent-color shadow-md">
        <div className="login-box md:flex md:justify-center shadow-md md:items-center bg-white rounded-xl p-8 bg-opacity-90 w-full md:w-full">
          <div className="grid lg:grid-cols-2 gap-4 w-full">
            <div className="md:flex md:justify-center md:items-center">
              <img className="w-10/12 max-w-lg mx-auto" src={signUp} alt="" />
            </div>
            <div className="flex justify-center items-center">
              <div className="bg-[#E5EBF5] shadow-lg px-12 py-9 rounded-lg lg:w-10/12">
                <h2 className="text-center font-bold text-4xl">Sign Up</h2>
                <p className="text-center">It's free and easy</p>

                <form action="" onSubmit={handleSignUp}>
                  <div className="mt-5">
                    <p className="mb-0 ms-1 text-[#656566]">Enter Your Name</p>
                    <input
                      name="name"
                      type="text"
                      placeholder="Name"
                      className="input input-bordered w-full max-w-lg border-none shadow-sm"
                      required
                    />

                    <p className="mb-0 ms-1 mt-5 text-[#656566]">
                      Enter Your Mail
                    </p>
                    <input
                      name="mail"
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full max-w-lg border-none shadow-sm"
                      required
                    />

                    <p className="mb-0 ms-1 mt-5 text-[#656566]">
                      Enter Your Password
                    </p>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="input input-bordered w-full max-w-lg border-none shadow-sm"
                      required
                    />
                    <small className="ms-1 text-[#7d7e80]">
                      Must be 8 character at least
                    </small>

                    <div className="mt-3">
                      <p className="ms-1 text-[#656566] mb-2">
                        Already have an account?{" "}
                        <span className="underline text-[#004AAD] font-semibold">
                          <Link to="/login">Login</Link>
                        </span>{" "}
                        here
                      </p>
                    </div>

                    <div className="mt-3 mb-3 flex items-center">
                      <input
                        type="checkbox"
                        className="me-1 ms-1 h-4 w-4 mb-[1px]"
                        id="termsCheckbox"
                        required
                        checked={termsChecked}
                        onChange={() => setTermsChecked(!termsChecked)}
                      />
                      <label className="text-[#656566]" htmlFor="termsCheckbox">
                        I agree to the{" "}
                        <span className="font-bold">Terms and Conditions</span>
                      </label>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className={`w-full p-3 rounded-lg cursor-pointer ${
                          termsChecked
                            ? "bg-[#004AAD] text-white"
                            : "bg-[#B0B0B0] text-gray-500"
                        }`}
                        disabled={!termsChecked}
                      >
                        Sign Up
                      </button>
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
