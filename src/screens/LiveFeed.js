import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const LiveFeed = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Live Feed here</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 300,
  },
  textStyle: {
    color: 'deepskyblue',
    fontSize: 30,
  },
})
export default LiveFeed
