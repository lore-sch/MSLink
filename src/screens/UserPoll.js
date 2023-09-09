import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import axios from 'axios'
import { AuthContext } from '../components/AuthContext'
import ApiUtility from '../components/ApiUtility'

const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

const UserPoll = ({ closePoll, fetchPosts }) => {
  const [voteData, setVoteData] = useState()
  const [totalVotes, setTotalVotes] = useState()
  const [voted, setVoted] = useState(false)
  const [pollQuestion, setPollQuestion] = useState('')
  const [pollOptions, setPollOptions] = useState(['', '', ''])
  const MIN_TEXT_LENGTH = 0
  const [invalidInputLength, setInvalidInputLength] = useState(false)
  const { userId } = useContext(AuthContext)

  const apiUrl = ApiUtility()

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
    try {
      if (
        pollQuestion.length > MIN_TEXT_LENGTH &&
        pollOptions.length > MIN_TEXT_LENGTH
      ) {
        const response = await axios.post(`${apiUrl}/UserPoll`, {
          pollQuestion: pollQuestion,
          pollOptions: pollOptions,
          user_id: userId,
        })
        //resets text input fields to empty
        setPollQuestion('')
        setPollOptions('')
        cancelPoll()
        fetchPosts()
      } else {
        setInvalidInputLength(true)
      }
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
        placeholder="Poll question"
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
  {invalidInputLength && (
        <Text style={styles.errorMessage}>
          Input in every field must contain at least one character.
        </Text>
      )}
      <View style={styles.buttonContainer}>
      <SquareButton title="Cancel" onPress={cancelPoll} />
        <SquareButton title="Post" onPress={pollHandler} />
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
  errorMessage: {
    color: 'red',
    fontSize: 18,
    paddingBottom: 15,
  },
})
export default UserPoll
