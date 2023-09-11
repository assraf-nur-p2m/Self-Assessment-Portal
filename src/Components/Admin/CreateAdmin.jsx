import React from "react";
import { GrUserAdmin } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function CreateAdmin() {
  return (
    <div className="p-2 shadow-lg rounded-xl border">
      <div className="flex justify-between">
        <h1 className="text-center text-4xl font-semibold mb-0 ps-1">
          Create Admin
        </h1>
        <Link
          className="bg-success flex items-center justify-between gap-3 text-lg px-3 py-1 rounded-lg font-bold"
          to="/dashboard/manage-admin"
        >
          <GrUserAdmin />Admin List
        </Link>
      </div>
    </div>
  );
}
