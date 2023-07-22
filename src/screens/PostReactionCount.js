//Shows emojis with the reaction count
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import axios from 'axios'

const PostReactionCount = ({ user_post_id, counts }) => {
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
      // Response data with emoji identifiers and numbers as counts- converts to usable format
      const reactionData = response.data[0] || [] //data from api call, first row
      const fetchedCounts = {
        like: reactionData.post_like || 0,
        love: reactionData.post_love || 0,
        laugh: reactionData.post_laugh || 0,
        sad: reactionData.post_sad || 0,
        anger: reactionData.post_anger || 0,
      }
      setReactionCounts(fetchedCounts); //updates state
      
    } catch (error) {
      console.error('Error fetching reaction counts:', error)
    }  

  }
  useEffect(() => {
    fetchReactionCount()
  }, [reactionCounts])

  return (
    //Last line displays reaction count 0 or undefined- alter to only show count if reactions available?
    <View style={styles.reactionContainer}>
      {availableEmojis.map(
        (
          emojiObj //map loops through available emojis- creates reactionItem
        ) => (
          <View key={emojiObj.identifier} style={styles.reactionItem}>
            <Text>{emojiObj.emoji}</Text>
            <Text style={styles.countText}>{counts[emojiObj.identifier] || 0}</Text>
          </View>
        )
      )}
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
  countText: {
    color: 'blue',
  },
})

export default PostReactionCount