import { ThemeType } from '@/constants/theme';
import useTheme from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type KpiCardProps = {
  onPress: () => void;
  data: {
    // Define the structure of the data prop
    title: string;
    value: number | string;
    size: number;

  }; 
};
const KpiCard = ({onPress, data}: KpiCardProps) => {
    const {theme} = useTheme()
    const styles = generateStyle(theme); // Assuming ThemeType is defined and provides the theme context
  return (
  
        <View style={[styles.container,{width: data.size}]} onTouchEnd={onPress}>
          {/* Assuming data is an array of objects with title, value, and size properties */}
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.value}>{data.value}</Text>
          
        </View>
  
    
  )
}

export default KpiCard

const generateStyle = (theme:ThemeType) => StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        padding: 16,
        backgroundColor: theme.colors.layer,
        borderRadius: 8,

      
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    value: {
        fontSize: 24,
        color: theme.colors.text,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: theme.colors.text,
    },
})