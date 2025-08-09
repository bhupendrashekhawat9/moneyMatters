import { ThemeType } from '@/constants/theme';
import useTheme from '@/hooks/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Generic option type
export interface SelectOption<T = any> {
  id: string | number;
  label: string;
  value: T;
  disabled?: boolean;
  icon?: string;
  color?: string;
  subtitle?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

// Selection modes
export type SelectionMode = 'single' | 'multiple';

// Props interface
export interface SelectInputProps<T = any> {
  // Core props
  value?: string | number | (string | number)[];
  options: SelectOption<T>[];
  onChange: (value: T | T[], selectedOptions?: SelectOption<T> | SelectOption<T>[]) => void;
  
  // Appearance
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  
  // Behavior
  mode?: SelectionMode;
  searchable?: boolean;
  clearable?: boolean;
  closeOnSelect?: boolean;
  
  // Customization
  renderOption?: (option: SelectOption<T>, isSelected: boolean) => React.ReactNode;
  renderSelected?: (option: SelectOption<T>) => React.ReactNode;
  maxHeight?: number;
  
  // Styling
  style?: any;
  inputStyle?: any;
  optionStyle?: any;
  
  // Accessibility
  accessibilityLabel?: string;
  testID?: string;
}

const SelectInput = <T,>({
  value,
  options = [],
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  required = false,
  mode = 'single',
  searchable = false,
  clearable = false,
  closeOnSelect = true,
  renderOption,
  renderSelected,
  maxHeight = 300,
  style,
  inputStyle,
  optionStyle,
  accessibilityLabel,
  testID,
}: SelectInputProps<T>) => {
  const { theme } = useTheme();
  const styles = generateStyles(theme);
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Normalize value to array for easier handling
  const normalizedValue = useMemo(() => {
    if (mode === 'single') {
      return value ? [value] : [];
    }
    return Array.isArray(value) ? value : [];
  }, [value, mode]);

  // Get selected options
  const selectedOptions = useMemo(() => {
    return options.filter(option => 
      normalizedValue.includes(option.id)
    );
  }, [options, normalizedValue]);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) {
      return options;
    }
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery, searchable]);

  // Handle option selection
  const handleSelect = (option: SelectOption<T>) => {
    if (option.disabled) return;

    let newValue: any;
    let newSelectedOptions: any;

    if (mode === 'single') {
      newValue = option.value;
      newSelectedOptions = option;
      if (closeOnSelect) {
        setIsOpen(false);
      }
    } else {
      const isSelected = normalizedValue.includes(option.id);
      if (isSelected) {
        newValue = selectedOptions
          .filter(opt => opt.id !== option.id)
          .map(opt => opt.value);
        newSelectedOptions = selectedOptions.filter(opt => opt.id !== option.id);
      } else {
        newValue = [...selectedOptions.map(opt => opt.value), option.value];
        newSelectedOptions = [...selectedOptions, option];
      }
    }

    onChange(newValue, newSelectedOptions);
  };

  // Clear selection
  const handleClear = () => {
    if (mode === 'single') {
      onChange(undefined as any, undefined as any);
    } else {
      onChange([], []);
    }
  };

  // Open/close handlers
  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(true);
      setSearchQuery('');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  // Render selected value display
  const renderSelectedDisplay = () => {
    if (selectedOptions.length === 0) {
      return (
        <Text style={[styles.placeholder, inputStyle]}>
          {placeholder}
        </Text>
      );
    }

    if (mode === 'single') {
      const option = selectedOptions[0];
      if (renderSelected) {
        return renderSelected(option);
      }
      return (
        <View style={styles.selectedSingle}>
          {option.icon && (
            <MaterialCommunityIcons 
              name={option.icon as any} 
              size={20} 
              color={option.color || theme.colors.primary}
              style={styles.selectedIcon}
            />
          )}
          <View style={styles.selectedTextContainer}>
            <Text style={[styles.selectedText, inputStyle]} numberOfLines={1}>
              {option.label}
            </Text>
            {option.subtitle && (
              <Text style={styles.selectedSubtitle} numberOfLines={1}>
                {option.subtitle}
              </Text>
            )}
          </View>
        </View>
      );
    } else {
      // Multiple selection display
      if (selectedOptions.length === 1) {
        return (
          <Text style={[styles.selectedText, inputStyle]}>
            {selectedOptions[0].label}
          </Text>
        );
      }
      return (
        <Text style={[styles.selectedText, inputStyle]}>
          {selectedOptions.length} items selected
        </Text>
      );
    }
  };

  // Render option item
  const renderOptionItem = ({ item }: { item: SelectOption<T> }) => {
    const isSelected = normalizedValue.includes(item.id);
    
    if (renderOption) {
      return (
        <TouchableOpacity
          style={[styles.option, optionStyle, isSelected && styles.optionSelected]}
          onPress={() => handleSelect(item)}
          disabled={item.disabled}
        >
          {renderOption(item, isSelected)}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.option,
          optionStyle,
          isSelected && styles.optionSelected,
          item.disabled && styles.optionDisabled,
        ]}
        onPress={() => handleSelect(item)}
        disabled={item.disabled}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected, disabled: item.disabled }}
      >
        <View style={styles.optionContent}>
          {item.leftComponent}
          
          {item.icon && (
            <MaterialCommunityIcons 
              name={item.icon as any} 
              size={24} 
              color={item.color || theme.colors.primary}
              style={styles.optionIcon}
            />
          )}
          
          <View style={styles.optionTextContainer}>
            <Text style={[
              styles.optionText,
              isSelected && styles.optionTextSelected,
              item.disabled && styles.optionTextDisabled,
            ]}>
              {item.label}
            </Text>
            {item.subtitle && (
              <Text style={[
                styles.optionSubtitle,
                item.disabled && styles.optionTextDisabled,
              ]}>
                {item.subtitle}
              </Text>
            )}
          </View>
          
          {item.rightComponent}
          
          {mode === 'multiple' && (
            <MaterialCommunityIcons 
              name={isSelected ? 'check-circle' : 'circle-outline'} 
              size={20} 
              color={isSelected ? theme.colors.primary : theme.colors.border}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label}{required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      {/* Input Display */}
      <Pressable
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
        onPress={handleOpen}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || `${label || 'Select'} input`}
        accessibilityHint="Tap to open selection options"
        testID={testID}
      >
        <View style={styles.inputContent}>
          {renderSelectedDisplay()}
        </View>
        
        <View style={styles.inputActions}>
          {clearable && selectedOptions.length > 0 && (
            <TouchableOpacity
              onPress={handleClear}
              style={styles.clearButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons 
                name="close-circle" 
                size={20} 
                color={theme.colors.text + '80'}
              />
            </TouchableOpacity>
          )}
          
          <MaterialCommunityIcons 
            name={isOpen ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color={disabled ? theme.colors.border : theme.colors.text}
          />
        </View>
      </Pressable>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Options Modal */}
      <Modal

        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <Pressable style={styles.overlay} onPress={handleClose}>
          <View style={[styles.optionsContainer, { maxHeight }]}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {label || 'Select Option'}
              </Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <MaterialCommunityIcons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            {searchable && (
              <View style={styles.searchContainer}>
                <MaterialCommunityIcons 
                  name="magnify" 
                  size={20} 
                  color={theme.colors.text + '80'}
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search options..."
                  placeholderTextColor={theme.colors.text + '80'}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus={false}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <MaterialCommunityIcons 
                      name="close-circle" 
                      size={20} 
                      color={theme.colors.text + '80'}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Options List */}
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderOptionItem}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={() => (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>
                    {searchQuery ? 'No options found' : 'No options available'}
                  </Text>
                </View>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const generateStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  required: {
    color: theme.colors.error,
  },
  input: {
    backgroundColor: theme.colors.layer,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  inputDisabled: {
    backgroundColor: theme.colors.background,
    opacity: 0.6,
  },
  inputContent: {
    flex: 1,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clearButton: {
    padding: 2,
  },
  placeholder: {
    color: theme.colors.text + '80',
    fontSize: 16,
  },
  selectedSingle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedIcon: {
    marginRight: 12,
  },
  selectedTextContainer: {
    flex: 1,
  },
  selectedText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  selectedSubtitle: {
    color: theme.colors.text + '80',
    fontSize: 12,
    marginTop: 2,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  optionsContainer: {
    backgroundColor: theme.colors.layer,
    borderRadius: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    margin: 16,
    marginBottom: 0,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    paddingVertical: 4,
  },
  optionsList: {
    maxHeight: 300,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  optionSelected: {
    backgroundColor: theme.colors.primary + '15',
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: theme.colors.primary,
  },
  optionTextDisabled: {
    color: theme.colors.text + '50',
  },
  optionSubtitle: {
    fontSize: 12,
    color: theme.colors.text + '80',
    marginTop: 2,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.text + '80',
    fontSize: 16,
  },
});

export default SelectInput;