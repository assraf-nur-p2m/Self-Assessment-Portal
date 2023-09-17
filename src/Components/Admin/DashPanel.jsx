import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { LuUserCheck, LuUserX } from "react-icons/lu";
import Swal from "sweetalert2";

export default function DashPanel() {
  const [dashData, setDashData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.29:8081/dashboard/admin")
      .then((res) => res.json())
      .then((data) => {
        setDashData(data);
      });
  }, []);

  const handleVisibility = (modId) => {
    const updatedModules = dashData.modules.map((mod) => {
      if (mod.id === modId) {
        return {
          ...mod,
          visibility: !mod.visibility,
        };
      }
      return mod;
    });

    const updatedDashData = { ...dashData, modules: updatedModules };

    setDashData(updatedDashData);
    const requestBody = {
      isActive: !dashData.modules.find((mod) => mod.id === modId).visibility,
    };

    fetch(`http://192.168.1.29:8081/admin/module/visibility/${modId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Module visibility updated for module with ID ${modId}`);
        } else {
          console.error(
            `Failed to update module visibility for module with ID ${modId}`
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleModuleDelete = (modId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this module!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://192.168.1.29:8081/admin/module/${modId}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              setDashData((prevData) => ({
                ...prevData,
                modules: prevData.modules.filter((mod) => mod.id !== modId),
              }));
              Swal.fire({
                title: "Deleted!",
                text: `Module with ID ${modId} has been deleted.`,
                icon: "success",
              });

              console.log(`Module with ID ${modId} has been deleted.`);
            } else {
              Swal.fire({
                title: "Error",
                text: `Failed to delete module with ID ${modId}`,
                icon: "error",
              });

              console.error(`Failed to delete module with ID ${modId}`);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };

  return (
    <div className="p-5">
      <div className="flex justify-between gap-6">
        <div className="flex justify-between items-center gap-8 p-8 rounded-xl shadow-xl bg-gradient-to-r from-[#330867] to-[#30cfd0] text-white flex-1 hover:scale-110 transform transition-transform duration-300 cursor-pointer">
          <div className="text-2xl">
            <FaUsers className="text-6xl mx-auto" />{" "}
            <p className="mt-2">All User</p>
          </div>
          <div>
            <p className="text-8xl">{dashData.allUsers}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-8 p-8 rounded-xl shadow-xl bg-gradient-to-r from-[#084c67] to-[#3070d0] text-white flex-1 hover:scale-110 transform transition-transform duration-300 cursor-pointer">
          <div className="text-2xl">
            <LuUserCheck className="text-6xl mx-auto" />{" "}
            <p className="mt-2">Active User</p>
          </div>
          <div>
            <p className="text-8xl">{dashData.activeUsers}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-8 p-8 rounded-xl shadow-xl bg-gradient-to-r from-[#1e97dd] to-[#8949f0] text-white flex-1 hover:scale-110 transform transition-transform duration-300 cursor-pointer">
          <div className="text-2xl">
            <LuUserX className="text-6xl mx-auto" />{" "}
            <p className="mt-2">Inactive User</p>
          </div>
          <div>
            <p className="text-8xl">{dashData.inactiveUsers}</p>
          </div>
        </div>
      </div>

      {/* categories */}
      <div className="mt-5">
        <p className="ms-1 mb-1 text-xl font-bold">Category:</p>
        <div className="p-5 rounded-xl shadow-xl bg-gradient-to-r from-[#b4ade7] via-[#585e92] to-[#505285]">
          <div>
            <ul className="flex justify-between items-center">
              {dashData.categories?.map((category) => (
                <li
                  className="text-2xl text-white hover:scale-110 transform transition-transform duration-300 px-8 py-1"
                  key={category.id}
                >
                  {category.category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modules and details */}
      <div className="mt-5">
        <p className="ms-1 mb-1 text-xl font-bold">Modules:</p>
        <div className="ps-1">
          <ul className="grid grid-cols-2 gap-5">
            {dashData.modules?.map((mod) => (
              <li className="module" key={mod.id}>
                <div className="border p-4 rounded-xl bg-gradient-to-b from-opacity-50 via-opacity-0 to-opacity-50 bg-gray-200 blend-lighten shadow-xl">
                  <h2 className="text-4xl text-center font-semibold mb-3">
                    {mod.moduleName}
                  </h2>
                  <div className="px-3 mb-2 border rounded-xl bg-slate-50 font-bold">
                    <p className="text-xl py-1 border-b-2">
                      Question in level 1: {mod.level1Questions}
                    </p>
                    <p className="text-xl py-1 border-b-2">
                      Question in level 2: {mod.level2Questions}
                    </p>
                    <p className="text-xl py-1 border-b-2">
                      Question in level 3: {mod.level3Questions}
                    </p>
                    <p className="text-xl py-1 border-b-2">
                      Quiz Category: {mod.quizCategory}
                    </p>
                    <p className="text-xl py-1">
                      Percentage of Pass: {mod.percentOfPass}%
                    </p>
                  </div>
                  <div className="flex justify-between px-2 text-md mb-2">
                    <p>
                      Start At:{" "}
                      <span className="font-bold">
                        {new Date(mod.examStartTime).toLocaleString()}
                      </span>
                    </p>
                    <p>
                      End At:{" "}
                      <span className="font-bold">
                        {new Date(mod.examEndTime).toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <div className="px-2">
                    <p className="mb-2">
                      Notice: <span className="font-bold">{mod.notice}</span>
                    </p>
                    <p className="mb-2">
                      Notice Visibility Status:{" "}
                      <span className="font-bold">
                        {mod.showNotice ? "Public" : "Private"}
                      </span>
                    </p>
                    <div className="flex justify-between">
                      <p className="mb-2">
                        Start At:{" "}
                        <span className="font-bold">
                          {new Date(mod.noticeStartTime).toLocaleString()}
                        </span>
                      </p>
                      <p className="mb-2">
                        End At:{" "}
                        <span className="font-bold">
                          {new Date(mod.noticeEndTime).toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="mb-2">
                        Quiz Time:{" "}
                        <span className="font-bold">
                          {mod.quizTime >= 3600
                            ? `${Math.floor(
                                mod.quizTime / 3600
                              )} hours ${Math.floor(
                                (mod.quizTime % 3600) / 60
                              )} minutes ${mod.quizTime % 60} seconds`
                            : `${Math.floor(mod.quizTime / 60)} minutes ${
                                mod.quizTime % 60
                              } seconds`}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="mb-2">
                          Visibility of Module:{" "}
                          <span className="font-bold">
                            {mod.visibility ? "Public" : "Private"}
                          </span>
                        </p>
                      </div>
                      <div>
                        <button
                          className="btn btn-xs btn-outline btn-primary"
                          onClick={() => handleVisibility(mod.id)}
                        >
                          {mod.visibility ? "Make Private" : "Make Public"}
                        </button>
                      </div>
                    </div>
                    <div className="text-end mt-2">
                      <button
                        onClick={() => handleModuleDelete(mod.id)}
                        className="bg-white p-2 text-red-600 rounded-full tooltip tooltip-left"
                        data-tip="Delete the Module"
                      >
                        <AiOutlineDelete className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
