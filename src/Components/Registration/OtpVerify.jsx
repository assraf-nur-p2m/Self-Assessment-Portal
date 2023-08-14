import React from "react";
import otpImage from "../../assets/Images/otpImage.png";

export default function OtpVerify() {
  return (
    <div className="login-page min-h-screen p-4 md:p-16 flex justify-center items-center">
      <div className="p-4 rounded-xl bg-white bg-opacity-40 accent-color shadow-md">
        <div className="login-box md:flex md:justify-center shadow-md md:items-center bg-white rounded-xl p-8 bg-opacity-90 w-full md:w-full">
          <div>
            <div className="flex justify-center items-center">
              <img className="w-60" src={otpImage} alt="" />
            </div>
            <div className="text-center">
              <h2 className="text-center text-3xl font-semibold">
                Enter the OTP code
              </h2>
              <input
                type="number"
                className="mt-5 w-full p-4 shadow-xl border rounded-lg"
              />

              <input
                type="submit"
                className="mt-8 bg-[#004AAD] text-white px-12 py-3 rounded-lg text-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
