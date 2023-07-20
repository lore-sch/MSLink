// LiveFeed- shows the posts from users
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Modal,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'
import PostResponse from './PostResponse'
import PostReaction from './PostReaction'
import PostReactionCount from './PostReactionCount'

const LiveFeed = () => {
  const [enteredPost, setEnteredPost] = useState('')
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [comments, setComments] = useState([])
  const [postReactions, setPostReactions] = useState({}) // State to store reactions for each post

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
      setEnteredPost('')
      fetchPosts()
    } catch (error) {
      console.error('Error posting:', error)
    }
  }

  const openPost = (post) => {
    setSelectedPost(post)
    fetchComments(post.user_post_id)
  }

  const closePost = () => {
    setSelectedPost(null)
    setComments([])
  }

  const handlePostReaction = async (userPostId, emojiIdentifier) => {
    try {
      // Determine the API URL based on the platform (Android or iOS)
      let apiUrl = 'http://localhost:3000' // Default API URL for iOS
      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000' // Override API URL for Android
      }

      // Make an HTTP POST request to the server to submit the reaction
      await axios.post(`${apiUrl}/PostReaction`, {
        user_post_id: userPostId,
        reactionType: emojiIdentifier,
      })

      // Update the reaction state for the current post
      updatePostReaction(userPostId, emojiIdentifier)
    } catch (error) {
      console.error('Error submitting reaction:', error)
    }
  }

  const updatePostReaction = (userPostId, reactionType) => {
    setPostReactions((prevReactions) => ({
      ...prevReactions,
      [userPostId]: reactionType,
    }))
  }

  const renderPostItem = ({ item }) => (
    <View style={styles.postItemContainer}>
      <Text style={styles.userName}>{item.user_profile_name}</Text>
      <Text style={styles.postText}>{item.user_post}</Text>
      <PostReactionCount user_post_id={item.user_post_id} />
      <View style={styles.reactionContainer}>
        <TouchableOpacity onPress={() => openPost(item)}>
          <Text style={styles.postComment}>View comments</Text>
        </TouchableOpacity>
        <PostReaction
          onReactionSelect={handlePostReaction}
          user_post_id={item.user_post_id}
          selectedReaction={postReactions[item.user_post_id] || null}
        />
      </View>
    </View>
  )

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
        <Text style={styles.optionText}>Photo</Text>
        <FontAwesome name='photo' size={20} color='deepskyblue' />
        <Text style={styles.optionText}>Poll</Text>
        <AntDesign name='barschart' size={20} color='deepskyblue' />
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
        ListFooterComponent={
          selectedPost && (
            <Modal visible={true} onRequestClose={closePost}>
              <PostResponse
                post={selectedPost}
                comments={comments}
                fetchComments={fetchComments}
                user_post_id={selectedPost.user_post_id}
              />
              <TouchableOpacity style={styles.closeButton} onPress={closePost}>
                <Feather name='x' size={14} color='white' />
              </TouchableOpacity>
            </Modal>
          )
        }
      />
      {selectedPost && (
        <View>
          <PostReaction
            onReactionSelect={handlePostReaction}
            user_post_id={selectedPost.user_post_id}
            selectedReaction={postReactions[selectedPost.user_post_id] || null}
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
})

export default LiveFeed