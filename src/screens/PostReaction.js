import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native'
import axios from 'axios'

const PostReaction = ({ onReactionSelect, user_post_id, selectedReaction }) => {
  const availableEmojis = [
    { identifier: 'like', emoji: '👍' },
    { identifier: 'love', emoji: '🩷' },
    { identifier: 'laugh', emoji: '😂' },
    { identifier: 'sad', emoji: '😢' },
    { identifier: 'anger', emoji: '😡' },
  ]

  const [selectedEmoji, setSelectedEmoji] = useState(selectedReaction)

  const handleEmojiClick = async (emojiIdentifier) => {
    setSelectedEmoji(emojiIdentifier)
    onReactionSelect(user_post_id, emojiIdentifier)

    try {
      // Determine the API URL based on the platform (Android or iOS)
      let apiUrl = 'http://localhost:3000' // Default API URL for iOS
      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000' // Override API URL for Android
      }

      // Make an HTTP POST request to the server to submit the reaction
      await axios.post(`${apiUrl}/PostReaction`, {
        user_post_id,
        reactionType: emojiIdentifier,
      })
    } catch (error) {
      console.error('Error submitting reaction:', error)
    }
  }

  return (
    <View style={styles.emojiContainer}>
      {availableEmojis.map(
        (
          emojiObj //loops through available emojis
        ) => (
          <TouchableOpacity //emoji buttons
            key={emojiObj.identifier}
            onPress={() => handleEmojiClick(emojiObj.identifier)} //function called when emoji clicked, identfier is an argument passed as a function to determine emoji
            style={[
              styles.emojiButton,
              selectedEmoji === emojiObj.identifier && styles.selectedEmoji,
            ]}
          >
            <Text>{emojiObj.emoji}</Text>
          </TouchableOpacity>
        )
      )}
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

export default PostReaction
