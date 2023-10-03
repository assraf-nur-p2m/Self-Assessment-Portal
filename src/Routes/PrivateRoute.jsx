import React, { useContext } from "react";
import { AuthContext } from "../Components/Authentication/AuthProvider";
import { useLocation, Navigate } from "react-router-dom";
import Loading from "../Components/Loading/Loading";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && (user.role === "ADMIN" || user.role === "SUPER_ADMIN")) {
    return children;
  }

  return <Navigate to="/login" state={{ form: location }} replace />;
}
