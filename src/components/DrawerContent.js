import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AuthContext, AuthProvider } from './AuthContext'

const DrawerContent = ({ navigation }) => {
  const { logout } = useContext(AuthContext)
  const handleLogout = () => {
    logout()
    navigation.navigate('home')
  }

  const handleAboutUs = () => {
    // Implement your "About Us" logic here
    // For example, navigate to an "About Us" screen
    navigation.navigate('AboutUs')
  }

  const handleReport = () => {
    // Implement your "Report" logic here
    // For example, navigate to a "Report" screen
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
