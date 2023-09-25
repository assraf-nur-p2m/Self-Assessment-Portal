import React, { createContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children}) {
  const user = {
    displayName: "Nur",
    age: 23
  }

  return <AuthContext.Provider value={user}>
    {children}
  </AuthContext.Provider>;
}
