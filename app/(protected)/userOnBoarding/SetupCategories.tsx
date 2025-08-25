import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from '@/hooks/useTheme';
import { Theme } from '@react-navigation/native';
import useUserStore from '@/store/useUserStore';
import useSetupCategories from '@/hooks/useSetupCategories';

const predefinedCategories = [
  'Technology',
  'Health',
  'Finance',
  'Education',
  'Sports',
  'Entertainment',
];

const SetupCategories = () => {
const {user} = useUserStore()
const {handleSubmit,loading} = useSetupCategories()
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState('');
  const [allCategories, setAllCategories] = useState(predefinedCategories);
  const {theme} = useTheme()
  const styles = useMemo(()=>generateStyle(theme),[theme])

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAddCategory = () => {
    const trimmed = customCategory.trim();
    if (trimmed && !allCategories.includes(trimmed)) {
      setAllCategories([trimmed, ...allCategories]);
      setSelectedCategories([...selectedCategories, trimmed]);
      setCustomCategory('');
    }
  };

  const renderCategory = ({ item }) => {
    const isSelected = selectedCategories.includes(item);
    return (
      <TouchableOpacity
        onPress={() => toggleCategory(item)}
        style={[
          styles.categoryChip,
          isSelected && styles.categoryChipSelected,
        ]}
      >
        <Text style={[styles.categoryText, isSelected && styles.selectedText]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const handleContinue = ()=>{
    if(user){
      handleSubmit(selectedCategories)
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.title}>Select Your Expense Categories</Text>

      <FlatList
        data={allCategories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.categoryList}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add custom category"
          value={customCategory}
          onChangeText={setCustomCategory}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={handleAddCategory} style={styles.addButton}>
          <MaterialCommunityIcons name="plus-circle" size={26} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleContinue}>
        <Text style={styles.nextButtonText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const generateStyle = (theme:Theme)=>StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text,
    textAlign: 'center',
  },
  categoryList: {
    paddingBottom: 20,
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: theme.colors.card,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
  },
  categoryChipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    color: theme.colors.text,
    fontWeight: '500',
  },
  selectedText: {
    color: theme.colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.card,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: theme.colors.text,
  },
  addButton: {
    paddingLeft: 10,
  },
  nextButton: {
    marginTop: 30,
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SetupCategories;
