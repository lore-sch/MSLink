// User's story which displays on their profile page
import { useState } from 'react'
import { Text, TextInput, ScrollView, View } from 'react-native'

//Called from database
const Story = ({ isEditing, userStory, setUserStory }) => {

  //event handler for editing story- in profile page
  const handleStoryChange = (text) => {
    setUserStory(text)
  }
  return (
    <ScrollView
      style={styles.storyContainer}
      contentContainerStyle={styles.storyContent}
    >
      {isEditing ? (
        <View>
          <View style={styles.promptContainer}>
            <Text style={styles.promptText}>
              A space to share your story and MS journey. Need some inspiration?
              View our guide: Sharing your journey
            </Text>
          </View>
          <TextInput
            style={styles.editStory}
            multiline={true}
            value={userStory}
            onChangeText={handleStoryChange}
          />
        </View>
      ) : (
        <Text style={styles.storyText}>{userStory}</Text>
      )}
    </ScrollView>
  )
}

const styles = {
  editStory: {
    fontSize: 17,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  storyText: {
    fontSize: 17,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  storyContainer: {
    width: 380,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    marginVertical: 20,
  },
  storyContent: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  promptContainer: {
    width: 280,
    marginHorizontal: 50,
    paddingBottom: 30,
  },
  promptText: {
    fontSize: 17,
    color: 'deepskyblue',
  },
}

export default Story
