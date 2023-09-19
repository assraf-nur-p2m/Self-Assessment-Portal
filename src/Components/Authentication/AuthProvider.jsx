import React from 'react'
import { createContext } from 'react'

const AuthContext = createContext(null);

export default function AuthProvider() {

    const user = {userMail: "nur@nur.com"}

  return (
    <AuthContext.Provider value={user}>

    </AuthContext.Provider>
  )
}
