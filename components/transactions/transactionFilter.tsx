import { ThemeType } from '@/constants/theme';
import useTheme from '@/hooks/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export type Transaction = {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  category?: string;
  icon?: string;
};

export type FilterOptions = {
  searchQuery: string;
  categories: string[];
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  amountRange: {
    min: number | null;
    max: number | null;
  };
};

type TransactionFilterProps = {
  transactions: Transaction[];
  onFilterChange: (filteredTransactions: Transaction[]) => void;
  availableCategories?: string[];
};

const DEFAULT_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Income',
  'Other',
];

const TransactionFilter = ({
  transactions,
  onFilterChange,
  availableCategories = DEFAULT_CATEGORIES,
}: TransactionFilterProps) => {
  const { theme } = useTheme();
  const styles = generateStyles(theme);

  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    categories: [],
    dateRange: { startDate: null, endDate: null },
    amountRange: { min: null, max: null },
  });

  const [showFilters, setShowFilters] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<'start' | 'end' | null>(null);

  const applyFilters = (newFilters: FilterOptions) => {
    let filtered = [...transactions];

    // Global search filter
    if (newFilters.searchQuery.trim()) {
      const query = newFilters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(transaction =>
        transaction.title.toLowerCase().includes(query) ||
        transaction.description.toLowerCase().includes(query) ||
        transaction.amount.toString().includes(query) ||
        (transaction.category?.toLowerCase().includes(query)) ||
        transaction.date.includes(query)
      );
    }

    // Category filter
    if (newFilters.categories.length > 0) {
      filtered = filtered.filter(transaction =>
        newFilters.categories.includes(transaction.category || 'Other')
      );
    }

    // Date range filter
    if (newFilters.dateRange.startDate) {
      filtered = filtered.filter(transaction =>
        new Date(transaction.date) >= new Date(newFilters.dateRange.startDate!)
      );
    }
    if (newFilters.dateRange.endDate) {
      filtered = filtered.filter(transaction =>
        new Date(transaction.date) <= new Date(newFilters.dateRange.endDate!)
      );
    }

    // Amount range filter
    if (newFilters.amountRange.min !== null) {
      filtered = filtered.filter(transaction =>
        Math.abs(transaction.amount) >= newFilters.amountRange.min!
      );
    }
    if (newFilters.amountRange.max !== null) {
      filtered = filtered.filter(transaction =>
        Math.abs(transaction.amount) <= newFilters.amountRange.max!
      );
    }

    onFilterChange(filtered);
  };

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterOptions = {
      searchQuery: '',
      categories: [],
      dateRange: { startDate: null, endDate: null },
      amountRange: { min: null, max: null },
    };
    setFilters(clearedFilters);
    onFilterChange(transactions);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(cat => cat !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.searchQuery.trim()) count++;
    if (filters.categories.length > 0) count++;
    if (filters.dateRange.startDate || filters.dateRange.endDate) count++;
    if (filters.amountRange.min !== null || filters.amountRange.max !== null) count++;
    return count;
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons 
          name="magnify" 
          size={20} 
          color={theme.colors.text} 
          style={styles.searchIcon} 
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          placeholderTextColor={theme.colors.text + '80'}
          value={filters.searchQuery}
          onChangeText={(text) => updateFilters({ searchQuery: text })}
        />
        {filters.searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => updateFilters({ searchQuery: '' })}>
            <MaterialCommunityIcons 
              name="close-circle" 
              size={20} 
              color={theme.colors.text} 
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Toggle Button */}
      <View style={styles.filterButtonContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <MaterialCommunityIcons 
            name="filter-variant" 
            size={20} 
            color={theme.colors.primary} 
          />
          <Text style={styles.filterButtonText}>
            Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          </Text>
          <MaterialCommunityIcons 
            name={showFilters ? "chevron-up" : "chevron-down"} 
            size={20} 
            color={theme.colors.primary} 
          />
        </TouchableOpacity>
        
        {getActiveFilterCount() > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearAllFilters}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <View style={styles.filtersPanel}>
          <ScrollView showsVerticalScrollIndicator={false}>
            
            {/* Categories */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Categories</Text>
              <View style={styles.categoriesGrid}>
                {availableCategories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      filters.categories.includes(category) && styles.categoryChipActive
                    ]}
                    onPress={() => toggleCategory(category)}
                  >
                    <Text style={[
                      styles.categoryChipText,
                      filters.categories.includes(category) && styles.categoryChipTextActive
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Date Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Date Range</Text>
              <View style={styles.dateRangeContainer}>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowDatePicker('start')}
                >
                  <Text style={filters.dateRange.startDate ? styles.dateText : styles.datePlaceholder}>
                    {filters.dateRange.startDate 
                      ? new Date(filters.dateRange.startDate).toLocaleDateString()
                      : 'Start Date'
                    }
                  </Text>
                  <MaterialCommunityIcons name="calendar" size={20} color={theme.colors.text} />
                </TouchableOpacity>
                
                <Text style={styles.dateRangeSeparator}>to</Text>
                
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowDatePicker('end')}
                >
                  <Text style={filters.dateRange.endDate ? styles.dateText : styles.datePlaceholder}>
                    {filters.dateRange.endDate 
                      ? new Date(filters.dateRange.endDate).toLocaleDateString()
                      : 'End Date'
                    }
                  </Text>
                  <MaterialCommunityIcons name="calendar" size={20} color={theme.colors.text} />
                </TouchableOpacity>
              </View>
              
              {(filters.dateRange.startDate || filters.dateRange.endDate) && (
                <TouchableOpacity
                  style={styles.clearDateButton}
                  onPress={() => updateFilters({ 
                    dateRange: { startDate: null, endDate: null } 
                  })}
                >
                  <Text style={styles.clearDateButtonText}>Clear Date Range</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Amount Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Amount Range ($)</Text>
              <View style={styles.amountRangeContainer}>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Min"
                  placeholderTextColor={theme.colors.text + '80'}
                  value={filters.amountRange.min?.toString() || ''}
                  onChangeText={(text) => {
                    const value = parseFloat(text) || null;
                    updateFilters({ 
                      amountRange: { ...filters.amountRange, min: value } 
                    });
                  }}
                  keyboardType="numeric"
                />
                
                <Text style={styles.amountRangeSeparator}>to</Text>
                
                <TextInput
                  style={styles.amountInput}
                  placeholder="Max"
                  placeholderTextColor={theme.colors.text + '80'}
                  value={filters.amountRange.max?.toString() || ''}
                  onChangeText={(text) => {
                    const value = parseFloat(text) || null;
                    updateFilters({ 
                      amountRange: { ...filters.amountRange, max: value } 
                    });
                  }}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Simple Date Picker Modal */}
      <Modal
        visible={showDatePicker !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDatePicker(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowDatePicker(null)}>
          <View style={styles.datePickerContainer}>
            <Text style={styles.datePickerTitle}>
              Select {showDatePicker === 'start' ? 'Start' : 'End'} Date
            </Text>
            <TextInput
              style={styles.datePickerInput}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={theme.colors.text + '80'}
              onChangeText={(text) => {
                if (text.match(/^\d{4}-\d{2}-\d{2}$/)) {
                  const field = showDatePicker === 'start' ? 'startDate' : 'endDate';
                  updateFilters({
                    dateRange: { ...filters.dateRange, [field]: text }
                  });
                  setShowDatePicker(null);
                }
              }}
            />
            <TouchableOpacity
              style={styles.datePickerCloseButton}
              onPress={() => setShowDatePicker(null)}
            >
              <Text style={styles.datePickerCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const generateStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.layer,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
  },
  filterButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.layer,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 1,
  },
  filterButtonText: {
    color: theme.colors.primary,
    marginHorizontal: 8,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  filtersPanel: {
    backgroundColor: theme.colors.layer,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    maxHeight: 400,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryChipText: {
    color: theme.colors.text,
    fontSize: 12,
  },
  categoryChipTextActive: {
    color: 'white',
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  dateText: {
    color: theme.colors.text,
    fontSize: 14,
  },
  datePlaceholder: {
    color: theme.colors.text + '80',
    fontSize: 14,
  },
  dateRangeSeparator: {
    color: theme.colors.text,
    fontSize: 12,
  },
  clearDateButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  clearDateButtonText: {
    color: theme.colors.error,
    fontSize: 12,
    fontWeight: '600',
  },
  amountRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amountInput: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text,
    textAlign: 'center',
  },
  amountRangeSeparator: {
    color: theme.colors.text,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerContainer: {
    backgroundColor: theme.colors.layer,
    borderRadius: 12,
    padding: 20,
    width: 280,
    elevation: 5,
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  datePickerInput: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: theme.colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  datePickerCloseButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  datePickerCloseButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default TransactionFilter;