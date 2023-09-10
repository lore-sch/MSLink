import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

const StoryShareModal = ({ closeStoryShare }) => {
  const linkMSTrust =
    'https://mstrust.org.uk/information-support/newly-diagnosed/telling-people-about-your-ms'
  const handleLinkPress = () => {
    Linking.openURL(linkMSTrust)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.clearButton} onPress={closeStoryShare}>
        <Feather name="x" size={24} color="red" />
      </TouchableOpacity>
      <Text style={styles.title}>Sharing your story</Text>
      <Text style={styles.title2}>Why share? </Text>
      <Text style={styles.mainText}>
        Telling others your story about your MS could help you feel in control.
        It can help you feel supported and explain to other people with MS, your
        journey of what you have been through.
      </Text>
      <Text style={styles.mainText}>
        No two MS journeys are the same. Sharing and reading about others
        experiences can be a reminder you are not alone.
      </Text>
      <Text style={styles.mainTextStandOut}>
        Of course, this is completely on your own terms and you can share as
        much or as little as you want.
      </Text>
      <Text style={styles.mainText}>
        A link to the MS Trust is provided if you would like more information:
      </Text>
      <TouchableOpacity onPress={handleLinkPress}>
        <Text style={styles.link}>
          https://mstrust.org.uk/information-support/newly-diagnosed/telling-people-about-your-ms
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 70,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    color: 'deepskyblue',
    fontWeight: 'bold',
    padding: 18,
  },
  title2: {
    fontSize: 18,
    color: 'deepskyblue',
    padding: 5,
  },
  mainText: {
    fontSize: 18,
    padding: 15,
    lineHeight: 30,
  },
  mainTextStandOut: {
    fontSize: 18,
    padding: 13,
    lineHeight: 30,
    color: 'blue',
  },
  link: {
    color: 'deepskyblue',
    fontSize: 18,
    padding: 1,
  },
  clearButton: {
    marginLeft: 300
  }
})

export default StoryShareModal
