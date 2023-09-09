import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import axios from 'axios'
import ApiUtility from '../components/ApiUtility'

const SubmitReaction = ({
  onReactionSelect,
  user_post_id,
  user_image_id,
  selectedReaction,
}) => {
  const availableEmojis = [
    { identifier: 'like', emoji: '👍' },
    { identifier: 'love', emoji: '🩷' },
    { identifier: 'laugh', emoji: '😂' },
    { identifier: 'sad', emoji: '😢' },
    { identifier: 'anger', emoji: '😡' },
  ]

  const apiUrl = ApiUtility()
  const [selectedEmoji, setSelectedEmoji] = useState(selectedReaction)

  const handleEmojiClick = async (emojiIdentifier) => {
    setSelectedEmoji(emojiIdentifier)
    if (user_post_id) {
      onReactionSelect(user_post_id, emojiIdentifier)
      try {
        // Make an HTTP POST request to the server to submit the reaction
        const response = await axios.post(`${apiUrl}/SubmitReaction`, {
          user_post_id: user_post_id,
          reactionType: emojiIdentifier,
        })
      } catch (error) {
        console.error('Error submitting reaction:', error)
      }
    } else {
      onReactionSelect(user_image_id, emojiIdentifier)
      try {
        // Make an HTTP POST request to the server to submit the reaction
        const response = await axios.post(`${apiUrl}/SubmitImageReaction`, {
          user_image_id: user_image_id,
          reactionType: emojiIdentifier,
        })
      } catch (error) {
        console.error('Error submitting reaction:', error)
      }
    }
  }

  return (
    <View style={styles.emojiContainer}>
      {availableEmojis.map((emojiObj) => (
        <TouchableOpacity
          key={emojiObj.identifier}
          onPress={() => handleEmojiClick(emojiObj.identifier)}
          style={[
            styles.emojiButton,
            selectedEmoji === emojiObj.identifier && styles.selectedEmoji,
          ]}
        >
          <Text>{emojiObj.emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  emojiButton: {
    padding: 4,
    borderRadius: 5,
  },
  selectedEmoji: {
    backgroundColor: '#bce3eb',
  },
})

export default SubmitReaction
