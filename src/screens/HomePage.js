//Homepage: Shows login button and signup button, with MSLink name and icon
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  React,
} from 'react-native'
import LogIn from './LogIn'
import SignUp from './SignUp'
import { Feather } from '@expo/vector-icons'

//Button styling and set up
const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

//modals for login, sign up pages, success message for sign up
const HomePage = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false)
  const [signupModalVisible, setSignupModalVisible] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  const openLogIn = () => {
    setLoginModalVisible(true)
  }

  const openSignUp = () => {
    setSignupModalVisible(true)
  }
  //Login and signup modals shown, homepage text
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleText}> MS Link </Text>
        <Feather
          name="link"
          size={50}
          color="deepskyblue"
          style={styles.featherStyle}
        />
        <Text style={styles.titleDescText}>
          A social space for people with Multiple Sclerosis (MS) in Northern
          Ireland to share their story, experiences and talk to others.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <SquareButton title="Log in" onPress={openLogIn} />
        <SquareButton title="Sign up" onPress={openSignUp} />
      </View>
      <LogIn
        showModal={loginModalVisible}
        setShowModal={setLoginModalVisible}
      />
      <SignUp
        showModal={signupModalVisible}
        setShowModal={setSignupModalVisible}
        setSuccessMessage={setSuccessMessage}
      />
      {successMessage && (
        <Text style={styles.successMessage}>
          Successfully signed up! Please log in.
        </Text>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'deepskyblue',
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'navy',
  },

  titleDescText: {
    fontSize: 20,
    color: 'navy',
    lineHeight: 30,
  },
  featherStyle: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
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
  successMessage: {
    fontSize: 18,
    color: 'navy',
    fontWeight: 'bold',
    marginLeft: 35,
  }
})
export default HomePage
