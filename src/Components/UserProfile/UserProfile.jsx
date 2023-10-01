import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import profilePic from "../../assets/Images/IMG_1859 (1)-01.jpeg";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState({ enrollModules: [] });
  const [isLoading, setIsLoading] = useState(true);
  const isInitialRender = useRef(true);
  const { userId } = useParams();
  const [moduleList, setModuleList] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);

  // useEffect(() => {
  //   if (isInitialRender.current) {
  //     fetch(`http://192.168.1.7:8081/info/userinfo/${userId}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUserInfo(data);
  //         setIsLoading(false);
  //       });
  //     isInitialRender.current = false;
  //   }
  // }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      const getTokenFromLocalStorage = () => {
        return localStorage.getItem("token");
      };

      const apiUrl = `http://192.168.1.7:8081/info/userinfo/${userId}`;

      const token = getTokenFromLocalStorage();
      
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      };

      fetch(apiUrl, {
        method: "GET",
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          setIsLoading(false); 
        });
      isInitialRender.current = false;
    }
  }, [userId]);

  // useEffect(() => {
  //   fetch("http://192.168.1.7:8081/admin/module")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setModuleList(data);
  //     });
  // }, []);

  useEffect(() => {
    const getTokenFromLocalStorage = () => {
      return localStorage.getItem("token");
    };

    const apiUrl = "http://192.168.1.7:8081/admin/module";
    const token = getTokenFromLocalStorage();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    };
    fetch(apiUrl, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setModuleList(data);
      })
      .catch((error) => {
        console.error("Error fetching modules:", error);
      });
  }, []);

  const availableModules = moduleList.filter(
    (module) =>
      module.visibility === true &&
      !userInfo.enrollModules.some(
        (enrolledModule) => enrolledModule.moduleId === module.id
      )
  );

  const sendModuleRequest = () => {
    if (selectedModule) {
      const selectedModuleObject = moduleList.find(
        (module) => module.moduleName === selectedModule
      );

      const requestBody = {
        userID: userId,
        moduleID: selectedModuleObject.id,
        userName: userInfo.userName,
        userEmail: userInfo.userEmail,
        moduleName: selectedModule,
      };

      // Function to retrieve the JWT token from localStorage
      const getTokenFromLocalStorage = () => {
        return localStorage.getItem("token");
      };

      // Retrieve the JWT token from localStorage
      const token = getTokenFromLocalStorage();

      // Create headers with the token
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Set the token as Bearer token
      };

      fetch("http://192.168.1.7:8081/admin/pendingModule", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (response.ok) {
            document.getElementById("my_modal_3").close();

            Swal.fire({
              icon: "success",
              title: "Request Successful",
              text: "Your request for the course has been submitted successfully.",
            });
          } else {
            console.error("Error sending module request");
          }
        })
        .catch((error) => {
          console.error("Error sending module request:", error);
        });
    } else {
      console.error("No module selected");
    }
  };

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
                  <img className="rounded-full w-36" src={profilePic} alt="" />
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
        <div className="flex justify-end">
          <button
            className="btn btn-outline btn-success text-white"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Request for new Course
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">
                Select module and request to Admin
              </h3>
              <div className="mt-4">
                <h3 className="font-bold text-lg">Select a Module</h3>
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                >
                  <option value="">Select a Module</option>
                  {availableModules
                    .filter((module) => module.visibility === true)
                    .map((module) => (
                      <option key={module.id} value={module.moduleName}>
                        {module.moduleName}
                      </option>
                    ))}
                </select>
              </div>
              {selectedModule && (
                <div className="mt-4">
                  <h3 className="font-bold text-lg">Selected Module</h3>
                  <p className="text-2xl font-bold">{selectedModule}</p>
                </div>
              )}
              <div className="mt-4 justify-end flex">
                <button
                  className="btn btn-sm btn-success"
                  onClick={sendModuleRequest}
                  disabled={!selectedModule}
                >
                  Request
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
