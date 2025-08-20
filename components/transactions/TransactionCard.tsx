import { ThemeType } from '@/constants/theme';
import useTheme from '@/hooks/useTheme';
import { ExpenseType } from '@/types';
import { formatCurrency } from '@/utils/functions';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type TransactionCardProps = {
  transaction: {
    title: string;
    description: string;
    amount: number;
    icon: string;
    id: string;
  };
  onPress: (transaction: ExpenseType) => void;
};
const TransactionCard = ({
    transaction,
    onPress,
}: TransactionCardProps) => {
    const { theme } = useTheme();
    const styles = generateStyles(theme);
    const { category, description, amount } = transaction;
    const handleOnPress = () => {
        onPress(transaction );
    };

  return (
    <Pressable onPress={handleOnPress} style={styles.card}>
        <View style={styles.cardIconBox}>
           <MaterialCommunityIcons name={transaction.icon} size={32} color={theme.colors.primary} />
        </View>
        <View style={styles.cardTextContainer}>
      <Text style={styles.titleText}>{category}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <View style={styles.amountContainer}>

        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{formatCurrency(parseInt(amount))}</Text>
        </View>
        <View >
          <Text>{new Date(transaction.date).toLocaleDateString()}</Text>
        </View>
        </View>
    
    </Pressable>
  )
}

export default TransactionCard

const generateStyles = (theme: ThemeType) => StyleSheet.create({
    card: {
        padding: 16,
        backgroundColor: theme.colors.layer,
        borderRadius: 8,
        elevation: 1,
        marginBottom: 12,
        flexDirection: 'row',
    },
    cardIconBox: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        backgroundColor: theme.colors.background,
        borderRadius: 20
    },
    cardIcon: {
        width: 40,
        height: 40,

    },
    cardTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start', 
      
    },
    amountContainer: {
     
        alignItems: 'flex-end',
        justifyContent: 'center',
        
       
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    descriptionText: {
        color: theme.colors.text,
    },
    amountText: {
        color: theme.colors.text,
        fontWeight: '600',
    },
    dateText: {
        color: theme.colors.text,
        fontWeight: '600',
    },
 
})