//Displays bottom tab bar in app when user is authenticated
/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import ProfileEditPage from '../screens/ProfileEditPage'
import LiveFeed from '../screens/LiveFeed'
import Discussion from '../screens/Discussion'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

//Initialise bottom tab navigator
const Tab = createBottomTabNavigator()
//Define Tabs component
const Tabs = ({ navigation }) => {
  //Configure profile, discussion and live feed tabs- colour changes when tab active
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#17b4ac',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: { fontSize: 13 },
      }}
    >
      {/* Profile tab */}
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user-circle"
              size={25}
              color={focused ? '#17b4ac' : 'black'}
            />
          ),
        }}
      >
        {/* Render ProfileEditPage.js when tab active */}
        {() => <ProfileEditPage navigation={navigation} />}
      </Tab.Screen>

      {/* Discussion tab */}
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
      {/* Live feed tab */}
      <Tab.Screen
        name={'Live Feed'}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name={'text-document'}
              size={25}
              color={focused ? '#17b4ac' : 'black'}
            />
          ),
        }}
      >
        {() => <LiveFeed navigation={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}
export default Tabs
