import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import axios from 'axios'

const PostReactionCount = ({ user_post_id }) => {
  const availableEmojis = [
    { identifier: 'like', emoji: '👍' },
    { identifier: 'love', emoji: '🩷' },
    { identifier: 'laugh', emoji: '😂' },
    { identifier: 'sad', emoji: '😢' },
    { identifier: 'anger', emoji: '😡' },
  ]

  const [reactionCounts, setReactionCounts] = useState({})

  const fetchReactionCount = async () => {
    let apiUrl = 'http://localhost:3000/PostReactionCount' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/PostReactionCount' // Override API URL for Android
    }

    try {
      const response = await axios.get(apiUrl, {
        params: {
          user_post_id: user_post_id,
        },
      })
      
      // Assuming the response is an array of objects with identifiers and counts
      const reactionData = response.data || []
      const counts = {}
      reactionData.forEach((item) => {
        counts[item.identifier] = item.count
      })

      setReactionCounts(counts)
    } catch (error) {
      console.error('Error fetching reaction counts:', error)
    }
  }

  useEffect(() => {
    fetchReactionCount()
  }, [user_post_id])

  return (
    <View style={styles.reactionContainer}>
      {availableEmojis.map((emojiObj) => (
        <View key={emojiObj.identifier} style={styles.reactionItem}>
          <Text>{emojiObj.emoji}</Text>
          <Text>{reactionCounts[`post_${emojiObj.identifier}`] || 0}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  reactionItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
})

export default PostReactionCount
