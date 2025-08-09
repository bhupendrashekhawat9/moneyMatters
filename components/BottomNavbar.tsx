// components/CustomBottomNav.tsx
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TABS = [
  { name: 'Home', route: '/(tabs)/home', icon: 'home-outline' },
  { name: 'Transactions', route: '/(tabs)/transactions', icon: 'list-outline' },
  { name: 'Budget', route: '/(tabs)/budget', icon: 'wallet-outline' },
];

export default function CustomBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.navContainer}>
      {TABS.map(tab => {
        const isActive = pathname === tab.route;

        return (
          <TouchableOpacity
            key={tab.route}
            onPress={() => router.push(tab.route)}
            style={styles.tab}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={isActive ? '#007aff' : '#aaa'}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tab: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  activeLabel: {
    color: '#007aff',
    fontWeight: 'bold',
  },
});
