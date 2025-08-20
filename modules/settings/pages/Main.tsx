
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Main = () => {
    const settingsList = [
        {
            title: "Profile",
            icon: "account",
            screen: "profile"
        },
        {
            title: "Notifications",
            icon: "bell",
            screen: "notifications"
        },
        {
            title: "Privacy",
            icon: "lock",
            screen: "privacy"
        },
        {
            title: "Help",
            icon: "help",
            screen: "help"
        },
        {
            title: "Logout",
            icon: "logout",
            screen: "logout"
        }
    ]
  return (
    <View>
      <Text>Main</Text>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({})