import React, { createContext, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tabs from './src/components/Tabs'
import HomePage from './src/screens/HomePage'
import SignUp from './src/screens/SignUp'
import LogIn from './src/screens/LogIn'
import { AuthContext } from './src/components/AuthContext'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomePage} />
      <Stack.Screen name="loginModal" component={LogIn} />
      <Stack.Screen name="signupModal" component={SignUp} />
    </Stack.Navigator>
  )
}

const AuthenticatedStack = () => {
  return <Tabs />
}
const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        {authenticated ? <AuthenticatedStack /> : <AuthStack />}
      </AuthContext.Provider>
    </NavigationContainer>
  )
}

export default App
