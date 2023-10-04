import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import congo from "../../assets/Images/congo.jpg";
import { Link } from "react-router-dom";

export default function Result() {
  const queryParams = new URLSearchParams(location.search);
  const moduleId = queryParams.get("moduleId");
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`http://192.168.1.3:8081/api/result/${user.id}/${moduleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setResultData(data);
        });
    }
  }, [user, moduleId, token]);

  if (!resultData) {
    return <div>Loading...</div>;
  }

  const { userName, marks, isPass } = resultData;

  return (
    <div className="login-page min-h-screen p-4 md:p-16 flex justify-center items-center">
      <div className="p-4 rounded-xl bg-white bg-opacity-40 accent-color shadow-md">
        <div className="login-box shadow-md bg-white rounded-xl p-8 bg-opacity-90 w-full md:w-full">
          {isPass ? (
            <div>
              <img
                className="w-96 rounded-2xl mb-5 mx-auto"
                src={congo}
                alt=""
              />
              <p className="text-2xl">
                Congratulations !
                <span className="text-4xl font-bold"> {userName}</span> ,You
                passed the test !
              </p>
              <p className="text-2xl text-center mt-3">
                You Obtained{" "}
                <span className="text-3xl font-bold">{marks}%</span> marks
              </p>
            </div>
          ) : (
            <div>
              <p className="text-2xl">
                Try again next time{" "}
                <span className="text-4xl font-bold">{userName}</span>, You
                didn't pass the test.
              </p>
              <p className="text-2xl text-center mt-3">
                You Obtained{" "}
                <span className="text-3xl font-bold">{marks}%</span> marks
              </p>
            </div>
          )}

          <div className="mt-12 flex justify-between">
            <Link className="btn btn-info" to="/user-profile">Profile</Link>
            <Link className="btn btn-accent" to="/review-quiz">Review Quiz</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
