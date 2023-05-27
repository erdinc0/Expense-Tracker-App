import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Renkler from "../../Constants/Renkler";

const ExpensesSummary = ({ expenses, periodName }) => {
  const expenseSum = expenses?.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>£{expenseSum?.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Renkler.primary50,
    borderRadius: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: Renkler.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: Renkler.primary500,
  },
});
