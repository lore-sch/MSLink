import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  Button,
  TouchableOpacity,
} from 'react-native'
import { validateEmail } from 'react-native-field-validator'

const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

const ForgotPassword = ({
  showPasswordModal,
  setShowPasswordModal,
  setSuccessMessage,
}) => {
  const [enteredEmailAddress, setEnteredEmailAddress] = useState('')

  const emailHandler = (enteredEmailAddress) => {
    setEnteredEmailAddress(enteredEmailAddress)
    setSuccessMessage(true)
  }

  const handleResetPassword = () => {
    if (!validateEmail(enteredEmailAddress)) {
      Alert.alert('Invalid email address. Please try again.')
      return
    }
    setShowPasswordModal(false)
  }

  return (
    <Modal visible={showPasswordModal} animationType="slide">
      <View style={styles.inputContainer}>
        <Text style={styles.inputPrompt}>Please enter your email address:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="example@example.co.uk"
          onChangeText={emailHandler}
        />
        <View style={styles.buttonContainer}>
          <SquareButton
            title="Send"
            onPress={handleResetPassword}
          />
          <SquareButton
            title="Cancel"
            onPress={() => setShowPasswordModal(false)}
          />
        </View>
      </View>
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
    color: 'navy',
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

export default ForgotPassword
