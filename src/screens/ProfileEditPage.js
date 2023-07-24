//User profile page
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import Story from './Story'
import axios from 'axios'

//event handlers for editing user name
//TO DO: Set up image selection and user change image ?? image picker
const ProfileEditPage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState('')
  const [userStory, setUserStory] = useState('')

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = async () => {
    let apiUrl = 'http://localhost:3000/ProfileEditPage' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/ProfileEditPage' // Override API URL for Android
    }
    try {
      const response = await axios.post(apiUrl, {
        userName: username,
        userStory: userStory,
      })

      console.log('Profile updated:', response.data)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  //username should be  called from database
  const handleCancelEdit = () => {
    setIsEditing(false)
    setUsername('')
  }

  //database needs to update
  const handleChangeUsername = (text) => {
    setUsername(text)
  }

  //conditional rendering- checks if text or textInput
  //conditional rendering- event handlers to display save tick or cancel x, exit edit mode, edit username or story
  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={require('../../assets/avatar.jpeg')}
          style={styles.profilePicture}
        />
      </View>
      {isEditing ? (
        <TextInput
          style={styles.editUsername}
          value={username}
          onChangeText={handleChangeUsername}
        />
      ) : (
        <Text style={styles.username}>{username}</Text>
      )}
      <ScrollView
        style={styles.storyContainer}
        contentContainerStyle={styles.storyContent}
      >
        <Story
          isEditing={isEditing}
          userStory={userStory}
          setUserStory={setUserStory}
        />
      </ScrollView>

      {isEditing ? (
        <View style={styles.editButtonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleSaveProfile}
          >
            <Feather name="check" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleCancelEdit}
          >
            <Feather name="x" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.editButtonProfile}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Feather name="edit" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcfbfa',
  },
  profilePictureContainer: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 70,
  },
  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'deepskyblue',
  },
  editUsername: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'deepskyblue',
    marginBottom: 10,
  },
  storyContainer: {
    width: 370,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
  },
  storyContent: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  editButtonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    marginLeft: 10,
    backgroundColor: 'deepskyblue',
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonProfile: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    right: 20,
  },
})

export default ProfileEditPage
