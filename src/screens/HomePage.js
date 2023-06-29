import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const HomePage = () => {
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [signupModalVisible, setSignupModalVisible] = useState(false);
  
    const openLogIn = () => {
      setLoginModalVisible(true);
    };
  
    const openSignUp = () => {
      setSignupModalVisible(true);
    };
  return (
    <SafeAreaView>
      <View style={styles.buttonContainer}>
        <SquareButton title="Log in" onPress={openLogIn} />
        <SquareButton title="Sign up" onPress={openSignUp} />
      </View>
      <LogIn showModal={loginModalVisible} setShowModal={setLoginModalVisible} />
      <SignUp showModal={signupModalVisible} setShowModal={setSignupModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 330,
  },
  button: {
    backgroundColor: "deepskyblue",
    margin: 15,
    width: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
export default HomePage;
