import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomDrawer from '@/components/ui/BottomDrawer';
import ExpenseForm, { Budget, ExpenseCategory, ExpenseFormData } from '../ExpenseForm';
import useTheme from '@/hooks/useTheme';
import { ThemeType } from '@/constants/theme';

type ExpenseFormDrawerProps = {
  visible: boolean;
  onClose: () => void;
  budgets: Budget[];
  categories?: ExpenseCategory[];
  onSubmit: (expenseData: ExpenseFormData) => Promise<void> | void;
  initialData?: Partial<ExpenseFormData>;
  title?: string;
  subtitle?: string;
};

const ExpenseFormDrawer = ({
  visible,
  onClose,
  budgets,
  categories,
  onSubmit,
  initialData,
  title = "Add Expense",
  subtitle = "Track your spending",
}: ExpenseFormDrawerProps) => {
  const { theme } = useTheme();
  const styles = generateStyles(theme);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (expenseData: ExpenseFormData) => {
    try {
      setLoading(true);
      await onSubmit(expenseData);
      onClose();
    } catch (error) {
      console.error('Error submitting expense:', error);
      // Handle error - could show toast or alert
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <BottomDrawer
      visible={visible}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      height="auto"
      showHandle={true}
      showCloseButton={true}
      backdrop={true}
      swipeToClose={true}
    >
      <ExpenseForm
        budgets={budgets}
        categories={categories}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialData={initialData}
        loading={loading}
      />
    </BottomDrawer>
  );
};

// Floating Action Button Component for triggering the expense form
export const AddExpenseButton = ({ 
  onPress, 
  style 
}: { 
  onPress: () => void;
  style?: any;
}) => {
  const { theme } = useTheme();
  const fabStyles = generateFabStyles(theme);

  return (
    <TouchableOpacity style={[fabStyles.fab, style]} onPress={onPress}>
      <MaterialCommunityIcons name="plus" size={28} color="white" />
    </TouchableOpacity>
  );
};

// Complete Expense Form Solution Component
type ExpenseFormSolutionProps = {
  budgets: Budget[];
  categories?: ExpenseCategory[];
  onSubmit: (expenseData: ExpenseFormData) => Promise<void> | void;
  initialData?: Partial<ExpenseFormData>;
  title?: string;
  subtitle?: string;
  showFab?: boolean;
  fabStyle?: any;
};

export const ExpenseFormSolution = ({
  budgets,
  categories,
  onSubmit,
  initialData,
  title,
  subtitle,
  showFab = true,
  fabStyle,
}: ExpenseFormSolutionProps) => {
  const [visible, setVisible] = useState(false);

  const handleOpenForm = () => {
    setVisible(true);
  };

  const handleCloseForm = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      {showFab && (
        <AddExpenseButton 
          onPress={handleOpenForm}
          style={fabStyle}
        />
      )}
      
      <ExpenseFormDrawer
        visible={visible}
        onClose={handleCloseForm}
        budgets={budgets}
        categories={categories}
        onSubmit={onSubmit}
        initialData={initialData}
        title={title}
        subtitle={subtitle}
      />
    </View>
  );
};

const generateStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
  },
});

const generateFabStyles = (theme: ThemeType) => StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExpenseFormDrawer;