//post comments on user posts and status
import React, { useState, useEffect, useContext } from 'react'
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
import ApiUtility from '../components/ApiUtility'
import { Feather } from '@expo/vector-icons'
import moment from 'moment'
import ProfileEditModal from './ProfileEditModal'

const DiscussionResponse = ({
  post,
  discussion_post_id,
  closePost,
  fetchComments,
  comments,
  backgroundColor,
}) => {
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState([])
  const [profileModalVisibility, setProfileModalVisibility] = useState({})
  const { userId } = useContext(AuthContext)

  const apiUrl = ApiUtility()

  //to post comments to existing comments on status
  const addComment = async () => {
    try {
      const response = await axios.post(`${apiUrl}/DiscussionComments`, {
        discussion_post_id: post.discussion_post_id,
        userComment: comment,
        user_id: userId,
      })

      setComment('')
      fetchComments()
      setCommentList([...commentList, response.data]) // Fetch updated comments after posting a new comment
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
              const response = await axios.post(
                `${apiUrl}/DeleteDiscussionComment`,
                {
                  discussion_comment_id: deleteItem.discussion_comment_id,
                  user_id: userId,
                }
              )
              fetchComments()
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
    return (
      <View style={styles.commentsContainer}>
           <TouchableOpacity
          onPress={() => openProfileModal(item.user_profile_id)}
        >
          <Text style={styles.profileNameText}>{item.user_profile_name}</Text>
        </TouchableOpacity>
        <View style={styles.commentStyle}>
          <Text style={styles.commentText}>{item.discussion_comment}</Text>
          <Text style={styles.timeStampCommentStyle}>
            {moment(item.user_post_timestamp).format('MMMM Do YYYY, h:mm a')}
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
    fetchComments(discussion_post_id) // Fetch comments when the component mounts
    setCommentList(comments) // Update the commentList with the fetched comments
  }, [comments, fetchComments, discussion_post_id])

  const navigation = useNavigation()
  const handleReport = () => {
    closePost()
    navigation.navigate('Report')
  }
  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <View style={{ ...styles.discussionPost, backgroundColor }}>
          <Text style={styles.postText}>{post.discussion_post}</Text>
        </View>
      </View>
      <View style={styles.commentsContainer}>
        <FlatList
          data={commentList}
          renderItem={renderComment}
          keyExtractor={(item) => item.discussion_comment_id}
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
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: '#aebdbf',
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
    marginBottom: 10,
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
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
    lineHeight: 30,
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
    fontSize: 17,
  },
  profileNameText: {
    fontSize: 16,
    color: 'deepskyblue',
    marginLeft: 20,
    marginRight: 20,
  },
  deleteComment: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  deleteCommentText: {
    color: 'deepskyblue',
  },
  discussionPost: {
    padding: 30,
    borderRadius: 20,
  },
  discussionText: {
    color: 'white',
  },
  timeStampCommentStyle: {
    marginTop: 10,
  },
  commentStyle: {
    marginRight: 120,
    marginBottom: 10,
    
  },
})

export default DiscussionResponse
