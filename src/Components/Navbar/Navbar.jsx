import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActiveLink = (path) => location.pathname === path;
  const navbarItems = (
    <>
      <ul className="flex font-bold text-lg">
        <li>
          <Link to="/" className={isActiveLink("/") ? "bg-[#80808034]" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className={isActiveLink("/dashboard") ? "bg-[#80808034]" : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className={isActiveLink("/login") ? "bg-[#80808034]" : ""}
          >
            Login
          </Link>
        </li>
      </ul>
    </>
  );

  return (
    <div className="navbar bg-blue-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navbarItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          LAPP
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navbarItems}</ul>
      </div>
    </div>
  );
}
