import React from 'react'
import { Modal, StyleSheet, View, TouchableOpacity } from 'react-native'
import ProfileEditPage from './ProfileEditPage'
import { Feather } from '@expo/vector-icons'
const ProfileEditModal = ({ user_profile_id, visible, onClose }) => (
  <Modal visible={visible} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Feather name="x" size={24} color="deepskyblue" />
        </TouchableOpacity>
        <ProfileEditPage
          user_profile_id={user_profile_id}
          onClose={onClose}
          hideEditButton={true}
        />
      </View>
    </View>
  </Modal>
)

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
    width: '90%',
    height: '80%',
  },
})
export default ProfileEditModal
