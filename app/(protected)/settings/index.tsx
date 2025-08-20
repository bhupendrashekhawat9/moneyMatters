import useSettings from '@/modules/settings/hooks/useSettings'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'

const index = () => {
  const {settingsList} = useSettings()
  return (
    <SafeAreaView style={styles.container}>
      {settingsList.map((item,index)=>(
        <TouchableOpacity key={index} onPress={item.onPress}>
          <Text style={styles.item}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    item:{
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    }
})