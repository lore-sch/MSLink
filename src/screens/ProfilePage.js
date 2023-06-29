//User profile page
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Story from "../components/Story";

//event handlers for editing user name
//TO DO: Set up image selection and user change image ?? image picker
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("Jane Doe");


  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  //username should be  called from database
  const handleCancelEdit = () => {
    setIsEditing(false);
    setUsername("Jane Doe");
  };

  //database needs to update
  const handleChangeUsername = (text) => {
    setUsername(text);
  };

  //conditional rendering- checks if text or textInput
  //conditional rendering- event handlers to display save tick or cancel x, exit edit mode, edit username or story
  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={require("../../assets/avatar.jpeg")}
          style={styles.profilePicture}
        />
      </View>
      {isEditing ? (
        <TextInput
          style={styles.editUsername}
          value={username}
          onChangeText={handleChangeUsername}
        />
      ) : (
        <Text style={styles.username}>{username}</Text>
      )}
      <ScrollView
        style={styles.storyContainer}
        contentContainerStyle={styles.storyContent}
      >
        <Story isEditing={isEditing} />
      </ScrollView>

      {isEditing ? (
        <View style={styles.editButtonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleSaveProfile}
          >
            <Feather name="check" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleCancelEdit}
          >
            <Feather name="x" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.editButtonProfile}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Feather name="edit" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePictureContainer: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 150,
  },
  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "deepskyblue",
  },
  editUsername: {
    fontSize: 24,
    fontWeight: "bold",
    color: "deepskyblue",
    marginBottom: 10,
  },
  storyContainer: {
    width: 380,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: 20,
  },
  storyContent: {
    paddingTop: 10,
    paddingBottom: 10
  },
  editButtonsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  editButton: {
    marginLeft: 10,
    backgroundColor: "deepskyblue",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonProfile: {
    flexDirection: "row",
    position: "absolute",
    top: 50,
    right: 20,
  },
});

export default ProfilePage;
