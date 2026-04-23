export interface DefaultCategory {
  name: string;
  icon: string;
  color: string;
  type: "income" | "expense";
}

export const DEFAULT_CATEGORIES: DefaultCategory[] = [
  {
    name: "Food & Dining",
    icon: "food-fork-drink",
    color: "#FF7043",
    type: "expense",
  },
  {
    name: "Transportation",
    icon: "car",
    color: "#29B6F6",
    type: "expense",
  },
  {
    name: "Shopping",
    icon: "shopping",
    color: "#AB47BC",
    type: "expense",
  },
  {
    name: "Entertainment",
    icon: "movie",
    color: "#FFD600",
    type: "expense",
  },
  {
    name: "Bills & Utilities",
    icon: "receipt",
    color: "#66BB6A",
    type: "expense",
  },
  {
    name: "Healthcare",
    icon: "medical-bag",
    color: "#EC407A",
    type: "expense",
  },
  {
    name: "Education",
    icon: "school",
    color: "#42A5F5",
    type: "expense",
  },
  {
    name: "Travel",
    icon: "airplane",
    color: "#FFA726",
    type: "expense",
  },
  {
    name: "Groceries",
    icon: "cart",
    color: "#8D6E63",
    type: "expense",
  },
  {
    name: "Home & Utilities",
    icon: "home",
    color: "#8BC34A",
    type: "expense",
  },
  {
    name: "Subscriptions",
    icon: "youtube-subscription",
    color: "#00796B",
    type: "expense",
  },
  {
    name: "Gifts & Donations",
    icon: "gift",
    color: "#F06292",
    type: "expense",
  },
  {
    name: "Personal Care",
    icon: "face-woman",
    color: "#FF8A65",
    type: "expense",
  },
  {
    name: "Insurance",
    icon: "shield-home",
    color: "#5C6BC0",
    type: "expense",
  },
  {
    name: "Other",
    icon: "dots-horizontal",
    color: "#BDBDBD",
    type: "expense",
  },
  {
    name: "Salary",
    icon: "cash",
    color: "#4CAF50",
    type: "income",
  },
  {
    name: "Business",
    icon: "briefcase",
    color: "#1976D2",
    type: "income",
  },
  {
    name: "Freelance",
    icon: "laptop",
    color: "#8E24AA",
    type: "income",
  },
  {
    name: "Investments",
    icon: "currency-usd",
    color: "#43A047",
    type: "income",
  },
  {
    name: "Gifts",
    icon: "gift",
    color: "#F06292",
    type: "income",
  },
  {
    name: "Rental Income",
    icon: "home",
    color: "#FFB300",
    type: "income",
  },
  {
    name: "Refunds",
    icon: "cash-refund",
    color: "#0097A7",
    type: "income",
  },
  {
    name: "Interest",
    icon: "chart-line",
    color: "#7B1FA2",
    type: "income",
  },
  {
    name: "Pension",
    icon: "bank",
    color: "#5D4037",
    type: "income",
  },
  {
    name: "Other",
    icon: "dots-horizontal",
    color: "#BDBDBD",
    type: "income",
  },
];
