import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native'
import axios from 'axios'

const SquareSaveButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

const ProfileSetupPage = () => {
  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredStory, setEnteredStory] = useState('')

  const usernameHandler = (enteredUsername) => {
    setEnteredUsername(enteredUsername)
  }

  const storyHandler = (enteredStory) => {
    setEnteredStory(enteredStory)
  }

  const saveProfileHandler = async () => {
    let apiUrl = 'http://localhost:3000/ProfileSetupPage' // Default API URL for iOS
    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/ProfileSetupPage' // Override API URL for Android
    }
    try {
      const response = await axios.post(apiUrl, {
        userName: enteredUsername,
        userStory: enteredStory,
      })
      setEnteredUsername('')
      setEnteredStory('')
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textPrompt}>Create your profile:</Text>
      <View style={styles.profilePictureContainer}>
        <View style={styles.profilePicture} />
      </View>
      <TextInput
        style={styles.inputContainer}
        placeholder='Enter username'
        value={enteredUsername}
        onChangeText={usernameHandler}
      />
      <ScrollView style={styles.storyContainer}>
        <TextInput
          style={styles.storyInput}
          multiline={true}
          placeholder='A space to share your story and MS journey. Need some inspiration? View our guide: Sharing your journey'
          value={enteredStory}
          onChangeText={storyHandler}
        />
      </ScrollView>
      <SquareSaveButton title='Save' onPress={saveProfileHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPrompt: {
    marginTop: 100,
    color: 'black',
    fontSize: 17,
  },
  profilePictureContainer: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'deepskyblue',
  },
  inputContainer: {
    width: 300,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  storyContainer: {
    width: 370,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginBottom: 20,
  },
  storyInput: {
    flex: 1,
    padding: 10,
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

export default ProfileSetupPage
