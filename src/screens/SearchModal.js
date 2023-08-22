import React from 'react'
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native'
import { useState } from 'react'

const SearchModal = ({
  openSearchModal,
  closeSearchModal,
  searchModalVisible,
  placeholderText,
  fetchSearchResults,
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Modal
      visible={searchModalVisible}
      onRequestClose={closeSearchModal}
      animationType="slide"
    >
      <View style={styles.searchModalContainer}>
        <TextInput
          style={styles.searchTextInput}
          placeholder={placeholderText}
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            fetchSearchResults(searchTerm)
            closeSearchModal()
            setSearchTerm('')
          }}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  searchModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    width: '80%',
    padding: 8,
    margin: 15,
  },
})
export default SearchModal
