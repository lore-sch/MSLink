// LiveFeed- shows the posts from users
import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Modal,
  Image,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'
import PostResponse from './PostResponse'
import ImageResponse from './ImageResponse'
import SubmitReaction from './SubmitReaction'
import PostReactionCount from './PostReactionCount'
import UserPoll from './UserPoll'
import { AuthContext } from '../components/AuthContext'
import * as ImagePicker from 'expo-image-picker'

const LiveFeed = () => {
  const [enteredPost, setEnteredPost] = useState('')
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [comments, setComments] = useState([])
  const [reactions, setReactions] = useState({}) // State to store reactions for each post
  const [isCameraModalVisible, setCameraModalVisible] = useState(false)
  const [isPollModalVisible, setPollModalVisible] = useState(false)
  const [image, setImage] = useState(null)
  const [pollResult, setPollResult] = useState(null)
  const [pollResultsData, setPollResultsData] = useState({})
  const [hasVoted, setHasVoted] = useState(false)
  const [votingStatus, setVotingStatus] = useState({})
  const { userId } = useContext(AuthContext)

  //TO DOL: Set up individual component for android/ios route

  const fetchPosts = async () => {
    let apiUrl = 'http://localhost:3000/LiveFeed' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/LiveFeed' // Override API URL for Android
    }

    try {
      const response = await axios.get(apiUrl)

      const updatedPosts = response.data.map((post) => {
        if (post.type === 'user_image') {
          let absoluteImagePath = `http://localhost:3000/${post.image_path}`
          if (Platform.OS === 'android') {
            absoluteImagePath = `http://10.0.2.2:3000/${post.image_path}`
          }
          return {
            ...post,
            image_path: absoluteImagePath,
          }
        } else if (post.type === 'user_poll') {
          // Handle the user_poll data here
          // For example, you can construct the poll options as an array of strings
          const pollOptions = [
            post.user_poll_option_1,
            post.user_poll_option_2,
            post.user_poll_option_3,
          ]
          // Return a new object with the updated pollOptions array
          return {
            ...post,
            pollOptions: pollOptions,
          }
        }

        return post
      })

      setPosts(updatedPosts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }
  const fetchComments = async (userPostId) => {
    let apiUrl = 'http://localhost:3000/PostResponse' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/PostResponse' // Override API URL for Android
    }

    //user_post_id to ensure comments related to clicked on post appear
    try {
      const response = await axios.get(apiUrl, {
        params: {
          user_post_id: userPostId,
        },
      })

      const commentsData = response.data || [] // Handle undefined or null comments
      setComments(commentsData)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const fetchCommentsOnImage = async (user_image_id) => {
    let apiUrl = 'http://localhost:3000/ImageResponse' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/ImageResponse' // Override API URL for Android
    }

    //user_post_id to ensure comments related to clicked on post appear
    try {
      const response = await axios.get(apiUrl, {
        params: {
          user_image_id: user_image_id,
        },
      })

      const commentsData = response.data || []
      setComments(commentsData)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const fetchPollResults = async (user_poll_id) => {
    let apiUrl = 'http://localhost:3000/pollResults' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/pollResults' // Override API URL for Android
    }
    try {
      const response = await axios.get(apiUrl, {
        params: {
          user_poll_id: user_poll_id,
        },
      })
      const pollResultData = response.data[0]

      // Update the state with the fetched poll results data
      setPollResultsData((prevData) => {
        return {
          ...prevData,
          [user_poll_id]: pollResultData,
        }
      })
    } catch (error) {
      console.error('Error fetching poll results:', error)
    }
  }

  const fetchUserVotingStatus = async (user_poll_id, user_id) => {
    let apiUrl = 'http://localhost:3000/PollResults' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/PollResults' // Override API URL for Android
    }

    try {
      const response = await axios.get(apiUrl, {
        params: {
          user_poll_id: user_poll_id,
          user_id: userId,
        },
      })

      const hasVoted = response.data.length > 0
      setVotingStatus((prevStatus) => ({
        ...prevStatus,
        [user_poll_id]: hasVoted,
      }))
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

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
      const formData = new FormData()
      formData.append('userPost', enteredPost)
      formData.append('user_id', userId)

      if (image) {
        // If an image is selected, add it to the form data
        formData.append('image', {
          uri: image,
          name: `post_${Date.now()}.jpg`,
          type: 'image/jpeg',
        })
      }

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setEnteredPost('')
      setCameraModalVisible(false) // Close the camera modal after posting
      setImage(null)
      fetchPosts()
    } catch (error) {
      console.error('Error posting:', error)
    }
  }

  const openPost = (post) => {
    setSelectedPost(post)
    fetchComments(post.user_post_id)
  }

  const openImage = (post) => {
    setSelectedPost({
      ...post,
      image_id: post.image_id,
      image_path: post.image_path,
    })
    fetchCommentsOnImage(post.user_image_id)
  }

  const closePost = () => {
    setSelectedPost(null)
    setComments([])
  }

  const toggleCameraModal = () => {
    setCameraModalVisible(!isCameraModalVisible)
  }

  const choosePhotoFromLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled) {
        // Use the selected image here, you may want to upload it to your server or store the path
        console.log('Selected Image URI:', result.uri)

        let apiUrl = 'http://localhost:3000/LiveFeed' // Default API URL for iOS

        if (Platform.OS === 'android') {
          apiUrl = 'http://10.0.2.2:3000/LiveFeed' // Override API URL for Android
        }

        try {
          const formData = new FormData()
          formData.append('userPost', enteredPost)
          formData.append('user_id', userId)

          // If an image is selected, add it to the form data
          formData.append('image', {
            uri: result.uri,
            name: `post_${Date.now()}.jpg`,
            type: 'image/jpeg',
          })

          const response = await axios.post(apiUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          setEnteredPost('')
          setCameraModalVisible(false) // Close the camera modal after posting

          fetchPosts()
        } catch (error) {
          console.error('Error posting:', error)
        }
      }
    } catch (error) {
      console.error('Error selecting photo:', error)
    }
  }

  const showPollModal = () => {
    setPollModalVisible(true)
  }

  const hidePollModal = () => {
    setPollModalVisible(false)
  }

  const handlePostReaction = async (userPostId, emojiIdentifier) => {
    try {
      // Determine the API URL based on the platform (Android or iOS)
      let apiUrl = 'http://localhost:3000' // Default API URL for iOS
      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000' // Override API URL for Android
      }

      // Make an HTTP POST request to the server to submit the reaction
      const response = await axios.post(`${apiUrl}/SubmitReaction`, {
        user_post_id: userPostId,
        reactionType: emojiIdentifier,
      })

      const updatedReactionCounts = response.data

      // Update the reaction state for the current post
      updatePostReaction(userPostId, updatedReactionCounts)
    } catch (error) {
      console.error('Error submitting reaction:', error)
    }
  }

  const updatePostReaction = (userPostId, reactionType) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [userPostId]: reactionType,
    }))
  }
  //post route for user voting in polls
  const pollResultsHandler = async (option, user_poll_id, user_id) => {
    let apiUrl = 'http://localhost:3000/pollResults' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/pollResults' // Override API URL for Android
    }
    try {
      const response = await axios.post(apiUrl, {
        pollResult: option,
        user_poll_id: user_poll_id,
        user_id: userId,
      })
      setPollResult(option)
      fetchPollResults(user_poll_id)

      setVotingStatus((prevStatus) => ({
        ...prevStatus,
        [user_poll_id]: true,
      }))
    } catch (error) {}
  }

  //redners user profile name and their 'status' or post- also shows reactions count but not working currently- all 0
  const renderPostItem = ({ item }) => {
    if (item.type === 'user_post') {
      return (
        <View style={styles.postItemContainer}>
          <Text style={styles.userName}>{item.user_profile_name}</Text>
          <Text style={styles.postText}>{item.user_post}</Text>
          <PostReactionCount
            user_post_id={item.user_post_id}
            counts={reactions[item.user_post_id] || {}}
            onReactionSelect={handlePostReaction}
            selectedReaction={reactions[item.user_post_id] || null}
          />
          <View style={styles.reactionContainer}>
            <TouchableOpacity onPress={() => openPost(item)}>
              <Text style={styles.postComment}>View comments</Text>
            </TouchableOpacity>

            <SubmitReaction
              onReactionSelect={handlePostReaction}
              user_post_id={item.user_post_id}
              selectedReaction={reactions[item.user_post_id] || null}
            />
          </View>
        </View>
      )
    } else if (item.type === 'user_image') {
      return (
        <View style={styles.postItemContainer}>
          <Text style={styles.userName}>{item.user_profile_name}</Text>
          <Image
            source={{ uri: item.image_path }}
            style={styles.image}
            onError={(error) =>
              console.log('Image loading error:', error.nativeEvent.error)
            }
          />
          {
            <PostReactionCount
              user_post_id={item.user_post_id}
              counts={reactions[item.user_post_id] || {}}
              onReactionSelect={handlePostReaction}
              selectedReaction={reactions[item.user_post_id] || null}
            />
          }
          <View style={styles.reactionContainer}>
            <TouchableOpacity onPress={() => openImage(item)}>
              <Text style={styles.postComment}>View comments</Text>
            </TouchableOpacity>
            {
              <SubmitReaction
                onReactionSelect={handlePostReaction}
                user_post_id={item.user_post_id}
                selectedReaction={reactions[item.user_post_id] || null}
              />
            }
          </View>
        </View>
      )
      //will render results it vote cast
    } else if (item.type === 'user_poll') {
      const showResults = pollResultsData && pollResultsData[item.user_poll_id]
      const hasVoted = votingStatus[item.user_poll_id] // Get hasVoted for the specific poll item

      return (
        <View style={styles.postItemContainer}>
          <Text style={styles.userName}>{item.user_profile_name}</Text>
          <Text style={styles.pollQuestion}>{item.user_poll_question}</Text>

          {hasVoted ? ( // Conditionally render based on the hasVoted flag
            // Render the poll results if the user has voted
            <View>
              <View style={styles.pollStylingResult}>
                <Text>
                  {item.user_poll_option_1}:{' '}
                  {
                    pollResultsData[item.user_poll_id]
                      ?.user_poll_result_option_1
                  }
                </Text>
              </View>
              <View style={styles.pollStylingResult}>
                <Text>
                  {item.user_poll_option_2}:{' '}
                  {
                    pollResultsData[item.user_poll_id]
                      ?.user_poll_result_option_2
                  }
                </Text>
              </View>
              <View style={styles.pollStylingResult}>
                <Text>
                  {item.user_poll_option_3}:{' '}
                  {
                    pollResultsData[item.user_poll_id]
                      ?.user_poll_result_option_3
                  }
                </Text>
              </View>
            </View>
          ) : (
            // Render voting options if the user hasn't voted yet
            <View>
              <TouchableOpacity
                style={[
                  styles.pollStyling,
                  pollResult === item.user_poll_option_1
                    ? styles.selectedOption
                    : null,
                ]}
                onPress={() =>
                  pollResultsHandler('Option 1', item.user_poll_id)
                }
              >
                <Text style={styles.pollOption}>{item.user_poll_option_1}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.pollStyling,
                  pollResult === item.user_poll_option_2
                    ? styles.selectedOption
                    : null,
                ]}
                onPress={() =>
                  pollResultsHandler('Option 2', item.user_poll_id)
                }
              >
                <Text style={styles.pollOption}>{item.user_poll_option_2}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.pollStyling,
                  pollResult === item.user_poll_option_3
                    ? styles.selectedOption
                    : null,
                ]}
                onPress={() =>
                  pollResultsHandler('Option 3', item.user_poll_id)
                }
              >
                <Text style={styles.pollOption}>{item.user_poll_option_3}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusInputContainer}>
        <TextInput
          style={styles.statusInput}
          placeholder='Share with us...'
          multiline={true}
          onChangeText={postHandler}
          value={enteredPost}
        />
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Status</Text>
        <Ionicons name='chatbox-outline' size={20} color='deepskyblue' />
        <TouchableOpacity
          style={styles.optionText}
          onPress={() => setCameraModalVisible(true)}
        >
          <Text style={styles.optionText}>Photo</Text>
          <FontAwesome name='photo' size={20} color='deepskyblue' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionText} onPress={showPollModal}>
          <Text style={styles.optionText}>Poll</Text>
          <AntDesign name='barschart' size={20} color='deepskyblue' />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={postButtonHandler}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={isCameraModalVisible}
          onRequestClose={() => setCameraModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setCameraModalVisible(false)
                }}
              >
                <Text style={styles.modalOptionText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  choosePhotoFromLibrary()
                  setCameraModalVisible(false)
                }}
              >
                <Text style={styles.modalOptionText}>
                  Choose from Camera Roll
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOptionCancel}
                onPress={() => setCameraModalVisible(false)}
              >
                <Text style={styles.modalOptionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType='slide'
          transparent={true}
          visible={isPollModalVisible}
          onRequestClose={hidePollModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <UserPoll
                closePoll={hidePollModal}
                pollResult={pollResult}
                setPollResult={setPollResult}
              />
            </View>
          </View>
        </Modal>
      </View>
      <FlatList
        style={styles.list}
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) =>
          item.type === 'user_post'
            ? `user_post_${item.user_post_id}`
            : `user_image_${item.user_post_timestamp}`
        }
        ListFooterComponent={
          selectedPost && (
            <Modal visible={true} onRequestClose={closePost}>
              {selectedPost.type === 'user_post' ? (
                <PostResponse
                  post={selectedPost}
                  comments={comments}
                  fetchComments={fetchComments}
                  user_post_id={selectedPost.user_post_id}
                />
              ) : selectedPost.type === 'user_image' ? (
                <ImageResponse
                  post={selectedPost}
                  comments={comments}
                  fetchCommentsOnImage={fetchCommentsOnImage}
                  user_image_id={selectedPost.user_image_id}
                />
              ) : null}
              <TouchableOpacity style={styles.closeButton} onPress={closePost}>
                <Feather name='x' size={14} color='white' />
              </TouchableOpacity>
            </Modal>
          )
        }
      />
      {selectedPost && (
        <View>
          <SubmitReaction
            onReactionSelect={handlePostReaction}
            user_post_id={selectedPost.user_post_id}
            selectedReaction={reactions[selectedPost.user_post_id] || null}
          />
        </View>
      )}
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
    marginBottom: 10,
    marginTop: 5,
  },
  optionText: {
    paddingHorizontal: 15,
    color: 'deepskyblue',
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'deepskyblue',
    paddingHorizontal: 10,
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
    borderColor: '#aebdbf',
  },
  reactionContainer: {
    flexDirection: 'row',
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    color: 'deepskyblue',
    paddingBottom: 5,
  },
  postComment: {
    fontSize: 16,
    color: 'deepskyblue',
    marginBottom: 10,
    marginRight: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    marginLeft: 10,
    backgroundColor: 'deepskyblue',
    borderRadius: 20,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionCancel: {
    paddingVertical: 15,
    marginTop: 10,
  },
  modalOptionText: {
    fontSize: 20,
    color: 'deepskyblue',
    textAlign: 'center',
  },
  image: {
    width: 350,
    height: 250,
  },
  pollQuestion: {
    color: 'black',
    fontSize: 16,
  },
  pollStyling: {
    marginTop: 20,
    backgroundColor: 'white',
    width: 350,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'deepskyblue',
  },
  pollStylingResult: {
    marginTop: 20,
    backgroundColor: '#87e8e8',
    width: 350,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'deepskyblue',
  },
})

export default LiveFeed
