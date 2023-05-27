import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesOutput from "../Components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
import { getDateMinusDays } from "../util/date";
import CustomText from "../Components/CustomText";
import Renkler from "../Constants/Renkler";

const RecentExpenses = () => {
  let expenseSelector = useSelector((state) => state.expenseSlice.expenses);

  let expenseFiltered = expenseSelector?.filter((item) => {
    let today = new Date();
    let date7daysAgo = getDateMinusDays(today, 7);
    return item.date > date7daysAgo;
  });

  if (!expenseFiltered || expenseFiltered.length < 1) {
    return (
      <View style={styles.bg}>
        <CustomText style={styles.text}>Nothing to show...</CustomText>
      </View>
    );
  }

  return (
    <ExpensesOutput expenses={expenseFiltered} expensesPeriod={"Last 7 Days"} />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Renkler.primary800,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Renkler.primary100,
    fontSize: 16,
  },
});
