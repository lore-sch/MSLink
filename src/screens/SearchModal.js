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

//button styling and set up
const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              fetchSearchResults(searchTerm)
              closeSearchModal()
              setSearchTerm('')
            }}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              closeSearchModal()
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
    padding: 18,
    margin: 15,
    lineHeight: 0,
  },
  button: {
    marginLeft: 10,
    backgroundColor: 'deepskyblue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default SearchModal
