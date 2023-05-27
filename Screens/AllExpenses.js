import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ExpensesOutput from "../Components/ExpensesOutput/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../Components/CustomText";
import Renkler from "../Constants/Renkler";
import { getExpense } from "../util/http";
import { setExpenses } from "../store/expenses";
import Loading from "../UI/Loading";
import Error from "../UI/Error";

const AllExpenses = () => {
  //
  let [expensesArray, setExpensesArray] = useState(null);
  let [isFetching, setIsFetching] = useState(true);
  let [error, setError] = useState(null);

  let dispatch = useDispatch();

  useEffect(() => {
    let expenseSet = async () => {
      try {
        const expenses = await getExpense();
        setExpensesArray(expenses);
      } catch (err) {
        setError(err.toString());
      }
      setIsFetching(false);
    };

    expenseSet();
  }, []);

  useEffect(() => {
    dispatch(setExpenses(expensesArray));
  }, [expensesArray]);

  let expenseSelector = useSelector((state) => state.expenseSlice.expenses);

  if (error && !isFetching) {
    return <Error message={error} onPress={() => setError(null)} />;
  }

  if (isFetching) {
    return <Loading />;
  }

  if (!expenseSelector || expenseSelector?.length < 1) {
    return (
      <View style={styles.bg}>
        <CustomText style={styles.text}>Nothing to show...</CustomText>
      </View>
    );
  }

  return <ExpensesOutput expenses={expenseSelector} expensesPeriod={"Total"} />;
};

export default AllExpenses;

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
