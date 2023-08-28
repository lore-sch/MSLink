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
  React,
} from 'react-native'
import { AuthContext, AuthProvider } from '../components/AuthContext'
import * as SecureStore from 'expo-secure-store'
import ForgotPassword from './ForgotPassword'

//retrieves the JWT token from secure store for api reqs
const getAuthToken = async () => {
  try {
    const tokenString = await SecureStore.getItemAsync('jwtToken')
    const refreshTokenString = await SecureStore.getItemAsync('refreshToken')
    const token = JSON.parse(tokenString)
    const refreshToken = JSON.parse(refreshTokenString)
    return { token, refreshToken }
  } catch (error) {
    console.error('Error getting auth token', error)
    return null
  }
}

//button styling and set up
const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

//modal to handle entered email address and password
const LogIn = ({ showModal, setShowModal }) => {
  const [enteredEmailAddress, setEnteredEmailAddress] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false)
  const { authenticated, setAuthenticated, setUserId } = useContext(AuthContext)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  const emailHandler = (enteredEmailAddress) => {
    setEnteredEmailAddress(enteredEmailAddress)
  }

  const passwordHandler = (enteredPassword) => {
    setEnteredPassword(enteredPassword)
  }

  const openForgotPasswordModal = () => {
    setForgotPasswordModalVisible(true)
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

      // Check if the login was successful
      if (response.ok) {
        const data = await response.json()
        const { token, refreshToken, user_id } = data.data

        const serialisedData = JSON.stringify({
          token,
          refreshToken,
          user_id,
        })
        await SecureStore.setItemAsync('userData', serialisedData)

        setAuthenticated(true) // Set the authenticated state to true in AuthContext
        setUserId(user_id)
        setShowModal(false) // Close the login modal
      } else {
        console.log('Login failed', response.status)
        // TO DO: DISPLAY MESSAGE ON SCREEN
      }
    } catch (error) {
      console.error('Error logging in', error)
      // display error message
    }
  }

  return (
    <Modal visible={showModal} animationType="slide">
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <Text style={styles.inputPrompt}> Email address: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="example@example.co.uk"
            onChangeText={emailHandler}
          />
          <Text style={styles.inputPrompt}> Password:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={passwordHandler}
            secureTextEntry={true}
          />
          <View style={styles.buttonContainer}>
            <SquareButton title="Log in" onPress={() => logInHandler()} />
            <SquareButton title="Cancel" onPress={() => setShowModal(false)} />
          </View>
          {successMessage ? (
            <Text style={styles.successMessage}>
              Password reset request sent. 
              A member of the team will contact you
              by email with a password reset link.
            </Text>
          ) : (
            <TouchableOpacity onPress={openForgotPasswordModal}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          )}
          <ForgotPassword
            showPasswordModal={forgotPasswordModalVisible}
            setShowPasswordModal={setForgotPasswordModalVisible}
            setSuccessMessage={setSuccessMessage}
          />
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
    margin: 35,
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
  forgotPassword: {
    fontSize: 18,
    color: 'navy',
    marginTop: 30,
  },
  successMessage: {
    fontSize: 18,
    color: 'navy',
    fontWeight: 'bold',
    marginLeft: 35,
    lineHeight: 30,
  },
})
export default LogIn
