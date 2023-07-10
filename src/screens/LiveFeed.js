//Live feed accessed via bottom navigation tabs

import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'

const LiveFeed = () => {
  const [enteredPost, setEnteredPost] = useState('')

  const postHandler = (enteredPost) => {
    setEnteredPost(enteredPost)
  }

  const postButtonHandler = async () => {
    let apiUrl = 'http://localhost:3000/LiveFeed' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/LiveFeed' // Override API URL for Android
    }

    try {
      const response = await axios.post(apiUrl, {
        userPost: enteredPost,
      })
      // Resets post field to empty
      setEnteredPost('')
    } catch (error) {
      console.error('Error posting:', error)
    }
  }
//TO DO: Set up functionality for images and polls or status
//Refactor of code for post bar to be in separate component
  return (
    <View style={styles.container}>
      <View style={styles.statusInputContainer}>
        <TextInput
          style={styles.statusInput}
          placeholder="Share with us..."
          multiline={true}
          onChangeText={postHandler}
          value={enteredPost}
        />
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Status</Text>
        <Ionicons name="chatbox-outline" size={20} color="deepskyblue" />
        <Text style={styles.optionText}>Photo</Text>
        <FontAwesome name="photo" size={20} color="deepskyblue" />
        <Text style={styles.optionText}>Poll</Text>
        <AntDesign name="barschart" size={20} color="deepskyblue" />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={postButtonHandler}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusInputContainer: {
    marginTop: 30,
    width: 350,
    borderBottomWidth: 0.5,
    borderColor: '#afbebf',
  },
  statusInput: {
    marginBottom: 15,
    lineHeight: 24,
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 10,
    marginTop: 5,
  },
  optionText: {
    paddingHorizontal: 20,
    color: 'deepskyblue',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'deepskyblue',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})

export default LiveFeed
