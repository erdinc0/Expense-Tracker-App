import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Renkler from "../../Constants/Renkler";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({ id, description, amount, date }) => {
  let navigation = useNavigation();

  let expensePressHandler = () => {
    navigation.navigate("ManageExpenses", {
      expenseId: id,
    });
  };

  return (
    <TouchableOpacity onPress={expensePressHandler}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount?.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: Renkler.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    shadowColor: Renkler.gray500,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: Renkler.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: Renkler.primary500,
    fontWeight: "bold",
  },
});
