//Wraps code in App.js to be able to authenticate user
import React, { createContext, useState } from 'react'

// Create an authentication context for the app
export const AuthContext = createContext()
// Create an authentication provider component to manage authentication state
export const AuthProvider = ({ children }) => {
  // State variables to manage authentication status and user ID
  const [authenticated, setAuthenticated] = useState(false)
  const [userId, setUserId] = useState(null) // Initialize user_id as null

  //Logout function to reset authetication status
  const logout = () => {
    setAuthenticated(false)
    setUserId(null)
  }
  // Provide authentication status, user_id, setAuthenticated &
  // logout function to children components
  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, userId, setUserId, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
