//post comments on user posts and status

import React, { useState, useEffect, useCallback, useContext } from 'react'
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
import { AuthContext } from '../components/AuthContext'

const PostResponse = ({ post, comments, fetchComments, user_post_id }) => {
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState([])
  const { userId } = useContext(AuthContext)

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

  //to post comments to existing comments on status
  const addComment = async () => {
    try {
      let apiUrl = 'http://localhost:3000/PostResponse' // Default API URL for iOS

      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000/PostResponse' // Override API URL for Android
      }

      const response = await axios.post(apiUrl, {
        user_post_id: post.user_post_id,
        userComment: comment,
        user_id: userId,
      })

      setComment('')
      fetchComments(user_post_id)
      setCommentList([...commentList, response.data]) // Fetch updated comments after posting a new comment
    } catch (error) {
      console.error('Error posting:', error)
    }
  }

  const renderComment = ({ item }) => {
    if (!item || !item.post_comment_id) {
      return null // skips rendering if the comment/ the post_comment_id undefined (avoids axios error)
    }
    return (
      <View style={styles.commentsContainer}>
        <Text style={styles.profileNameText}>{item.user_profile_name}</Text>
        <Text style={styles.commentText}>{item.post_comment}</Text>
      </View>
    )
  }

  useEffect(() => {
    fetchPostComments() // Fetch comments when the component mounts
  }, [fetchPostComments])

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.postUserName}>{post.user_profile_name}</Text>
        <Text style={styles.postText}>{post.user_post}</Text>
      </View>

      <View style={styles.commentsContainer}>
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.post_comment_id.toString()}
        />
      </View>

      {/* Add comment input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Write comment...'
          onChangeText={setComment}
          value={comment}
          style={styles.textInput}
          multiline={true}
        />
        <TouchableOpacity style={styles.button} onPress={addComment}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  postContainer: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    width: 350,
    borderBottomWidth: 0.5,
    borderColor: '#aebdbf',
  },
  commentsContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#aebdbf',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  postUserName: {
    fontSize: 16,
    color: 'deepskyblue',
  },
  postText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginLeft: 10,
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
  profileNameText: {
    fontSize: 16,
    color: 'deepskyblue',
    marginLeft: 20,
    marginRight: 20,
  },
})

export default PostResponse
