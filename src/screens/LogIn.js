//Login in modal accessible from home page
import { useState, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Platform,
} from 'react-native'
import { AuthContext } from '../components/AuthContext'

//button styling and set up
const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

//modal to handle entered email address and password
//TO DO: Login authentication
//TO DO: Post

const LogIn = ({ showModal, setShowModal }) => {
  const [enteredEmailAddress, setEnteredEmailAddress] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const { authenticated, setAuthenticated } = useContext(AuthContext)

  const emailHandler = (enteredEmailAddress) => {
    setEnteredEmailAddress(enteredEmailAddress)
  }

  const passwordHandler = (enteredPassword) => {
    setEnteredPassword(enteredPassword)
  }

  const logInHandler = async () => {
    try {
      // Determine the API URL based on the platform (Android or iOS)
      let apiUrl = 'http://localhost:3000' // Default API URL for iOS
      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000' // Override API URL for Android
      }
      // api call for login
      const response = await fetch(`${apiUrl}/LogIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: enteredEmailAddress,
          userPassword: enteredPassword,
        }),
      })

      const data = await response.json()

      // Check if the login was successful
      if (response.ok) {
        console.log('Login successful')
        setAuthenticated(true) // Set the authenticated state to true in AuthContext
        setShowModal(false) // Close the login modal
      } else {
        console.log('Login failed')
        //set up error message for user
      }
    } catch (error) {
      console.error('Error logging in', error)
      // display error message
    }
  }
  return (
    <Modal visible={showModal} animationType='slide'>
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <Text style={styles.inputPrompt}> Email address: </Text>
          <TextInput
            style={styles.textInput}
            placeholder='example@example.co.uk'
            onChangeText={emailHandler}
          />
          <Text style={styles.inputPrompt}> Password:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={passwordHandler}
            secureTextEntry={true}
          />
          <View style={styles.buttonContainer}>
            <SquareButton title='Log in' onPress={logInHandler} />
            <SquareButton title='Cancel' onPress={() => setShowModal(false)} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 250,
  },
  inputPrompt: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    width: '80%',
    padding: 8,
    margin: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'deepskyblue',
    margin: 15,
    width: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
})
export default LogIn
