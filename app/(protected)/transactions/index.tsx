import { expenseServices } from '@/api/service';
import AppButton from '@/components/AppButton';
import RecentTrnxContainer from '@/components/transactions/RecentTrnxContainer';
import TransactionFilter from '@/components/transactions/transactionFilter';
import { ExpenseType } from '@/types';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useTransactions from './useTransactions';


const TransactionsScreen = () => {
  const {transactions,refresh}= useTransactions()
  const [filteredTrnx, setFilteredTrnx] = useState<ExpenseType[]>(() => transactions);
  const onTransactionPress = (transaction: any) => {
    router.push({
      pathname:`/transactions/details`,
      params: { data: JSON.stringify(transaction) },
    });
  };
  const onFilterChange = (newFilter: any) => {
    setFilteredTrnx(newFilter);
  };
useEffect(() => {
    setFilteredTrnx(transactions)
}, [transactions])
  return (
    <View style={styles.container}>
      <TransactionFilter transactions={transactions} onFilterChange={onFilterChange} />
      <RecentTrnxContainer onRefresh={refresh} onTransactionPress={onTransactionPress} transactions={filteredTrnx} />
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