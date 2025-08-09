# ExpenseForm with Bottom Drawer

A complete expense form solution with a bottom drawer interface, including a floating action button for easy access.

## Components

### 1. `BottomDrawer` (reusable)
A smooth, animated bottom drawer that can contain any content.

### 2. `ExpenseForm` 
The main form component with budget selection, amount input, category selection, and description fields.

### 3. `ExpenseFormDrawer`
Combines the drawer with the expense form.

### 4. `ExpenseFormSolution` (recommended)
Complete solution with FAB button and drawer integration.

## Usage Examples

### Basic Usage (Recommended)

```tsx
import { ExpenseFormSolution } from '@/components/forms/expenseForm';

const MyScreen = () => {
  const budgets = [
    { id: '1', name: 'Monthly Budget', totalAmount: 1000, spentAmount: 300, color: '#4F8EF7' },
    { id: '2', name: 'Food Budget', totalAmount: 500, spentAmount: 200, color: '#FFB300' },
  ];

  const handleExpenseSubmit = async (expenseData) => {
    console.log('New expense:', expenseData);
    // Save to your data store
    await saveExpenseToAPI(expenseData);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Your main content */}
      <Text>My Budget App</Text>
      
      {/* Expense Form with FAB */}
      <ExpenseFormSolution
        budgets={budgets}
        onSubmit={handleExpenseSubmit}
        title="Add New Expense"
        subtitle="Track your spending"
      />
    </View>
  );
};
```

### Manual Control

```tsx
import ExpenseFormDrawer from '@/components/forms/expenseForm';

const MyScreen = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setShowExpenseForm(true)}>
        <Text>Add Expense</Text>
      </TouchableOpacity>

      <ExpenseFormDrawer
        visible={showExpenseForm}
        onClose={() => setShowExpenseForm(false)}
        budgets={budgets}
        onSubmit={handleExpenseSubmit}
      />
    </View>
  );
};
```

### Custom Categories

```tsx
const customCategories = [
  { id: '1', name: 'Coffee', icon: 'coffee', color: '#8B4513' },
  { id: '2', name: 'Gym', icon: 'dumbbell', color: '#FF6347' },
];

<ExpenseFormSolution
  budgets={budgets}
  categories={customCategories}
  onSubmit={handleExpenseSubmit}
/>
```

## Props

### ExpenseFormSolution Props
- `budgets: Budget[]` - Array of available budgets
- `categories?: ExpenseCategory[]` - Custom categories (optional)
- `onSubmit: (data: ExpenseFormData) => Promise<void> | void` - Submit handler
- `initialData?: Partial<ExpenseFormData>` - Pre-fill form data
- `title?: string` - Drawer title
- `subtitle?: string` - Drawer subtitle
- `showFab?: boolean` - Show floating action button (default: true)
- `fabStyle?: any` - Custom FAB styling

### Data Types

```tsx
type Budget = {
  id: string;
  name: string;
  totalAmount: number;
  spentAmount: number;
  color?: string;
};

type ExpenseCategory = {
  id: string;
  name: string;
  icon: string; // MaterialCommunityIcons name
  color?: string;
};

type ExpenseFormData = {
  budgetId: string;
  amount: string;
  categoryId: string;
  title: string;
  description: string;
  date: string; // ISO date string
};
```

## Features

- ✅ Animated bottom drawer with backdrop
- ✅ Budget selection with remaining amount validation
- ✅ Category selection with icons
- ✅ Form validation with error messages
- ✅ Budget overflow warnings
- ✅ Loading states
- ✅ Floating action button
- ✅ Responsive design
- ✅ Theme integration
- ✅ TypeScript support

## File Structure

```
components/
├── ui/
│   └── BottomDrawer.tsx          # Reusable drawer component
├── forms/
│   ├── ExpenseForm.tsx           # Main form component
│   └── expenseForm/
│       ├── index.tsx             # Integration components
│       └── README.md             # This file
```