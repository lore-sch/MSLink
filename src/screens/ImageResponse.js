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

const ImageResponse = ({
  post: imagePost,
  comments,
  fetchComments,
  user_image_id,
}) => {
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState([])
  const { userId } = useContext(AuthContext)
  console.log('Received Post:', imagePost)
  console.log('Received Comments:', comments)

  const fetchImageComments = useCallback(async () => {
    try {
      let apiUrl = 'http://localhost:3000/ImageResponse' // Default API URL for iOS

      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000/ImageResponse' // Override API URL for Android
      }

      const response = await axios.get(apiUrl, {
        params: {
          user_image_id: user_image_id,
        },
      })
      setCommentList(response.data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }, [user_image_id])

  //to post comments to existing comments on status
  const addComment = async () => {
    try {
      console.log('Adding comment:', {
        user_image_id: user_image_id,
        userComment: comment,
        user_id: userId,
        post_comment_timestamp: new Date().toISOString(),
      })
      let apiUrl = 'http://localhost:3000/ImageResponse' // Default API URL for iOS

      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000/ImageResponse' // Override API URL for Android
      }

      const response = await axios.post(apiUrl, {
        user_image_id: user_image_id,
        userComment: comment,
        user_id: userId,
        post_comment_timestamp: new Date().toISOString(),
      })

      setComment('')
      fetchComments(user_image_id)
      setCommentList([...commentList, response.data]) // Fetch updated comments after posting a new comment
      console.log('Post response:', response.data)
    } catch (error) {
      console.error('Error posting:', error)
    }
  }

  const renderComment = ({ item }) => {
    if (!item || !item.image_comment_id) {
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
    fetchImageComments(user_image_id) // Fetch comments when the component mounts
  }, [fetchImageComments, user_image_id])

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.postUserName}>{imagePost.user_profile_name}</Text>
        <Text style={styles.postText}>{imagePost.user_post}</Text>
      </View>

      <View style={styles.commentsContainer}>
        <FlatList
          data={commentList} // Use commentList instead of comments
          renderItem={renderComment}
          keyExtractor={(item) => item.image_comment_id.toString()}
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

export default ImageResponse
