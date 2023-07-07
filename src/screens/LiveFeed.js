import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const LiveFeed = () => {
  const handleButtonPress = () => {
    // Handle button press action here
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusInputContainer}>
        <TextInput
          style={styles.statusInput}
          placeholder="Share with us..."
          multiline={true}
        />
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Status</Text>
        <Ionicons name="chatbox-outline" size={20} color="deepskyblue" />
        <Text style={styles.optionText}>Photo</Text>
        <FontAwesome name="photo" size={20} color="deepskyblue" />
        <Text style={styles.optionText}>Poll</Text>
        <AntDesign name="barschart" size={20} color="deepskyblue" />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusInputContainer: {
    marginTop: 30,
    width: 350,
    borderBottomWidth: 0.5,
    borderColor: '#afbebf',
  },
  statusInput: {
    marginBottom: 15,
    lineHeight: 24,
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 10,
    marginTop: 5,
  },
  optionText: {
    paddingHorizontal: 20,
    color: 'deepskyblue',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'deepskyblue',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LiveFeed;
