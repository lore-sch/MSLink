import React from 'react'
import { useState } from 'react'
import { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Tabs from './src/components/Tabs'
import HomePage from './src/screens/HomePage'
import SignUp from './src/screens/SignUp'
import LogIn from './src/screens/LogIn'
import { AuthContext, AuthProvider } from './src/components/AuthContext'
import DrawerContent from './src/components/DrawerContent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Onboarding from './src/screens/Onboarding'
import Report from './src/screens/Report'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()


const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='home'
      component={HomePage}
      options={{ headerTitle: '' }}
    />
    <Stack.Screen name='loginModal' component={LogIn} />
    <Stack.Screen name='signupModal' component={SignUp} />
  </Stack.Navigator>
)

const App = () => {
  const { authenticated, userId } = useContext(AuthContext)
  const [onboardingCompleted, setOnboardingCompleted] = useState(false)

  useEffect(() => {
    async function checkOnboardingStatus() {
      const completed = await AsyncStorage.getItem('onboardingCompleted')
      if (completed === 'true') {
        setOnboardingCompleted(true) //change to true/false for editing purpsoes tp view
      }
    }
    checkOnboardingStatus()
  }, [])

  useEffect(() => {
    if (onboardingCompleted) {
      AsyncStorage.setItem('onboardingCompleted', 'true') //change to true/false for editing
    }
  }, [onboardingCompleted]) // Run whenever onboardingCompleted changes

  return (
    <NavigationContainer>
      {authenticated ? (
        onboardingCompleted ? (
          // ... render DrawerNavigator for authenticated user ...
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen
              name='home'
              component={Tabs}
              initialParams={{ userId }}
              options={{ headerTitle: '' }}
            />
            <Drawer.Screen name='Report' component={Report} />
          </Drawer.Navigator>
        ) : (
          <Onboarding onComplete={() => setOnboardingCompleted(true)} />
        )
      ) : (
        // ... render AuthStack for unauthenticated user ...
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
