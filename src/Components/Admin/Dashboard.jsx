import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import QuestionList from "./QuestionList";
import Navbar from "../Navbar/Navbar";

export default function Dashboard() {
  const location = useLocation();
  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false);

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
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <li>
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard" ? "bg-[#004bad2d]" : ""
                }`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <hr />
            <li>
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard/set-question"
                    ? "bg-[#004bad2d]"
                    : ""
                }`}
                to="/dashboard/set-question"
              >
                Set Question
              </Link>
            </li>
            <hr />
            <li className="relative menu-dropdown">
              <button
                onClick={handleQuestionListToggle}
                className={`text-xl font-semibold py-3 ${
                  location.pathname.startsWith("/dashboard/question-list") ||
                  isQuestionListOpen
                    ? "bg-[#004bad2d]"
                    : ""
                }`}
              >
                Question List
                <span
                  className={`ml-2 ${
                    isQuestionListOpen ? "transform rotate-180" : ""
                  } transition`}
                >
                  ▼
                </span>
              </button>
              {isQuestionListOpen && (
                <ul className="menu-sub p-2 shadow z-[1] bg-base-100 rounded-box w-52 absolute left-0 top-full">
                  <li>
                    <Link
                      className={`text-xl font-semibold py-2 bg-green-300 ${
                        location.pathname.startsWith(
                          "/dashboard/question-list/level-1"
                        )
                          ? "bg-[#004bad2d]"
                          : ""
                      }`}
                      to="/dashboard/question-list/level-1"
                    >
                      Level 1
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`text-xl font-semibold py-2 bg-yellow-300 mt-2 ${
                        location.pathname.startsWith(
                          "/dashboard/question-list/level-2"
                        )
                          ? "bg-[#004bad2d]"
                          : ""
                      }`}
                      to="/dashboard/question-list/level-2"
                    >
                      Level 2
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`text-xl font-semibold py-2 bg-red-400 mt-2 ${
                        location.pathname.startsWith(
                          "/dashboard/question-list/level-3"
                        )
                          ? "bg-[#004bad2d]"
                          : ""
                      }`}
                      to="/dashboard/question-list/level-3"
                    >
                      Level 3
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <hr />
            <li>
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard/user-list"
                    ? "bg-[#004bad2d]"
                    : ""
                }`}
                to="/dashboard/user-list"
              >
                User List
              </Link>
            </li>
            <hr />
            <li>
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard/question-view"
                    ? "bg-[#004bad2d]"
                    : ""
                }`}
                to="/dashboard/question-view"
              >
                Question View
              </Link>
            </li>
            <hr />
            <li>
              <Link
                className={`text-xl font-semibold py-3 ${
                  location.pathname === "/dashboard/create-module"
                    ? "bg-[#004bad2d]"
                    : ""
                }`}
                to="/dashboard/create-module"
              >
                Create Module
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
