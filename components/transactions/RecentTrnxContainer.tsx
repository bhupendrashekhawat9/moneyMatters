import React from 'react';
import { FlatList } from 'react-native';
import TransactionCard from './TransactionCard';

type Transaction = {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
};
type RecentTrnxContainerProps = {
  transactions: Transaction[];
  onTransactionPress: (transaction: Transaction) => void;
};
const RecentTrnxContainer = ({
    transactions = [],
    onTransactionPress,
}: RecentTrnxContainerProps) => {

  return (
   
       <FlatList
        style={{width:"100%", height: '100%'}}
       data={transactions}
       renderItem={({ item }) => <TransactionCard transaction={item} onPress={onTransactionPress} />}
       keyExtractor={(item) => item.id}
       />
     
  )
}

export default RecentTrnxContainer
