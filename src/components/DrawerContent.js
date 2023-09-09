//drawer on left side of app to access logout, about us and report function
import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthContext } from './AuthContext'

const Stack = createStackNavigator()

//handles log out route
const DrawerContent = ({ navigation }) => {
 

  const { logout } = useContext(AuthContext)
  const handleLogout = () => {
    logout()
    navigation.navigate('home')
  }

  //handles about us
  const handleAboutUs = () => {
    navigation.navigate('AboutUs')
  }

  //handles report functionm
  const handleReport = () => {
    navigation.navigate('Report')
  }

  return (
    <View style={styles.container}>
      <View style={styles.drawerContainer}>
        <TouchableOpacity onPress={handleAboutUs}>
          <Text style={styles.drawerText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReport}>
          <Text style={styles.drawerText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.drawerText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
  },
  drawerContainer: {
    marginTop: 70,
    marginLeft: 20,
  },
  drawerText: {
    fontSize: 18,
    color: 'white',
    paddingTop: 30,
  },
})

export default DrawerContent
