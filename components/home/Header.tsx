import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
const Header = ({onChange}: {onChange: (date: Date) => void}) => {
    const onFilterChange = (date: Date) => {
      
        onChange(date)
    }
  return (
    <View style={styles.container}>

    <View style={styles.filterContainer}>
        <Text style={styles.filterText}>February 2025</Text> 
        {/* <HeaderFilter onChange={onFilterChange}/> */}
    </View>
    <View style={styles.headerTextContainer}>
      <Text style={styles.headerText}>Good Evening</Text>
      <Text style={styles.userNameText}>Bhupendra Singh</Text>
    </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    headerTextContainer:{
       
        alignItems: "center",
        gap: 2,
        marginBottom:20
    },
    headerText:{
        fontSize: 32,
        fontWeight: "bold"
    },
    userNameText:{
        fontSize: 20,
        fontWeight: "bold"
    },
    filterText:{
        fontSize: 16,
        fontWeight: "bold"
    },
    filterIcon:{
        
    }
})