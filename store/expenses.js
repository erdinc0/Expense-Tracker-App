import { removeFBExpense, storeExpense, updateFBExpense } from "../util/http";
const { createSlice } = require("@reduxjs/toolkit");

let expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
    updateExpense: (state, action) => {
      let expenseIndex = state.expenses
        .map((item) => item.id)
        .indexOf(action.payload.id);
      state.expenses.splice(expenseIndex, 1, action.payload);
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export let addExpense = expensesSlice.actions.addExpense;
export let removeExpense = expensesSlice.actions.removeExpense;
export let updateExpense = expensesSlice.actions.updateExpense;
export let setExpenses = expensesSlice.actions.setExpenses;
export default expensesSlice.reducer;
