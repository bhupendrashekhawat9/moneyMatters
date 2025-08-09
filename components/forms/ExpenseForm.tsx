import AppButton from '@/components/AppButton';
import { ThemeType } from '@/constants/theme';
import useTheme from '@/hooks/useTheme';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SelectInput from '../ui/SelectInput';

export type Budget = {
  id: string;
  name: string;
  totalAmount: number;
  spentAmount: number;
  color?: string;
};

export type ExpenseCategory = {
  id: string;
  name: string;
  icon: string;
  color?: string;
};

export type ExpenseFormData = {
  budgetId: string;
  amount: string;
  categoryId: string;
  title: string;
  description: string;
  date: string;
};

type ExpenseFormProps = {
  budgets: Budget[];
  categories: ExpenseCategory[];
  onSubmit: (expenseData: ExpenseFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<ExpenseFormData>;
  loading?: boolean;
};

const DEFAULT_CATEGORIES: ExpenseCategory[] = [
  { id: '1', name: 'Food & Dining', icon: 'food-fork-drink' },
  { id: '2', name: 'Transportation', icon: 'car' },
  { id: '3', name: 'Shopping', icon: 'shopping' },
  { id: '4', name: 'Entertainment', icon: 'movie' },
  { id: '5', name: 'Bills & Utilities', icon: 'receipt' },
  { id: '6', name: 'Healthcare', icon: 'medical-bag' },
  { id: '7', name: 'Education', icon: 'school' },
  { id: '8', name: 'Travel', icon: 'airplane' },
  { id: '9', name: 'Groceries', icon: 'cart' },
  { id: '10', name: 'Other', icon: 'dots-horizontal' },
];

const ExpenseForm = ({
  budgets,
  categories = DEFAULT_CATEGORIES,
  onSubmit,
  onCancel,
  initialData = {},
  loading = false,
}: ExpenseFormProps) => {
  const { theme } = useTheme();
  const styles = generateStyles(theme);

  const [formData, setFormData] = useState<ExpenseFormData>({
    budgetId: initialData.budgetId || '',
    amount: initialData.amount || '',
    categoryId: initialData.categoryId || '',
    title: initialData.title || '',
    description: initialData.description || '',
    date: initialData.date || new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Partial<ExpenseFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ExpenseFormData> = {};

    if (!formData.budgetId) {
      newErrors.budgetId = 'Please select a budget';
    }

    if (!formData.amount || isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    console.log(formData)
    if (validateForm()) {
      console.log("valid")
      const selectedBudget = budgets.find(b => b.id === formData.budgetId);
      const expenseAmount = parseFloat(formData.amount);
      
      if (selectedBudget) {
        const remainingBudget = selectedBudget.totalAmount - selectedBudget.spentAmount;
        if (expenseAmount > remainingBudget) {
          Alert.alert(
            'Budget Exceeded',
            `This expense ($${expenseAmount.toFixed(2)}) exceeds your remaining budget ($${remainingBudget.toFixed(2)}). Do you want to continue?`,
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Continue', onPress: () => onSubmit(formData) },
            ]
          );
          return;
        }
      }
      
      onSubmit(formData);
    }
  };

  const updateFormData = (field: keyof ExpenseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const selectedBudget = budgets.find(b => b.id === formData.budgetId);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        
        {/* Budget Selection */}
        <View style={styles.fieldContainer}>
          <SelectInput
            label="Budget"
            required
            value={formData.budgetId}
            options={budgets.map(budget => ({
              id: budget.id,
              label: budget.name,
              value: budget.id,
              subtitle: `$${budget.spentAmount.toFixed(0)} / $${budget.totalAmount.toFixed(0)} spent`,
              color: budget.color,
              leftComponent: (
                <View style={[styles.budgetIndicator, { backgroundColor: budget.color || theme.colors.primary }]} />
              ),
              rightComponent: (
                <Text style={styles.remainingBudget}>
                  ${(budget.totalAmount - budget.spentAmount).toFixed(0)} left
                </Text>
              ),
            }))}
            onChange={(value) => updateFormData("budgetId", value)}
            placeholder="Select a budget"
            error={errors.budgetId}
            clearable
            searchable
          />
        </View>

        {/* Amount Input */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Amount ($) *</Text>
          <View style={[styles.amountInputContainer, errors.amount && styles.inputError]}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={theme.colors.text + '80'}
              value={formData.amount}
              onChangeText={(text) => updateFormData('amount', text)}
              keyboardType="decimal-pad"
              maxLength={10}
            />
          </View>
          {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
          {selectedBudget && formData.amount && (
            <Text style={styles.budgetWarning}>
              Remaining budget: ${(selectedBudget.totalAmount - selectedBudget.spentAmount).toFixed(2)}
            </Text>
          )}
        </View>

        {/* Category Selection */}
        <View style={styles.fieldContainer}>
          <SelectInput
            label="Category"
            required
            value={formData.categoryId}
            options={categories.map(category => ({
              id: category.id,
              label: category.name,
              value: category.id,
              icon: category.icon,
              color: category.color,
            }))}
            onChange={(value) => updateFormData("categoryId", value)}
            placeholder="Select a category"
            error={errors.categoryId}
            clearable
            searchable
          />
        </View>

        {/* Description Input */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.textInput, styles.descriptionInput]}
            placeholder="Add a note or description (optional)"
            placeholderTextColor={theme.colors.text + '80'}
            value={formData.description}
            onChangeText={(text) => updateFormData('description', text)}
            multiline
            numberOfLines={3}
            maxLength={200}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>
            {formData.description.length}/200
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {onCancel && (
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
          <AppButton
            title={loading ? "Adding..." : "Add Expense"}
            onPress={handleSubmit}
            disabled={loading}
            style={[styles.submitButton, { flex: 1 }]}
          />
        </View>
      </View>

    </ScrollView>
  );
};

const generateStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  form: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  budgetIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  remainingBudget: {
    fontSize: 12,
    color: theme.colors.success,
    fontWeight: '600',
  },
  amountInputContainer: {
    backgroundColor: theme.colors.layer,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    color: theme.colors.text,
    paddingVertical: 12,
  },
  textInput: {
    backgroundColor: theme.colors.layer,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.text,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  budgetWarning: {
    color: theme.colors.secondary,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  characterCount: {
    fontSize: 12,
    color: theme.colors.text + '80',
    textAlign: 'right',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    marginLeft: 0,
  },
});

export default ExpenseForm;