//component to handle route depending on whether it is ios or android
import * as Device from 'expo-device'

const ApiUtility = () => {
  let apiUrl = 'http://localhost:3000' // Default API URL for iOS

  if (Device.OS === 'android') {
    apiUrl = 'http://10.0.2.2:3000' // Override API URL for Android
  }

  return apiUrl
}
export default ApiUtility
