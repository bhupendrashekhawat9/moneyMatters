import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const Layout = () => {
    return <Stack>
        <Stack.Screen name="index" options={{ title: 'Transactions' }} />
        <Stack.Screen  name="details" options={{ title: 'Details' }} />
    </Stack>
}

export default Layout

const styles = StyleSheet.create({})