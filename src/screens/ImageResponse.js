//Comments on images
import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Image,
} from 'react-native'
import axios from 'axios'
import { AuthContext } from '../components/AuthContext'
import { useNavigation } from '@react-navigation/native'
import ApiUtility from '../components/ApiUtility'
import { Feather } from '@expo/vector-icons'
import ProfileEditModal from './ProfileEditModal'

const ImageResponse = ({
  post: imagePost,
  comments,
  fetchCommentsOnImage,
  user_image_id,
  closePost,
}) => {
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState([])
  const { userId } = useContext(AuthContext)
  const [profileModalVisibility, setProfileModalVisibility] = useState({})

  const apiUrl = ApiUtility()

  //api call for existing comments on images
  const fetchImageComments = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/ImageResponse`, {
        params: {
          user_image_id: user_image_id,
        },
      })
      setCommentList(response.data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }, [imagePost])

  //to post comments to existing comments on images
  const addComment = async () => {
    try {
      const response = await axios.post(`${apiUrl}/ImageResponse`, {
        userComment: comment,
        user_image_id: imagePost.user_image_id,
        user_id: userId,
      })

      setComment('')
      fetchCommentsOnImage(user_image_id)
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
                `${apiUrl}/DeleteImageComment`,
                {
                  image_comment_id: deleteItem.image_comment_id,
                  user_id: userId,
                }
              )
              fetchCommentsOnImage(user_image_id)
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
    if (!item || !item.image_comment_id) {
      return null // skips rendering if the comment/ the image_comment_id undefined (avoids axios error)
    }
    return (
      <View style={styles.commentsContainer}>
        <TouchableOpacity
          onPress={() => openProfileModal(item.user_profile_id)}
        >
          <Text style={styles.profileNameText}>{item.user_profile_name}</Text>
        </TouchableOpacity>
        <Text style={styles.commentText}>{item.post_comment}</Text>
        {currentUserComment && (
          <TouchableOpacity
            onPress={() => deleteComment(item)}
            style={styles.deleteComment}
          >
            <Feather name="x" size={16} color="deepskyblue" />
            <Text style={styles.deleteCommentText}>Delete</Text>
          </TouchableOpacity>
        )}
        <ProfileEditModal
          user_profile_id={item.user_profile_id}
          visible={isProfileModalVisible}
          onClose={() => closeModal(item.user_profile_id)}
        />
      </View>
    )
  }

  useEffect(() => {
    fetchImageComments() // Fetch comments when the component mounts and image accessed
  }, [fetchImageComments])

  const navigation = useNavigation()
  const handleReport = () => {
    closePost()
    navigation.navigate('Report')
  }

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.postUserName}>{imagePost.user_profile_name}</Text>
        <Image
          source={{ uri: imagePost.image_path }}
          style={styles.selectedImage}
          onError={(error) =>
            console.log('Image loading error:', error.nativeEvent.error)
          }
        />
      </View>

      <View style={styles.commentsContainer}>
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.image_comment_id.toString()}
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
  selectedImage: {
    marginTop: 20,
    width: 350,
    height: 250,
  },
  deleteComment: {
    flexDirection: 'row',
    paddingLeft: 75,
  },
  deleteCommentText: {
    color: 'deepskyblue',
  },
})

export default ImageResponse
