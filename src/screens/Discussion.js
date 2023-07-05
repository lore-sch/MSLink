import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Discussion = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Discussion here</Text>
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
    fontSize:30,
  },
})
export default Discussion
