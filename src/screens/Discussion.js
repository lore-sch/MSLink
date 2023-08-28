import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
  Modal,
} from 'react-native'
import axios from 'axios'
import { AuthContext } from '../components/AuthContext'
import DiscussionResponse from './DiscussionResponse'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import SearchModal from './SearchModal'
//button styling and set up
const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

const Discussion = () => {
  const [enteredPost, setEnteredPost] = useState('')
  const [posts, setPosts] = useState([])
  const { userId } = useContext(AuthContext)
  const [selectedPost, setSelectedPost] = useState(null)
  const [comments, setComments] = useState([])
  const [searchModalVisible, setSearchModalVisible] = useState(false)
  const [searchResults, setSearchResults] = useState(false)

  const clearSearch = () => {
    fetchDiscussionPosts()
    setSearchModalVisible(false)
  }

  useEffect(() => {
    fetchDiscussionPosts()
  }, [])

  //open post function to view comments
  const openPost = (post) => {
    setSelectedPost(post)
    fetchPostComments(post.discussion_post_id)
  }

  //close post or image in view comments state to go back to live feed
  const closePost = () => {
    setSelectedPost(null)
    setComments([])
  }

  const postHandler = (enteredPost) => {
    setEnteredPost(enteredPost)
  }
  //route to fetch each discussion post
  const fetchDiscussionPosts = async () => {
    let apiUrl = 'http://localhost:3000/DiscussionPost' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/DiscussionPost' // Override API URL for Android
    }
    try {
      const response = await axios.get(apiUrl)
      const postData = response.data
      setPosts(postData)
      setSearchResults(false)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }
  //fetches posts for outcome of search criteria
  const fetchSearchDiscussionPosts = async (searchTerm = '') => {
    let apiUrl = 'http://localhost:3000/DiscussionPostSearch' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/DiscussionPostSearch' // Override API URL for Android
    }
    try {
      const response = await axios.get(apiUrl, {
        params: {
          searchTerm: searchTerm,
        },
      })
      const postData = response.data
      setPosts(postData)
      setSearchResults(true)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  //post report
  const handleDiscussionPost = async () => {
    try {
      // Determine the API URL based on the platform (Android or iOS)
      let apiUrl = 'http://localhost:3000' // Default API URL for iOS
      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000' // Override API URL for Android
      }
      const response = await axios.post(`${apiUrl}/DiscussionPost`, {
        discussionText: enteredPost,
      })
      const postData = response.data
      setEnteredPost('')
      fetchDiscussionPosts()
    } catch (error) {
      console.error('Error submitting discussion post:', error)
    }
  }

  const fetchPostComments = async (discussion_post_id) => {
    try {
      let apiUrl = 'http://localhost:3000/DiscussionComments' // Default API URL for iOS

      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000/DiscussionComments' // Override API URL for Android
      }

      const response = await axios.get(apiUrl, {
        params: {
          discussion_post_id: discussion_post_id,
        },
      })
      setComments(response.data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const openSearchModal = () => {
    setSearchModalVisible(true)
  }

  const closeSearchModal = () => {
    setSearchModalVisible(false)
  }
  //sets up changing colours for discussion posts
  const postColors = ['pink', 'blue', 'green']
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={openSearchModal}>
          <Ionicons name="ios-search" size={24} color="deepskyblue" />
        </TouchableOpacity>
      </View>
      <SearchModal
        fetchSearchResults={fetchSearchDiscussionPosts}
        openSearchModal={openSearchModal}
        closeSearchModal={closeSearchModal}
        searchModalVisible={searchModalVisible}
        placeholderText={'Search for discussions...'}
      />
      {searchResults && ( // Show "Clear" button only if search term is not empty
        <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
          <Feather name="x" size={24} color="red" />
        </TouchableOpacity>
      )}
      <View style={styles.postItemContainer}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              <View
                style={{
                  ...styles.discussionPost,
                  backgroundColor:
                    postColors[item.discussion_post_id % postColors.length], // Use item.index
                }}
              >
                <Text style={styles.discussionText}>
                  {item.discussion_post}
                </Text>
              </View>
              <TouchableOpacity onPress={() => openPost(item)}>
                <Text style={styles.postComment}>View comments</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.discussion_post_id}
          ListFooterComponent={
            selectedPost && (
              <Modal visible={true} onRequestClose={closePost}>
                <DiscussionResponse
                  post={selectedPost}
                  comments={comments}
                  fetchComments={fetchPostComments}
                  discussion_post_id={selectedPost.discussion_post_id}
                  closePost={closePost}
                  backgroundColor={
                    postColors[
                      selectedPost.discussion_post_id % postColors.length
                    ]
                  }
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closePost}
                >
                  <Feather name="x" size={14} color="white" />
                </TouchableOpacity>
              </Modal>
            )
          }
        />
      </View>
      {/* Conditional rendering for admin only (user_id 1 && 2) */}
      {(userId === 1 || userId === 2) && (
        <View style={styles.adminContainer}>
          <Text style={styles.inputPrompt}>
            Enter post for discussion board (admin only):
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter post for discussion"
            onChangeText={postHandler}
            multiline={true}
            value={enteredPost}
          />
          <View style={styles.buttonContainer}>
            <SquareButton
              title="Post Discussion Topic"
              onPress={handleDiscussionPost}
            />
          </View>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    marginLeft: 300,
    marginTop: 0,
  },
  clearButton: {
    marginLeft: 300,
    marginTop: 15,
  },
  adminContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  inputPrompt: {
    fontSize: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    width: 320,
    padding: 8,
    margin: 5,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  button: {
    backgroundColor: 'grey',
    width: 180,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
  },
  postItemContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    width: 350,
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
  postComment: {
    fontSize: 16,
    color: 'deepskyblue',
    paddingTop: 20,
  },
  postItem: {
    borderBottomWidth: 0.5,
    borderColor: '#aebdbf',
    marginBottom: 30,
    color: 'white',
  },
  discussionPost: {
    padding: 60,
    borderRadius: 20,
  },
  discussionText: {
    color: 'white',
    fontSize: 16,
  },
})
export default Discussion
