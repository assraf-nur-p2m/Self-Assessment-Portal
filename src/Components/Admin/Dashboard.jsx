import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import QuestionList from "./QuestionList";
import Navbar from "../Navbar/Navbar";

export default function Dashboard() {
  const location = useLocation();
  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user && user.role === "SUPER_ADMIN";

  const handleQuestionListToggle = () => {
    setIsQuestionListOpen(!isQuestionListOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isQuestionListOpen && e.target.closest(".menu-dropdown") === null) {
        setIsQuestionListOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isQuestionListOpen]);

  return (
    <div>
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-3">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-[#5A727C] bg-accent-color text-white">
            <li className="py-2">
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard" ? "bg-[#b4b8bd4b]" : ""
                }`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <hr />
            <li className="py-2">
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard/user-list"
                    ? "bg-[#b4b8bd4b]"
                    : ""
                }`}
                to="/dashboard/user-list"
              >
                Manage User
              </Link>
            </li>
            <hr />
            {isAdmin && (
              <li className="py-2">
                <Link
                  className={`text-xl font-semibold py-3 ${
                    location.pathname === "/dashboard/manage-admin"
                      ? "bg-[#b4b8bd4b]"
                      : ""
                  }`}
                  to="/dashboard/manage-admin"
                >
                  Manage Admin
                </Link>
              </li>
            )}

            <hr />
            <li className="py-2">
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard/question-view"
                    ? "bg-[#b4b8bd4b]"
                    : ""
                }`}
                to="/dashboard/question-view"
              >
                Question View
              </Link>
            </li>
            <hr />
            <li className="py-2">
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard/create-module"
                    ? "bg-[#b4b8bd4b]"
                    : ""
                }`}
                to="/dashboard/create-module"
              >
                Create Module
              </Link>
            </li>
            <hr />
            <li className="py-2">
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard/set-module-materials"
                    ? "bg-[#b4b8bd4b]"
                    : ""
                }`}
                to="/dashboard/set-module-materials"
              >
                Set Module Materials
              </Link>
            </li>
            <hr />
            <li className="py-2">
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard/control-category"
                    ? "bg-[#b4b8bd4b]"
                    : ""
                }`}
                to="/dashboard/control-category"
              >
                Control Category
              </Link>
            </li>
            <hr />
            <li className="py-2">
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard/module-request"
                    ? "bg-[#b4b8bd4b]"
                    : ""
                }`}
                to="/dashboard/module-request"
              >
                Module Request
              </Link>
            </li>
            <hr />
            <li className="py-2">
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard/user-performance"
                    ? "bg-[#b4b8bd4b]"
                    : ""
                }`}
                to="/dashboard/user-performance"
              >
                Student Performance
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
