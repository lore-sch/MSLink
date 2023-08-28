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
  React,
} from 'react-native'
import { AuthContext, AuthProvider } from '../components/AuthContext'
import * as SecureStore from 'expo-secure-store'
import ForgotPassword from './ForgotPassword'
import * as Device from 'expo-device'
import ApiUtility from '../components/ApiUtility'

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
  const [invalidPassword, setInvalidPassword] = useState(false)

  const emailHandler = (enteredEmailAddress) => {
    setEnteredEmailAddress(enteredEmailAddress)
  }

  const passwordHandler = (enteredPassword) => {
    setEnteredPassword(enteredPassword)
  }

  const openForgotPasswordModal = () => {
    setForgotPasswordModalVisible(true)
  }

  //uses Api utility for different devices
  const apiUrl = ApiUtility()

  const logInHandler = async () => {
    try {
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
        setInvalidPassword(true)
      }
    } catch (error) {
      console.error('Error logging in', error)
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
          {invalidPassword && (
            <Text style={styles.errorMessage}>
              Invalid email address or password. Please try again.
            </Text>
          )}
          {successMessage ? (
            <Text style={styles.successMessage}>
              Password reset request sent. A member of the team will contact you
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
    fontSize: 18,
    marginBottom: -20,
    color: 'navy',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    width: '90%',
    padding: 8,
    margin: 35,
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
  errorMessage: {
    color: 'red',
    fontSize: 18,
  },
})
export default LogIn
