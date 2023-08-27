//Signup modal accessible from home page
import { useState } from 'react'
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
  Alert,
} from 'react-native'
import axios from 'axios'
import { validateEmail, validatePassword } from 'react-native-field-validator'

//button styling and set up
const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

//modal to handle entered email address, password
//TO DO: Verify passwords match- error message displayed, but set min/max length?

const SignUp = ({ showModal, setShowModal, setSuccessMessage }) => {
  const [enteredEmailAddress, setEnteredEmailAddress] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredPasswordConfirmation, setEnteredPasswordConfirmation] =
    useState('')
  const [passwordMatchError, setpasswordMatchError] = useState(false)
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)

  const emailHandler = (enteredEmailAddress) => {
    setEnteredEmailAddress(enteredEmailAddress)
  }

  const passwordHandler = (enteredPassword) => {
    setEnteredPassword(enteredPassword)
  }

  const passwordConfirmationHandler = (enteredPasswordConfirmation) => {
    setEnteredPasswordConfirmation(enteredPasswordConfirmation)
  }

  const emailExistsHandler = async () => {
    let apiUrl = 'http://localhost:3000/SignUp' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/SignUp' // Override API URL for Android
    }

    try {
      const response = await axios.get(apiUrl, {
        params: {
          user_email: enteredEmailAddress,
        },
      })
      // checks response for entered email address
      const emailExists = response.data.length > 0
      setEmailAlreadyExists(emailExists)
      // Only proceed to sign up if the email doesn't exist
      if (!emailExists) {
        signUpHandler()
      }
    } catch (error) {}
  }

  const signUpHandler = async () => {
    if (enteredPassword !== enteredPasswordConfirmation) {
      setpasswordMatchError(true)
      return
    }
    if (!validateEmail(enteredEmailAddress)) {
      Alert.alert('Invalid email address. Please try again.')
      return
    }

    if (!validatePassword(enteredPassword)) {
      setInvalidPassword(true)
      return
    }
    let apiUrl = 'http://localhost:3000/SignUp' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/SignUp' // Override API URL for Android
    }
    try {
      const response = await axios.post(apiUrl, {
        userEmail: enteredEmailAddress,
        userPassword: enteredPasswordConfirmation,
      })
      //resets text input fields to empty
      setEnteredEmailAddress('')
      setEnteredPassword('')
      setShowModal(false)
      setSuccessMessage(true)
    } catch (error) {}
  }

  return (
    <Modal visible={showModal} animationType="slide">
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <Text style={styles.inputPrompt}>Email Address:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="example@example.co.uk"
            onChangeText={emailHandler}
          />
          <Text style={styles.inputPrompt}>Password:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            onChangeText={passwordHandler}
            secureTextEntry={true}
          />
          <Text style={styles.inputPrompt}>Confirm Password:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Re-enter your password"
            onChangeText={passwordConfirmationHandler}
            secureTextEntry={true}
          />
          {passwordMatchError && (
            <Text style={styles.errorMessage}>
              Passwords do not match. Please try again.
            </Text>
          )}
          {emailAlreadyExists && (
            <Text style={styles.errorMessage}>
              Email address already exists. Please try again.
            </Text>
          )}
          {invalidPassword && (
            <Text style={styles.errorMessage}>
              Password must contain at least 8 characters, one uppercase letter,
              one lowercase letter, and one digit.
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <SquareButton title="Sign Up" onPress={emailExistsHandler} />
            <SquareButton title="Cancel" onPress={() => setShowModal(false)} />
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
    marginTop: 100,
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
  errorMessage: {
    color: 'red',
    fontSize: 18,
  },
})

export default SignUp
