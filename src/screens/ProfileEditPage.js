//User profile page
import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Modal,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import Story from './Story'
import axios from 'axios'
import { AuthContext } from '../components/AuthContext'
import * as ImagePicker from 'expo-image-picker'

//event handlers for editing user name
//TO DO: Set up image selection and user change image ?? image picker
const ProfileEditPage = () => {
  const { userId } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState('')
  const [userStory, setUserStory] = useState('')
  const [isCameraModalVisible, setCameraModalVisible] = useState(false)
  const [image, setImage] = useState(null)
  console.log('Initial image value:', image)

  useEffect(() => {
    const fetchUserProfile = async () => {
      let apiUrl = 'http://localhost:3000/ProfileEditPage' // Default API URL for iOS
      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000/ProfileEditPage' // Override API URL for Android
      }

      try {
        console.log('Fetching user profile...')
        const response = await axios.get(apiUrl, {
          params: {
            user_id: userId,
          },
        })

        const userProfile = response.data
        console.log('User profile data:', userProfile)

        setUsername(userProfile.user_profile_name)
        setUserStory(userProfile.user_story)

        // Check if the user has a profile image
        if (userProfile.image_path) {
          console.log('User has a profile image:', userProfile.image_path)
          const cacheBustingValue = Date.now() // or any random number
          let absoluteImagePath = `http://localhost:3000/${userProfile.image_path}?v=${cacheBustingValue}`
          if (Platform.OS === 'android') {
            absoluteImagePath = `http://10.0.2.2:3000/${userProfile.image_path}?v=${cacheBustingValue}` // Override API URL for Android
          }
          setImage(absoluteImagePath) // Set the absolute image path in the image state to display the profile picture
        } else {
          console.log('User does not have a profile image.')
        }
      } catch (error) {
        console.error('Error getting profile', error)
      }
    }

    fetchUserProfile()
  }, [userId])

  const handleEditProfile = () => {
    setIsEditing(true)
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

  const toggleCameraModal = () => {
    setCameraModalVisible(!isCameraModalVisible)
  }

  const takePhotoFromCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled) {
        console.log('Camera Image URI:', result.uri)
        // Handle the selected image here
      }
    } catch (error) {
      console.log('Error picking image:', error)
    }
  }

  useEffect(() => {
    console.log('Image state updated:', image)
  }, [image])

  const choosePhotoFromLibrary = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log('Library image object:', JSON.stringify(_image))
    if (!_image.cancelled) {
      const selectedAsset = _image.assets[0] // Access the selected asset from the "assets" array
      console.log('Library Image URI:', selectedAsset.uri)

      // Check if the selected image is different from the current image state
      if (selectedAsset.uri !== image) {
        setImage(selectedAsset.uri)
        handleSaveProfile(selectedAsset.uri, selectedAsset.fileName)
      }
    }
  }

  // const uploadImage = async (imageUri) => {
  //   try {
  //     let apiUrl = 'http://localhost:3000/UploadImage' // Replace 'UploadImage' with the correct API endpoint for uploading images on your server

  //     if (Platform.OS === 'android') {
  //       apiUrl = 'http://10.0.2.2:3000/UploadImage' // Override API URL for Android
  //     }
  //     const formData = new FormData()
  //     formData.append('image', {
  //       uri: imageUri,
  //       name: `profile_${Date.now()}.jpg`,
  //       type: 'image/jpeg',
  //     })

  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       body: formData,
  //     })

  //     const data = await response.json()
  //     return data.image_url // Return the publicly accessible image URL received from the server
  //   } catch (error) {
  //     console.error('Error uploading image:', error)
  //     return null
  //   }
  // }

  const handleSaveProfile = async () => {
    try {
      let apiUrl = 'http://localhost:3000/ProfileEditPage' // Default API URL for iOS

      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000/ProfileEditPage' // Override API URL for Android
      }

      const formData = new FormData()

      if (image) {
        // Image picker to select an image
        formData.append('image', {
          uri: image,
          name: `profile_${Date.now()}.jpg`,
          type: 'image/jpeg',
        })
      }
      console.log('uri of profile pic', image)

      // Add profile data to the form data
      formData.append('userName', username)
      formData.append('userStory', userStory)
      formData.append('user_id', userId)

      // Make the API call to save the profile data along with the image (if available)
      const profileResponse = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Profile updated:', profileResponse.data)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  //conditional rendering- checks if text or textInput
  //conditional rendering- event handlers to display save tick or cancel x, exit edit mode, edit username or story
  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profilePicture} />
        ) : (
          <Image
            source={require('../../assets/avatar.jpeg')} // You can keep a default avatar image
            style={styles.profilePicture}
            onError={(error) =>
              console.log('Image error:', error.nativeEvent.error)
            }
            onLoad={() => console.log('Image loaded successfully')}
          />
        )}
      </View>
      {isEditing && (
        <TouchableOpacity style={styles.cameraIcon} onPress={toggleCameraModal}>
          <Feather name="camera" size={18} color="white" />
        </TouchableOpacity>
      )}
      {isEditing ? (
        <TextInput
          style={styles.editUsername}
          placeholder="User name"
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCameraModalVisible}
        onRequestClose={() => setCameraModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                takePhotoFromCamera()
                setCameraModalVisible(false)
              }}
            >
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                choosePhotoFromLibrary()
                setCameraModalVisible(false)
              }}
            >
              <Text style={styles.modalOptionText}>
                Choose from Camera Roll
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOptionCancel}
              onPress={() => setCameraModalVisible(false)}
            >
              <Text style={styles.modalOptionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    top: 20,
    right: 20,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 400,
    right: 110,
    backgroundColor: 'deepskyblue',
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionCancel: {
    paddingVertical: 15,
    marginTop: 10,
  },
  modalOptionText: {
    fontSize: 20,
    color: 'deepskyblue',
    textAlign: 'center',
  },
})

export default ProfileEditPage
