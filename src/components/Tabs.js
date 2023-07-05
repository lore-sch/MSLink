/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import ProfileEditPage from '../screens/ProfileEditPage'
import LiveFeed from '../screens/LiveFeed'
import Discussion from '../screens/Discussion'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#17b4ac',
        tabBarInactiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name={'Profile'}
        component={ProfileEditPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name={'user-circle'}
              size={25}
              color={focused ? '#17b4ac' : 'black'}
            />
          ),
        }}
      />
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
