//Shows emojis with the reaction count
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import axios from 'axios'

// const PostReactionCount = ({ item }) => {
//   const emojis = [
//     { identifier: 'like', emoji: '👍', count: item.post_like || 0 },
//     { identifier: 'love', emoji: '🩷', count: item.post_love || 0 },
//     { identifier: 'laugh', emoji: '😂', count: item.post_laugh || 0 },
//     { identifier: 'sad', emoji: '😢', count: item.post_sad || 0 },
//     { identifier: 'anger', emoji: '😡', count: item.post_anger || 0 },
//   ]

//   return (
//     <View style={styles.reactionContainer}>
//       {emojis.map((emojiObj) => (
//         <View key={emojiObj.identifier} style={styles.reactionItem}>
//           <Text>{emojiObj.emoji}</Text>
//           <Text style={styles.countText}>{emojiObj.count}</Text>
//         </View>
//       ))}
//     </View>
//   )
// }

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
