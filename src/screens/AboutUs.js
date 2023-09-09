import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

//button styling and set up
const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)
const AboutUs = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>About MS Link </Text>
      <View style={styles.mainTextWrapper}>
        <Text style={styles.mainTextStyle1}>
          A mobile app developed for individuals in Northern Ireland impacted by
          Multiple Sclerosis (MS). A safe space to open up and share with other
          like-minded individuals on the same journey.
        </Text>
        <Text style={styles.mainTextStyle2}>
          The Profile tab offers a chance to create a unique profile to share
          with other users. You can choose to share your MS journey and story on
          your terms.
        </Text>
        <Text style={styles.mainTextStyle3}>
          The Discussion tab presents topics, displayed in bold colours for
          readability to explore and comment on.
        </Text>
        <Text style={styles.mainTextStyle4}>
          The Live Feed tab allows you to share whatever is on your mind or if
          you want to ask questions/create a poll or evenjust post a photo.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack() // Go back to the previous screen
        }}
      >
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textStyle: {
    color: 'deepskyblue',
    fontSize: 30,
    fontWeight: 'bold',
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
  mainTextWrapper: {
    padding: 30,
  },
  mainTextStyle1: {
    fontSize: 17,
  },
  mainTextStyle2: {
    paddingTop: 20,
    fontSize: 17,
    color: '#4fa6f6'
  },
  mainTextStyle3: {
    paddingTop: 20,
    fontSize: 17,
    color: '#1177d6'
  },
  mainTextStyle4: {
    paddingTop: 20,
    fontSize: 17,
    color: '#0d5598'
  },
 
})
export default AboutUs
