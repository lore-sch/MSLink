import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Tabs from './src/components/Tabs'
import HomePage from './src/screens/HomePage'
import SignUp from './src/screens/SignUp'
import LogIn from './src/screens/LogIn'
import { AuthContext, AuthProvider } from './src/components/AuthContext'
import DrawerContent from './src/components/DrawerContent'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const AuthStack = () => (

  <Stack.Navigator>
    <Stack.Screen name="home" component={HomePage} />
    <Stack.Screen name="loginModal" component={LogIn} />
    <Stack.Screen name="signupModal" component={SignUp} />
  </Stack.Navigator>
)

const App = () => {
  const { authenticated, userId } = useContext(AuthContext)

  return (
    <NavigationContainer>
      {authenticated ? (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen
            name="home"
            component={Tabs}
            initialParams={{ userId }}
          />
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
)
