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
  React,
} from 'react-native'
import axios from 'axios'
import { validateEmail, validatePassword } from 'react-native-field-validator'
import ApiUtility from '../components/ApiUtility'

//button styling and set up
const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

//modal to handle entered email address, password
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

  const apiUrl = ApiUtility()

  const emailExistsHandler = async () => {
    try {
      const response = await axios.get(`${apiUrl}/SignUp`, {
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
      setInvalidEmail(true)
      return
    }

    if (!validatePassword(enteredPassword)) {
      setInvalidPassword(true)
      return
    }
    try {
      const response = await axios.post(`${apiUrl}/SignUp`, {
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
              An account with this email address already exists. Try logging in
              or enter a new email address.
            </Text>
          )}
          {invalidPassword && (
            <Text style={styles.errorMessage}>
              Password must contain at least 8 characters, one uppercase letter,
              one lowercase letter, and one digit.
            </Text>
          )}
          {invalidEmail && (
            <Text style={styles.errorMessage}>
              Invalid email address. Please try again.
            </Text>
          )}
          <View style={styles.buttonContainer}>
          <SquareButton title="Cancel" onPress={() => setShowModal(false)} />
            <SquareButton title="Sign Up" onPress={emailExistsHandler} />
            
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
