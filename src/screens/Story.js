// User's story which displays on their profile page
import { Text, TextInput, ScrollView, View } from 'react-native'
import React from 'react'

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
              View our guide:
            </Text>
            <View style={styles.guideTextStyle}>
              <Text style={styles.guideText}>Sharing your journey </Text>
            </View>
          </View>
          <TextInput
            style={styles.editStory}
            multiline={true}
            value={userStory}
            onChangeText={handleStoryChange}
            scrollEnabled={false} // Disable internal scrolling
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
    marginHorizontal: 10,
    height: 220,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    marginVertical: 10,
  },
  storyContent: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  promptContainer: {
    width: 350,
    marginHorizontal: 9,
    paddingBottom: 5,
    textAlign: 'center',
  },
  promptText: {
    fontSize: 17,
    color: 'deepskyblue',
  },
  guideText: {
    color: 'blue',
    fontSize: 17,
    textAlign: 'center',
  },
  guideTextStyle: {
    borderWidth: 0.5,
    marginHorizontal: 75,
    marginVertical: 10,
    padding: 5,
    borderColor: 'blue'
  }
}

export default Story
