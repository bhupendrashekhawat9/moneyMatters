import { ThemeType } from '@/constants/theme';
import useTheme from '@/hooks/useTheme';
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
  onPress: () => void;
};
const TransactionCard = ({
    transaction,
    onPress,
}: TransactionCardProps) => {
    const { theme } = useTheme();
    const styles = generateStyles(theme);
    const { title, description, amount } = transaction;
    const handleOnPress = () => {
        onPress(transaction );
    };
  return (
    <Pressable onPress={handleOnPress} style={styles.card}>
        <View style={styles.cardIconBox}>
           <MaterialCommunityIcons name={transaction.icon??"receipt"} size={32} color={theme.colors.primary} />
        </View>
        <View style={styles.cardTextContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
      </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>${amount.toFixed(2)}</Text>
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
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        
       
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
})