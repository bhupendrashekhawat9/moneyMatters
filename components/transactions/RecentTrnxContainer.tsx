import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import TransactionCard from './TransactionCard';

type Transaction = {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  createdAt: string;
};
type RecentTrnxContainerProps = {
  transactions: Transaction[];
  onTransactionPress: (transaction: Transaction) => void;
  onRefresh: () => Promise<void>;
};
const RecentTrnxContainer = ({
    transactions = [],
    onTransactionPress,
    onRefresh
}: RecentTrnxContainerProps) => {

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefreshHandler = React.useCallback(async() => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  }, []);
  return (
   
       <FlatList
       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
        style={{width:"100%", height: '100%'}}
       data={transactions}
       renderItem={({ item }) => <TransactionCard transaction={item} onPress={onTransactionPress} />}
       keyExtractor={(item) => item.id}
       />
     
  )
}

export default RecentTrnxContainer
