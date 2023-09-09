//post comments on user posts and status
import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native'
import axios from 'axios'
import { AuthContext } from '../components/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import ApiUtility from '../components/ApiUtility'
import ProfileEditModal from './ProfileEditModal'
import moment from 'moment'

const PostResponse = ({
  post,
  comments,
  fetchComments,
  user_post_id,
  closePost,
}) => {
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState([])
  const { userId } = useContext(AuthContext)
  const [profileModalVisibility, setProfileModalVisibility] = useState({})
  const [invalidInputLength, setInvalidInputLength] = useState(false)
  const MIN_TEXT_LENGTH = 0

  const apiUrl = ApiUtility()

  const fetchPostComments = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/PostResponse`, {
        params: {
          user_post_id: post.user_post_id,
        },
      })
      setCommentList(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }, [post])

  //to post comments to existing comments on status
  const addComment = async () => {
    try {
      if (comment.length > MIN_TEXT_LENGTH) {
        const response = await axios.post(`${apiUrl}/PostResponse`, {
          user_post_id: post.user_post_id,
          userComment: comment,
          user_id: userId,
        })

        setComment('')
        fetchComments(user_post_id)
        setCommentList([...commentList, response.data]) // Fetch updated comments after posting a new comment
      } else {
        setInvalidInputLength(true)
      }
    } catch (error) {
      console.error('Error posting:', error)
    }
  }

  //api call to delete comment
  const deleteComment = (deleteItem) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this comment?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await axios.post(`${apiUrl}/DeletePostComment`, {
                post_comment_id: deleteItem.post_comment_id,
                user_id: userId,
              })
              fetchComments(user_post_id)
              setCommentList(commentList.filter((item) => item !== deleteItem))
            } catch (error) {
              console.error('Error deleting:', error)
            }
          },
        },
      ],
      { cancelable: true }
    )
  }

  const openProfileModal = (user_profile_id) => {
    setProfileModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [user_profile_id]: true,
    }))
  }

  const closeModal = (user_profile_id) => {
    setProfileModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [user_profile_id]: false,
    }))
  }
  const renderComment = ({ item }) => {
    const currentUserComment = item.user_id === userId
    const isProfileModalVisible =
      profileModalVisibility[item.user_profile_id] || false
    if (!item || !item.post_comment_id) {
      return null // skips rendering if the comment/ the post_comment_id undefined (avoids axios error)
    }
    return (
      <View style={styles.commentsContainer}>
        <TouchableOpacity
          onPress={() => openProfileModal(item.user_profile_id)}
        >
          <Text style={styles.profileNameText}>{item.user_profile_name}</Text>
        </TouchableOpacity>
        <View style={styles.commentStyle}>
          <Text style={styles.commentText}>{item.post_comment}</Text>
          <Text style={styles.timeStampCommentStyle}>
            {moment(item.post_comment_timestamp).format('MMMM Do YYYY, h:mm a')}
          </Text>
          {currentUserComment && (
            <TouchableOpacity
              onPress={() => deleteComment(item)}
              style={styles.deleteComment}
            >
              <Feather name="x" size={16} color="deepskyblue" />
              <Text style={styles.deleteCommentText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
        <ProfileEditModal
          user_profile_id={item.user_profile_id}
          visible={isProfileModalVisible}
          onClose={() => closeModal(item.user_profile_id)}
        />
      </View>
    )
  }

  useEffect(() => {
    fetchPostComments() // Fetch comments when the component mounts
  }, [fetchPostComments])

  const navigation = useNavigation()
  const handleReport = () => {
    closePost()
    navigation.navigate('Report')
  }

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.postUserName}>{post.user_profile_name}</Text>
        <Text style={styles.postText}>{post.user_post}</Text>
        <Text style={styles.commentTimeStyling}>
          {moment(post.user_post_timestamp).format('MMMM Do YYYY, h:mm a')}
        </Text>
      </View>

      <View style={styles.commentsContainer}>
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.post_comment_id.toString()}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write comment..."
          onChangeText={setComment}
          value={comment}
          style={styles.textInput}
          multiline={true}
        />

        <TouchableOpacity style={styles.button} onPress={addComment}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
      {invalidInputLength && (
        <Text style={styles.errorMessage}>
          Input must contain at least one character.
        </Text>
      )}
      <Text style={styles.reportPromptText}>
        Worried about something you see?
      </Text>
      <TouchableOpacity onPress={handleReport} style={styles.reportButton}>
        <Text style={styles.reportButtonText}>Submit Report</Text>
      </TouchableOpacity>
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
    marginRight: 5,
    marginTop: 5,
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: '#aebdbf',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  reportPromptText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  reportButton: {
    marginBottom: 40,
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 1,
  },
  reportButtonText: {
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
  deleteComment: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  deleteCommentText: {
    color: 'deepskyblue',
  },
  commentStyle: {
    marginRight: 120,
    marginBottom: 20,
  },
  commentTimeStyling: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  timeStampComment: {
    paddingTop: 20,
  },
  timeStampCommentStyle: {
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 18,
    paddingBottom: 15,
  },
})

export default PostResponse
