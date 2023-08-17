import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import axios from 'axios'
import { AuthContext } from '../components/AuthContext'
import Poll from 'react-native-poll'

const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

const UserPoll = ({ closePoll }) => {
  const [voteData, setVoteData] = useState()
  const [totalVotes, setTotalVotes] = useState()
  const [voted, setVoted] = useState(false)
  const [pollQuestion, setPollQuestion] = useState('')
  const [pollOptions, setPollOptions] = useState(['', '', ''])
  const { userId } = useContext(AuthContext)

  const pollQuestionHandler = (pollQuestion) => {
    setPollQuestion(pollQuestion)
  }

  //use index to ensure all 3 fields are posted into 3 option fields in database, poll creation
  const pollOptionsHandler = (index, option) => {
    const updatedOptions = [...pollOptions]
    updatedOptions[index] = option
    setPollOptions(updatedOptions)
  }

  //handles creation of new polls and posting
  const pollHandler = async () => {
    let apiUrl = 'http://localhost:3000/UserPoll' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/UserPoll' // Override API URL for Android
    }

    try {
      const response = await axios.post(apiUrl, {
        pollQuestion: pollQuestion,
        pollOptions: pollOptions,
        user_id: userId,
      })
      //resets text input fields to empty
      setPollQuestion('')
      setPollOptions('')

      cancelPoll()
    } catch (error) {}
  }

  const cancelPoll = () => {
    closePoll()
  }


  return (
    <View style={styles.pollContainer}>
      <Text style={styles.questionPrompt}>What would you like to ask? </Text>
      <TextInput
        style={styles.questionInput}
        placeholder='Poll question'
        multiline={true}
        onChangeText={pollQuestionHandler}
      />
      <Text style={styles.optionPrompt}>Option one: </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => pollOptionsHandler(0, text)}
        multiline={true}
      />
      <Text style={styles.optionPrompt}>Option two: </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => pollOptionsHandler(1, text)}
        multiline={true}
      />
      <Text style={styles.optionPrompt}>Option three: </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => pollOptionsHandler(2, text)}
        multiline={true}
      />

      <View style={styles.buttonContainer}>
        <SquareButton title='Post' onPress={pollHandler} />
        <SquareButton title='Cancel' onPress={cancelPoll} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pollContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 70,
  },
  questionPrompt: {
    fontSize: 16,
    color: 'deepskyblue',
  },
  optionPrompt: {
    fontSize: 16,
    color: 'deepskyblue',
  },
  questionInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    width: '80%',
    height: '20%',
    padding: 8,
    margin: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    width: '80%',
    padding: 8,
    margin: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'deepskyblue',
    margin: 15,
    width: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
})
export default UserPoll
