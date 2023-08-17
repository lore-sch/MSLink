//Displays bottom tab bar in app when user is authenticated
/* eslint-disable react/no-unstable-nested-components */
import React, { useContext } from 'react'
import ProfileEditPage from '../screens/ProfileEditPage'
import LiveFeed from '../screens/LiveFeed'
import Discussion from '../screens/Discussion'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { AuthContext } from './AuthContext'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const { userId } = useContext(AuthContext)
  //returns profile, discussion and live feed tabs- colour changes when tab active
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#17b4ac',
        tabBarInactiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name='Profile'
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name='user-circle'
              size={25}
              color={focused ? '#17b4ac' : 'black'}
            />
          ),
        }}
      >
        {() => <ProfileEditPage />}
      </Tab.Screen>
      <Tab.Screen
        name={'Discussion'}
        component={Discussion}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={'chat-plus-outline'}
              size={25}
              color={focused ? '#17b4ac' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Live Feed'}
        component={LiveFeed}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name={'text-document'}
              size={25}
              color={focused ? '#17b4ac' : 'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
