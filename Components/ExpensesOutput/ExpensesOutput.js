import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import Renkler from "../../Constants/Renkler";

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.mainContainer}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Renkler.primary700,
    padding: 24,
    paddingBottom: 0,
    flex: 1,
  },
});
