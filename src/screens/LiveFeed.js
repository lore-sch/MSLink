import React, { useState, useEffect } from 'react'
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
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    let apiUrl = 'http://localhost:3000/LiveFeed' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/LiveFeed' // Override API URL for Android
    }

    try {
      const response = await axios.get(apiUrl)
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  // useEffect hook to fetch data within function component
  useEffect(() => {
    fetchPosts()
  }, [])

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
      fetchPosts()
    } catch (error) {
      console.error('Error posting:', error)
    }
  }

  const renderPostItem = ({ item }) => (
    <View style={styles.postItemContainer}>
      <Text style={styles.userName}>{item.user_profile_name}</Text>
      <Text style={styles.postText}>{item.user_post}</Text>
      <Text style={styles.postComment}> View comments </Text>
      {/* Render other post information */}
    </View>
  )

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
      <FlatList
        style={styles.list}
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.user_post_id.toString()}
      />
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
  postItemContainer: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    width: 350,
    borderBottomWidth: 0.5,
    borderColor: '#afbebf',
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  userName: {
    fontSize: 14,
    color: 'deepskyblue',
    paddingBottom: 5,
  },
  postComment: {
   fontSize: 12,
   color: 'deepskyblue',
   marginBottom: 10,
  }
})

export default LiveFeed
