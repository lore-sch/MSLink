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
  Modal,
  ActivityIndicator,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import Story from './Story'
import axios from 'axios'
import { AuthContext } from '../components/AuthContext'
import * as ImagePicker from 'expo-image-picker'
import ApiUtility from '../components/ApiUtility'
import * as Device from 'expo-device'

//Event handlers for editing user name
const ProfileEditPage = ({ user_profile_id, hideEditButton }) => {
  const { userId } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [userStory, setUserStory] = useState('')
  const [isCameraModalVisible, setCameraModalVisible] = useState(false)
  
  const [image, setImage] = useState(null)

  const apiUrl = ApiUtility()

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        // Wait until userId is available
        return
      }
      try {
        const response = await axios.get(`${apiUrl}/ProfileEditPage`, {
          params: {
            user_id: userId,
          },
        })

        const userProfile = response.data
        setUsername(userProfile.user_profile_name)
        setUserStory(userProfile.user_story)

        if (userProfile.image_path) {
          const cacheBustingValue = Date.now() // or any random number
          let absoluteImagePath = `http://localhost:3000/${userProfile.image_path}?v=${cacheBustingValue}`
          if (Device.OS === 'android') {
            absoluteImagePath = `http://10.0.2.2:3000/${userProfile.image_path}?v=${cacheBustingValue}` // Override API URL for Android
          }
          setImage(absoluteImagePath) // Set the absolute image path in the image state to display the profile picture
          setLoading(false)
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('Error getting profile', error)
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [userId])

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user_profile_id) {
        // Wait until userId is available
        return
      }

      try {
        const response = await axios.get(
          `${apiUrl}/ProfileEditPageByUsername`,
          {
            params: {
              user_profile_id: user_profile_id,
            },
          }
        )
        const userProfile = response.data
        setUsername(userProfile.user_profile_name)
        setUserStory(userProfile.user_story)

        // Check if the user has a profile image
        if (userProfile.image_path) {
          const cacheBustingValue = Date.now() // or any random number
          let absoluteImagePath = `http://localhost:3000/${userProfile.image_path}?v=${cacheBustingValue}`
          if (Device.OS === 'android') {
            absoluteImagePath = `http://10.0.2.2:3000/${userProfile.image_path}?v=${cacheBustingValue}` // Override API URL for Android
          }
          setImage(absoluteImagePath) // Set the absolute image path in the image state to display the profile picture
          setLoading(false)
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('Error getting profile', error)
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [user_profile_id])

  //handle edit profile
  const handleEditProfile = () => {
    setIsEditing(true)
  }

  //cancel edit and maintain username
  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  //updates username when edits made
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
      }
    } catch (error) {
      console.log('Error picking image:', error)
    }
  }

  useEffect(() => {}, [image])

  const choosePhotoFromLibrary = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!_image.canceled) {
      const selectedAsset = _image.assets[0] // Access the selected asset from the "assets" array

      // Check if the selected image is different from the current image state
      if (selectedAsset.uri !== image) {
        setImage(selectedAsset.uri)
        handleSaveProfile(selectedAsset.uri, selectedAsset.fileName)
      }
    }
  }

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData()
      if (image) {
        // Check if an image is available and append it to the form data
        formData.append('image', {
          uri: image,
          name: `profile_${Date.now()}.jpg`,
          type: 'image/jpeg',
        })
      }
      // Add profile data to the form data
      formData.append('userName', username)
      formData.append('userStory', userStory)
      formData.append('user_id', userId)

      // Make API call to save the profile data along with the image (if available)
      await axios.post(`${apiUrl}/ProfileEditPage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      // Set the editing state to false to exit the editing mode
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  //conditional rendering- checks if text or textInput
  //conditional rendering- event handlers to display save tick or cancel x, exit edit mode, edit username or story
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#17b4ac" /> // Render the loading indicator
      ) : (
        // Render the profile picture once the data is fetched and loading is false
        <View style={styles.profilePictureContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profilePicture} />
          ) : (
            <Image
              source={require('../../assets/anon-avatar.jpeg')} // default image
              style={styles.profilePicture}
              onError={(error) =>
                console.log('Image error:', error.nativeEvent.error)
              }
              onLoad={() => console.log('Image loaded successfully')}
            />
          )}
        </View>
      )}
      {isEditing && (
        <TouchableOpacity style={styles.cameraIcon} onPress={toggleCameraModal}>
          <Feather name="camera" size={24} color="white" />
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
        <Text style={styles.username}>{username || 'Anonymous'}</Text>
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
          
          <View style={styles.yesNoButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleCancelEdit}
            >
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.yesNoButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleSaveProfile}
            >
              <Feather name="check" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.editButtonProfile}>
          {!hideEditButton && (
            <View style={styles.editButtonProfile}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEditProfile}
              >
                <Feather name="edit" size={25} color="white" />
              </TouchableOpacity>
            </View>
          )}
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
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: 'deepskyblue',
    borderRadius: 30,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonProfile: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  yesNoButtons: {
    marginHorizontal: 20,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 400,
    right: 100,
    backgroundColor: 'deepskyblue',
    borderRadius: 20,
    width: 40,
    height: 40,
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
