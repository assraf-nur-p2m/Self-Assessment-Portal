import React from "react";
import otpImage from "../../assets/Images/otpImage.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function OtpVerify() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get("email");
  const navigate = useNavigate();

  const handleOtp = (e) => {
    e.preventDefault();
    const { otp } = e.target;
    const otpValue = {
      otp: otp.value,
      email: emailFromQuery,
    };

    fetch("http://192.168.1.29:8081/admin/validateuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(otpValue),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("OTP validation failed");
        }
      })
      .then((data) => {
        if (data && data.id) {
          navigate(`/user-profile/${data.id}`);
        } else {
          console.error("Invalid response data");
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
          <div>
            <div className="flex justify-center items-center">
              <img className="w-60" src={otpImage} alt="" />
            </div>
            <div className="text-center">
              <form action="" onSubmit={handleOtp}>
                <h2 className="text-center text-3xl font-semibold">
                  Enter your{" "}
                  <span className="font-bold text-[#004AAD]">OTP</span> code
                </h2>
                <input
                  name="otp"
                  type="number"
                  className="mt-5 w-full p-4 shadow-xl border rounded-lg text-center text-xl"
                />

                <input
                  type="submit"
                  className="mt-8 bg-[#004AAD] text-white px-12 py-3 rounded-lg text-xl cursor-pointer"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
