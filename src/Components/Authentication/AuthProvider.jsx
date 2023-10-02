import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logIn = async (email, password) => {
    try {
      const response = await fetch("http://192.168.1.3:8081/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(user));
        setLoading(false);

        // return user
        return { user };
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
  };

  const authInfo = {
    user,
    loading,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
