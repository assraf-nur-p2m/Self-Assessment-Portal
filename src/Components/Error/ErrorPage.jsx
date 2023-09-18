import React from "react";
import errorPic from "../../assets/Images/errorPic.jpg";

export default function ErrorPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <img className="w-5/12" src={errorPic} alt="" />
    </div>
  );
}
