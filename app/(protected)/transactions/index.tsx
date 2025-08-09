import RecentTrnxContainer from '@/components/transactions/RecentTrnxContainer';
import TransactionFilter from '@/components/transactions/transactionFilter';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const transactions = [
  { id: '1', title: 'Groceries', description: 'Weekly grocery shopping', amount: 50.00, date: '2023-10-01' },
  { id: '2', title: 'Utilities', description: 'Electricity bill payment', amount: 75.00, date: '2023-10-02' },
  { id: '3', title: 'Dining Out', description: 'Dinner at restaurant', amount: 30.00, date: '2023-10-03' },
  { id: '4', title: 'Transport', description: 'Monthly bus pass', amount: 40.00, date: '2023-10-04' },
 { id: '5', title: 'Groceries', description: 'Weekly grocery shopping', amount: 50000000.00, date: '2023-10-01' },
  { id: '6', title: 'Utilities', description: 'Electricity bill payment', amount: 75.00, date: '2023-10-02' },
  { id: '7', title: 'Dining Out', description: 'Dinner at restaurant', amount: 30.00, date: '2023-10-03' },
  { id: '8', title: 'Transport', description: 'Monthly bus pass', amount: 40.00, date: '2023-10-04' },
   { id: '9', title: 'Groceries', description: 'Weekly grocery shopping', amount: 50.00, date: '2023-10-01' },
  { id: '10', title: 'Utilities', description: 'Electricity bill payment', amount: 75.00, date: '2023-10-02' },
  { id: '11', title: 'Dining Out', description: 'Dinner at restaurant', amount: 30.00, date: '2023-10-03' },
  { id: '12', title: 'Transport', description: 'Monthly bus pass', amount: 40.00, date: '2023-10-04' },
];
const TransactionsScreen = () => {
  const [filteredTrnx, setFilteredTrnx] = useState(() => transactions);
  const onTransactionPress = (transaction: any) => {
    router.push(`/transactions/details`, {
      params: { transactionId: transaction.id },
    } as any);
  };
  const onFilterChange = (newFilter: any) => {
    setFilteredTrnx(newFilter);
  };
  return (
    <View style={styles.container}>
      <TransactionFilter transactions={transactions} onFilterChange={onFilterChange} />
      <RecentTrnxContainer onTransactionPress={onTransactionPress} transactions={filteredTrnx} />
    </View>
  )
}

export default TransactionsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        padding:10
    },
})