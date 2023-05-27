import { FlatList, StyleSheet, RefreshControl } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";
import Renkler from "../../Constants/Renkler";

let renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = ({ expenses, setRefresher, refresher }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <FlatList
      contentContainerStyle={{ flexDirection: "column-reverse" }}
      refreshControl={
        <RefreshControl
          tintColor={Renkler.primary50}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
