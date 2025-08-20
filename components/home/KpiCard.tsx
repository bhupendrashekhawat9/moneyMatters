import { ThemeType } from '@/constants/theme';
import useTheme from '@/hooks/useTheme';
import { formatCurrency } from '@/utils/functions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type KpiCardProps = {
  onPress: () => void;
  data: {
    // Define the structure of the data prop
    title: string;
    value: number | string;
    size: string;
    icon: string;
  };
};
const KpiCard = ({ onPress, data }: KpiCardProps) => {
  const { theme } = useTheme()
  const styles = generateStyle(theme); // Assuming ThemeType is defined and provides the theme context
  const calculateWidth = (size: string) => {
    const gp = 5;
    const w = ((parseFloat(size) * 100) - gp);
    return w + "%";
  }
  return (

    <View style={[styles.container, { width: calculateWidth(data.size ?? "1") }]} onTouchEnd={onPress}>
      {/* Assuming data is an array of objects with title, value, and size properties */}
      <View style={styles.cardIconContainer}>
          <MaterialCommunityIcons name={data.icon} size={32} color={theme.colors.primary} />
          </View>
      <View style={styles.cardTextContainer}>

        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.value}>{formatCurrency(parseInt(data.value ?? "0"))}</Text>
      </View>
    </View>


  )
}

export default KpiCard

const generateStyle = (theme: ThemeType) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: theme.colors.layer,
    borderRadius: 8,
    flexGrow: 1
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIconContainer: {
   padding:5
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