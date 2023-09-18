import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState({ enrollModules: [] });
  const [isLoading, setIsLoading] = useState(true);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      fetch("http://192.168.1.29:8081/info/userinfo/407")
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data);
          setIsLoading(false);
        });
      isInitialRender.current = false;
    }
  }, []);

  return (
    <div className="login-page min-h-screen p-4 md:p-16 flex justify-center items-center">
      <div className="p-4 rounded-xl bg-white bg-opacity-40 accent-color shadow-md">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="bg-white rounded-lg p-6 md:flex md:flex-row md:gap-8">
              <div className="md:w-1/2 text-center md:text-left">
                <div className="flex justify-center items-center">
                  <img
                    className="rounded-full w-36"
                    src="https://cdn-icons-png.flaticon.com/512/560/560199.png"
                    alt=""
                  />
                </div>
                <div className="text-center mt-2">
                  <p className="text-3xl font-bold">{userInfo.userName}</p>
                  <p className="font-semibold">{userInfo.userEmail}</p>
                </div>
              </div>
              <div className="divider lg:divider-horizontal"></div>
              <div className="md:w-1/2 flex justify-center items-center px-4 accent-color rounded-lg">
                <div className="px-6 bg-slate-50 py-6 rounded-lg shadow-xl">
                  <p className="text-2xl font-bold">
                    Quiz Average: {userInfo.quizAvg}%
                  </p>
                  <p className="text-2xl font-bold">
                    Quiz Attempts: {userInfo.quizAttempt}
                  </p>
                  <p className="text-2xl font-bold">
                    Last quiz mark: {userInfo.lastQuizMark}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {userInfo.enrollModules && userInfo.enrollModules.length > 0 ? (
                  userInfo.enrollModules.map((module) => (
                    <div
                      key={module.moduleId}
                      className="card bg-base-100 shadow-xl"
                    >
                      <div className="card-body">
                        <h2 className="card-title">{module.moduleName}</h2>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <div className="card-actions justify-end">
                          <Link to={`/core-module/${module.moduleId}`}>
                            <button className="btn btn-primary">
                              View Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No modules enrolled.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
