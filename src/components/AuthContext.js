//Wraps code in App.js to be able to authenticate user
import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [userId, setUserId] = useState(null) // Initialize user_id as null

  //logout function when user not authenticated
  const logout = () => {
    setAuthenticated(false)
    setUserId(null)
  }
//returns authenticated status and user id 
  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, userId, setUserId, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
