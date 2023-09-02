import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from 'react-native'
import axios from 'axios'
import { AuthContext } from '../components/AuthContext'
import ModalDropdown from 'react-native-modal-dropdown'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const SquareButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

const Report = () => {
  const [reportText, setReportText] = useState('')
  const { userId } = useContext(AuthContext)
  const [reportCategories, setReportCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [ReportSubmitted, setReportSubmitted] = useState(false)
  const navigation = useNavigation()

  //Fetches report categories for dropdown menu
  const fetchReportCategories = async () => {
    let apiUrl = 'http://localhost:3000/reportCategory' // Default API URL for iOS

    if (Platform.OS === 'android') {
      apiUrl = 'http://10.0.2.2:3000/reportCategory' // Override API URL for Android
    }
    try {
      const response = await axios.get(apiUrl)

      const categoryData = response.data
      setReportCategories(categoryData)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchReportCategories()
  }, [])

  //handles when cancel button pressed, navigates to previous screen
  const handleCancel = () => {
    navigation.goBack()
  }

  //post report
  const handlePostReport = async () => {
    try {
      // Determine the API URL based on the platform (Android or iOS)
      let apiUrl = 'http://localhost:3000' // Default API URL for iOS
      if (Platform.OS === 'android') {
        apiUrl = 'http://10.0.2.2:3000' // Override API URL for Android
      }
      const response = await axios.post(`${apiUrl}/Report`, {
        reportText: reportText,
        user_id: userId,
        report_category_id: selectedCategoryId,
      })
      const reportData = response.data
      setReportSubmitted(true)
    } catch (error) {
      console.error('Error submitting report:', error)
    }
  }
  //styling for the rows in the dropdown menu
  const renderDropdownRow = (rowData, rowID, highlighted) => {
    return (
      <View
        style={[styles.dropdownRow, highlighted && styles.dropdownHighlight]}
      >
        <Text style={styles.dropdownText}>{rowData}</Text>
      </View>
    )
  }

  return (
    <View style={styles.reportContainer}>
      <Text style={styles.reportPrompt}>Please choose a category: </Text>
      <ModalDropdown
        options={reportCategories.map((category) => category.report_category)}
        defaultValue='Select one option:'
        onSelect={(index, value) => {
          setSelectedCategory(value)
          setSelectedCategoryId(reportCategories[index].report_category_id)
        }}
        style={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdown}
        renderRow={renderDropdownRow}
      />
      <Text style={styles.reportTextPrompt}>Please detail your concerns: </Text>

      <TextInput
        style={styles.textInput}
        value={reportText}
        onChangeText={setReportText}
      />

      <View style={styles.buttonContainer}>
        <SquareButton
          title='Report'
          onPress={() => handlePostReport(userId, selectedCategoryId)}
        />
        <SquareButton title='Cancel' onPress={handleCancel} />
      </View>
      <Modal visible={ReportSubmitted} transparent={true} animationType='slide'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Feather name='check' size={40} color='blue' />
            <Text style={styles.popupTextThankYou}>
              Thank you for submitting your report.
              </Text>
              <Text style={styles.popupText}>
                Our team will look into this matter as soon as possible.
              </Text>
            <TouchableOpacity
              onPress={() => {
                setReportSubmitted(false) // Close the pop-up
                navigation.goBack() // Go back to the previous screen
              }}
            >
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reportContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 70,
  },
  reportPrompt: {
    fontSize: 18,
    color: 'deepskyblue',
    paddingBottom: 30,
  },
  dropdownContainer: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: 'black',
  },
  dropdown: {
    width: 260,
    marginTop: 11,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  reportTextPrompt: {
    fontSize: 18,
    color: 'deepskyblue',
    paddingTop: 50,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    width: '80%',
    padding: 10,
    margin: 20,
    lineHeight: 20,
    writingDirection: 'ltr',
    fontSize: 18,
    backgroundColor: 'white'
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
  dropdownRow: {
    padding: 10,
  },
  dropdownHighlight: {
    backgroundColor: 'lightgray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 35,
    borderRadius: 6,
    width: '80%',
    alignItems: 'center',
  },
  popupText: {
    fontSize: 16,
    lineHeight: 30,
    paddingTop: 20,

  },
  popupTextThankYou: {
    fontSize: 16, 
    lineHeight: 30,
    paddingTop: 20,
    color: 'blue',
  },
  closeButton: {
    color: 'blue',
    marginTop: 20,
    fontSize: 16, 
  },
})
export default Report
