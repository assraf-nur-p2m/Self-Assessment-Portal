import React from "react";
import { GrUserAdmin } from "react-icons/gr";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateAdmin() {
  const currentDate = new Date().toISOString().slice(0, 16);

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    const {
      adminName,
      adminEmail,
      adminPassword,
      status,
      // dateTime,
      uploadVideo,
      uploadDocument,
      uploadQuestion,
      createUser,
      holdUser,
      modifyUser,
      deleteUser,
    } = e.target;

    if (!status.value) {
      Swal.fire({
        icon: "error",
        title: "Select Admin Status",
      });
      return;
    }

    const adminInfo = {
      name: adminName.value,
      email: adminEmail.value,
      password: adminPassword.value,
      status: status.value,
      // registrationDatetime: dateTime.value,
      role: "admin",
      permission: {
        canUploadVideo: uploadVideo.checked,
        canUploadDoc: uploadDocument.checked,
        canUploadQues: uploadQuestion.checked,
        canCreateUser: createUser.checked,
        canHoldUser: holdUser.checked,
        canModifyUser: modifyUser.checked,
        canDeleteUser: deleteUser.checked,
      },
    };
    fetch("http://192.168.1.29:8081/admin/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(adminInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New Admin Added",
          showConfirmButton: false,
          timer: 1000,
        });
        e.target.reset();
      });
  };

  return (
    <div className="p-2 shadow-lg rounded-xl border pb-5">
      <div className="flex justify-between mb-2">
        <h1 className="text-center text-4xl font-semibold mb-0 ps-1">
          Create Admin
        </h1>
        <Link
          className="bg-success flex items-center justify-between gap-3 text-lg px-3 py-1 rounded-lg font-bold"
          to="/dashboard/manage-admin"
        >
          <GrUserAdmin />
          Admin List
        </Link>
      </div>
      <hr />
      <div>
        <form action="" onSubmit={handleCreateAdmin}>
          <div className="flex justify-between mt-3">
            <div className="form-control px-3 w-full">
              <label className="label mb-0">
                <span className="label-text mb-0">Admin Name</span>
              </label>
              <input
                required
                name="adminName"
                type="text"
                placeholder="Name"
                className="input input-bordered w-12/12 mt-0 shadow-md text-lg"
              />
            </div>
            <div className="form-control px-3 w-full">
              <label className="label mb-0">
                <span className="label-text mb-0">Admin Email</span>
              </label>
              <input
                required
                name="adminEmail"
                type="email"
                placeholder="Email"
                className="input input-bordered w-12/12 mt-0 shadow-md text-lg"
              />
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="form-control px-3 w-6/12">
              <label className="label mb-0">
                <span className="label-text mb-0">Admin Password</span>
              </label>
              <input
                required
                name="adminPassword"
                type="text"
                placeholder="Password"
                className="input input-bordered w-12/12 mt-0 shadow-md text-lg"
              />
            </div>
            <div className="w-6/12 mt-2">
              <div className="flex items-center gap-4 px-3 mt-6">
                <label className="font-medium text-gray-700">Status:</label>
                <label className="inline-flex items-center border px-2 cursor-pointer py-1 bg-green-300 rounded-lg">
                  <input
                    type="radio"
                    className="radio text-indigo-500"
                    name="status"
                    value="true"
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="inline-flex items-center border px-2 cursor-pointer bg-red-300 py-1 rounded-lg">
                  <input
                    type="radio"
                    className="radio text-indigo-500"
                    name="status"
                    value="false"
                  />
                  <span className="ml-2">Inactive</span>
                </label>
              </div>
            </div>
          </div>

          {/* <div className="flex items-center gap-4 px-3 mt-6">
            <label className="font-medium text-gray-700">Status:</label>
            <label className="inline-flex items-center border px-2 cursor-pointer py-1 bg-green-300 rounded-lg">
              <input
                type="radio"
                className="radio text-indigo-500"
                name="status"
                value="true"
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="inline-flex items-center border px-2 cursor-pointer bg-red-300 py-1 rounded-lg">
              <input
                type="radio"
                className="radio text-indigo-500"
                name="status"
                value="false"
              />
              <span className="ml-2">Inactive</span>
            </label>
          </div> */}

          <div className="mt-6 px-3 flex justify-between items-end">
            <div>
              <h2 className="mb-2 text-xl">Admin Permission:</h2>
              <div className="ms-5">
                <div className="flex items-center">
                  <input
                    name="uploadVideo"
                    type="checkbox"
                    id="uploadVideo"
                    className="checkbox h-5 w-5 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="uploadVideo"
                    className="ml-2 mt-[1px] text-gray-700"
                  >
                    Can upload Video
                  </label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    name="uploadDocument"
                    type="checkbox"
                    id="uploadDocument"
                    className="checkbox h-5 w-5 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="uploadDocument"
                    className="ml-2 mt-[1px] text-gray-700"
                  >
                    Can upload Document
                  </label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    name="uploadQuestion"
                    type="checkbox"
                    id="uploadQuestion"
                    className="checkbox h-5 w-5 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="uploadQuestion"
                    className="ml-2 mt-[1px] text-gray-700"
                  >
                    Can upload Question
                  </label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    name="createUser"
                    type="checkbox"
                    id="createUser"
                    className="checkbox h-5 w-5 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="createUser"
                    className="ml-2 mt-[1px] text-gray-700"
                  >
                    Can Create User
                  </label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    name="holdUser"
                    type="checkbox"
                    id="holdUser"
                    className="checkbox h-5 w-5 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="holdUser"
                    className="ml-2 mt-[1px] text-gray-700"
                  >
                    Can Hold User
                  </label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    name="modifyUser"
                    type="checkbox"
                    id="modifyUser"
                    className="checkbox h-5 w-5 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="modifyUser"
                    className="ml-2 mt-[1px] text-gray-700"
                  >
                    Can Modify User
                  </label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    name="deleteUser"
                    type="checkbox"
                    id="deleteUser"
                    className="checkbox h-5 w-5 text-indigo-600 border-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="deleteUser"
                    className="ml-2 mt-[1px] text-gray-700"
                  >
                    Can Delete User
                  </label>
                </div>
              </div>
            </div>
            <div className="">
              <input
                type="submit"
                className="btn btn-success btn-sm"
                value="add admin"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
