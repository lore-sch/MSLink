import React, { useState, useEffect } from 'react'
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { Feather } from '@expo/vector-icons'

const ProfileView = ({ user_profile_id, visible, onClose }) => {
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    const fetchUserProfileByName = async () => {
      try {
        let apiUrl = 'http://localhost:3000/ProfileEditPageByUsername'

        const response = await axios.get(apiUrl, {
          params: {
            user_profile_id: user_profile_id,
          },
        })
        setProfileData(response.data)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    if (user_profile_id) {
      fetchUserProfileByName()
    }
  }, [user_profile_id])

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Feather name='x' size={24} color='black' />
        </TouchableOpacity>
        {profileData && (
          <View style={styles.profileContainer}>
            <Text>{profileData.user_profile_name}</Text>
            <Text>{profileData.user_story}</Text>
            {/* Add more profile details as needed */}
          </View>
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 40,
    zIndex: 1,
  },
})
export default ProfileView
