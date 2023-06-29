//Login in modal accessible from home page
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
} from "react-native";

//button styling and set up
const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

//modal to handle entered email address and password
//TO DO: Login authentication
//TO DO: Post

const LogIn = ({ showModal, setShowModal }) => {
  const [enteredEmailAddress, setEnteredEmailAddress] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const emailHandler = (enteredEmailAddress) => {
    setEnteredEmailAddress(enteredEmailAddress);
  };

  const passwordHandler = (enteredPassword) => {
    setEnteredPassword(enteredPassword);
  };

  const logInHandler = () => {
    console.log(enteredEmailAddress);
    console.log(enteredPassword);
  };
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
            <SquareButton title="Log in" onPress={logInHandler} />
            <SquareButton title="Cancel" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 250,
  },
  inputPrompt: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    width: "80%",
    padding: 8,
    margin: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
export default LogIn;
