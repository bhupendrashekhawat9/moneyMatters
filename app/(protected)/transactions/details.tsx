import { expenseServices } from '@/api/service';
import AppButton from '@/components/AppButton';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailsScreen = () => {
  const params = useLocalSearchParams<{ data: string }>();
  const data = JSON.parse(params.data);
  console.log(data)
  const handleDelete = () => {
    expenseServices.delete(data.id)
    router.back()
  }
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>{data.category}</Text>
      <Text>{data.description}</Text>
      <Text>{data.amount}</Text>
      <Text>{data.date}</Text>
      <Text>{new Date(data.expenseDate).toLocaleDateString()}</Text>
      <AppButton title='Delete' onPress={handleDelete}/>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({})