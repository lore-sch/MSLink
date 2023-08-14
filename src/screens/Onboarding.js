import React, { useRef } from 'react'
import { View, Button, StyleSheet, Text, Image } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

//calls onComplete function in App.js to esnure onboarding screen displayed only once
const Onboarding = ({ onComplete }) => {
  const pagerRef = useRef(null)

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber)
  }

  return (
    <View style={styles.container}>
      <ViewPager style={styles.pageContainer} initialPage={0} ref={pagerRef}>
        <View key='1'>
          <View style={styles.pageOne}>
            <Text style={styles.titleText}>Welcome to MS Link</Text>
            <Text style={styles.pageText}>
              MS Link creates a space for people in Northern Ireland with MS to
              share their story, interact with other users and view and comments
              on topics related to MS and gain other's experiences and views.
            </Text>
            <Button title='Next' onPress={() => handlePageChange(1)} />
          </View>
        </View>
        <View key='2'>
          <View style={styles.pageTwo}>
            <View style={styles.editText}>
              <Text style={styles.editTitleOnboard}>Profile Page</Text>
            </View>
            <View style={styles.editText}>
              <Text style={styles.editTextOnboard}>
                Use edit button to change profile name, profile picture or story
              </Text>
            </View>
            <View style={styles.profilePictureContainer}>
              <View style={styles.editButton}>
                <Feather name='edit' size={20} color='white' />
              </View>
              <Image
                source={require('../../assets/avatar.jpeg')}
                style={styles.profilePicture}
              />
            </View>
            <View style={styles.usernameStyling}>
              <Text style={styles.username}>Anna</Text>
            </View>
            <View style={styles.storyContainer}>
              <Text style={styles.storyPrompt}>
                You can share your MS journey here or write a little about
                yourself if you prefer!
              </Text>
              <Text style={styles.story}>
                My name is Anna and I was first diagnosed when I was 28 years
                old. It has been quite a journey and I would really like to
                meet/hear from others with MS near Omagh where I live.
              </Text>
            </View>
            <View style={styles.profileTab}>
              <FontAwesome name='user-circle' size={25} color={'#17b4ac'} />
            </View>
            <Text style={styles.selectedProfileTab}>Profile</Text>
            <View style={styles.discussionTab}>
              <MaterialCommunityIcons
                name={'chat-plus-outline'}
                size={25}
                color={'black'}
              />
            </View>
            <Text style={styles.discussionTabunselected}>Discussion</Text>
            <View style={styles.FeedTab}>
              <Entypo name={'text-document'} size={25} color={'black'} />
            </View>
            <Text style={styles.feedTabunselected}>Live Feed</Text>
            <View style={styles.button}>
              <View style={styles.previous}>
                <Button title='Previous' onPress={() => handlePageChange(0)} />
              </View>
              <View style={styles.next}>
                <Button title='Next' onPress={() => handlePageChange(2)} />
              </View>
            </View>
          </View>
        </View>
        <View key='3'>
          <View style={styles.pageThree}>
            <Text style={styles.discussionExplanation}>
              Use the discussion tab to explore topics and questions within the
              app, make comments and view other's comments.
            </Text>
            <View style={styles.discussionExample}>
              <Text style={styles.discussionExampleText}>
                Pilates: What has been your experience and have you found it to
                be beneficial?
              </Text>
            </View>
            <Text style={styles.viewComments}> View comments</Text>
            <View style={styles.profileTab}>
              <FontAwesome name='user-circle' size={25} color={'black'} />
            </View>
            <Text style={styles.unselectedProfileTab}>Profile</Text>
            <View style={styles.discussionTab}>
              <MaterialCommunityIcons
                name={'chat-plus-outline'}
                size={25}
                color={'#17b4ac'}
              />
            </View>
            <Text style={styles.discussionTabselected}>Discussion</Text>
            <View style={styles.FeedTab}>
              <Entypo name={'text-document'} size={25} color={'black'} />
            </View>
            <Text style={styles.feedTabunselected}>Live Feed</Text>
            <View style={styles.button}>
              <View style={styles.previous}>
                <Button title='Previous' onPress={() => handlePageChange(1)} />
              </View>
              <View style={styles.next}>
                <Button title='Next' onPress={() => handlePageChange(3)} />
              </View>
            </View>
          </View>
        </View>
        <View key='4'>
          <View style={styles.pageFour}>
            <Text style={styles.liveFeedExplanation}>
              Use the live feed tab to see what other users in the community
              have been up to! You can post you own updates, polls and photos,
              whilst also commenting and reacting on others.
            </Text>
            <View style={styles.userPost}>
              <View style={styles.examplePost}>
              <Text style={styles.userNameFeed}>Anna</Text>
              <Text style={styles.userNamePost}>
                I am changing to a new treatment next week and I am a bit
                nervous. Has anyone tried Fingolimod?
              </Text>
              </View>
              <Text style={styles.userNameFeed}>Nuala</Text>
              <Text style={styles.userNameText}>
                Yes! I am on it and so far so good- it has been really great
                just having to take one tablet daily. What where you on before?
              </Text>
              <Text style={styles.userNameFeed}>Barry</Text>
              <Text style={styles.userNameText}>
                I was but then I had to change to something stronger- liked it though!
              </Text>
              <Text style={styles.addCommentText}>
                Add a comment...
              </Text>
            </View>
            <View style={styles.profileTab}>
              <FontAwesome name='user-circle' size={25} color={'black'} />
            </View>
            <Text style={styles.unselectedProfileTab}>Profile</Text>
            <View style={styles.discussionTab}>
              <MaterialCommunityIcons
                name={'chat-plus-outline'}
                size={25}
                color={'black'}
              />
            </View>
            <Text style={styles.discussionTabunselected}>Discussion</Text>
            <View style={styles.FeedTab}>
              <Entypo name={'text-document'} size={25} color={'#17b4ac'} />
            </View>
            <Text style={styles.feedTabselected}>Live Feed</Text>
            <View style={styles.button}>
              <View style={styles.previous}>
                <Button title='Previous' onPress={() => handlePageChange(2)} />
              </View>
              <View style={styles.next}>
                <Button
                  title='Finish'
                  onPress={() => {
                    onComplete()
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <Button
          title='Get Started'
          onPress={() => {
            onComplete()
          }}
        />
      </ViewPager>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
  pageOne: {
    flex: 1,
    backgroundColor: '#b8f2ef',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
  },
  pageTwo: {
    marginTop: 100,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageThree: {
    marginTop: 100,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageFour: {
    marginTop: 100,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'navy',
    fontSize: 24,
    padding: 10,
  },
  pageText: {
    color: 'navy',
    padding: 20,
    lineHeight: 30,
    fontSize: 18,
    marginTop: 100,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 0,
  },
  profilePictureContainer: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 350,
  },
  profilePicture: {
    width: 140,
    height: 130,
    borderRadius: 70,
    marginTop: -40,
  },
  editButton: {
    marginLeft: 260,
    backgroundColor: 'deepskyblue',
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  editTitleOnboard: {
    fontSize: 20,
  },
  editTextOnboard: {
    marginTop: -20,
    marginBottom: 20,
    marginLeft: 260,
    color: 'deepskyblue',
  },
  usernameStyling: {
    marginTop: -330,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'deepskyblue',
  },
  storyContainer: {
    width: 350,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    marginTop: 30,
  },
  storyPrompt: {
    padding: 20,
    color: 'deepskyblue',
    fontSize: 17,
    justifyContent: 'center',
  },
  story: {
    fontSize: 17,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
  },
  button: {
    marginTop: 30,
    flexDirection: 'row',
  },
  next: {
    marginLeft: 170,
  },
  profileTab: {
    marginRight: 270,
    marginTop: 50,
  },
  selectedProfileTab: {
    color: '#17b4ac',
    marginRight: 265,
    marginTop: 7,
  },
  unselectedProfileTab: {
    color: 'black',
    marginRight: 265,
    marginTop: 7,
  },
  discussionTab: {
    marginTop: -50,
  },
  discussionTabunselected: {
    marginTop: 7,
  },
  discussionTabselected: {
    marginTop: 7,
    color: '#17b4ac',
  },
  FeedTab: {
    marginTop: -50,
    marginRight: -265,
  },
  feedTabunselected: {
    marginRight: -265,
    marginTop: 7,
  },
  feedTabselected: {
    marginRight: -265,
    marginTop: 7,
    color: '#17b4ac',
  },
  discussionExplanation: {
    margin: 25,
    lineHeight: 25,
    color: 'black',
    fontSize: 16,
  },
  discussionExample: {
    backgroundColor: '#e8d9f2',
    margin: 20,
    marginTop: 40,
    borderRadius: 10,
  },
  discussionExampleText: {
    fontSize: 20,
    lineHeight: 25,
    padding: 50,
    color: '#7770c8',
  },
  viewComments: {
    marginLeft: -220,
    marginTop: 17,
    fontSize: 17,
    color: 'deepskyblue',
  },
  liveFeedExplanation: {
    margin: 25,
    marginTop: -15,
    lineHeight: 25,
    color: 'blue',
    fontSize: 16,
  },
  userNameFeed: {
    color: 'deepskyblue',
    fontSize: 17,
    margin: 15,
  },
  userNamePost: {
    margin: 15,
    marginTop: -10,
    fontSize: 17,
    lineHeight: 25,
  },
  examplePost: {
    borderBottomWidth: 0.5,
    borderColor: '#afbebf',
  },
  userNameText: {
    margin: 15,
    marginTop: 1,
    fontSize: 17,
    lineHeight: 25,
  },
  addCommentText: {
    margin: 15,
    marginBottom: -10,
    marginTop: 1,
    fontSize: 17,
    lineHeight: 25,
    borderWidth: 1,
    borderColor:'grey',
    color: 'grey',
    padding: 10,
    borderRadius:5,
  } 
})

export default Onboarding
