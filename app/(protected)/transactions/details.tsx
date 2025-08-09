import { useLocalSearchParams } from 'expo-router/build/hooks';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailsScreen = () => {
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();
  return (
    <View>
      <Text>Transaction ID: {transactionId}</Text>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({})