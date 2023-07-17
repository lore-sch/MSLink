//post comments on user posts and status

import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native'
import axios from 'axios'

const PostResponse = ({ post, comments, fetchComments }) => {
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState([])

  const fetchPostComments = useCallback(async () => {
    try {
      let apiUrl = 'http://localhost:3000/PostResponse' // Default API URL for iOS

      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000/PostResponse' // Override API URL for Android
      }

      const response = await axios.get(apiUrl, {
        params: {
          user_post_id: post.user_post_id,
        },
      })
      setCommentList(response.data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }, [post])

  const addComment = async () => {
    try {
      let apiUrl = 'http://localhost:3000/PostResponse' // Default API URL for iOS

      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000/PostResponse' // Override API URL for Android
      }

      const response = await axios.post(apiUrl, {
        userComment: comment,
      })

      setComment('')
      fetchComments() // Fetch updated comments after posting a new comment
    } catch (error) {
      console.error('Error posting:', error)
    }
  }

  const renderComment = ({ item }) => (
    <View>
      <Text style={styles.commentText}>{item.post_comment}</Text>
    </View>
  )

  useEffect(() => {
    fetchPostComments() // Fetch comments when the component mounts
  }, [fetchPostComments])

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.postUserName}>{post.user_profile_name}</Text>
        <Text style={styles.postText}>{post.user_post}</Text>
      </View>
      {/* Render the comments */}
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.post_comment_id.toString()}
      />

      {/* Add comment input */}
      <TextInput
        placeholder="Write comment..."
        onChangeText={setComment}
        value={comment}
        style={styles.textInput}
        multiline={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={addComment}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContainer: {
    marginTop: 70,
    marginLeft: 20,
    marginRight: 20,
    width: 350,
  },
  textInput: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    width: 350,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#aebdbf',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  postUserName: {
    fontSize: 16,
    color: 'deepskyblue',
  },
  postText: {
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    marginLeft: 275,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'deepskyblue',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  commentText: {
    fontSize: 16,
  },
})

export default PostResponse
