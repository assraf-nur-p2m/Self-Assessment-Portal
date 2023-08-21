import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();

  return (
    <div>
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
                Set Question
              </Link>
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
          </ul>
        </div>
      </div>
    </div>
  );
}
