import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { LuUserCheck, LuUserX } from "react-icons/lu";

export default function DashPanel() {
  const [dashData, setDashData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.29:8081/dashboard/admin")
      .then((res) => res.json())
      .then((data) => {
        setDashData(data);
      });
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between gap-6">
        <div className="flex justify-between items-center gap-8 p-8 rounded-xl shadow-xl bg-gradient-to-r to-[#30cfd0] from-[#330867] text-white flex-1">
          <div className="text-3xl">
            <FaUsers className="text-6xl mx-auto" />{" "}
            <p className="mt-2">All User</p>
          </div>
          <div>
            <p className="text-8xl">{dashData.allUsers}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-8 p-8 rounded-xl shadow-xl bg-gradient-to-r to-[#3075d0] from-[#084c67] text-white flex-1">
          <div className="text-3xl">
            <LuUserCheck className="text-6xl mx-auto" />{" "}
            <p className="mt-2">Active User</p>
          </div>
          <div>
            <p className="text-8xl">{dashData.activeUsers}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-8 p-8 rounded-xl shadow-xl bg-gradient-to-r from-[#670867] to-[#3088d0] text-white flex-1">
          <div className="text-3xl">
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
    </div>
  );
}
