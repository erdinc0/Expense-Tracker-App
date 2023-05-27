import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Renkler from "../Constants/Renkler";
import IconButton from "../UI/IconButton";
import CustomButton from "../Components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, removeExpense, updateExpense } from "../store/expenses";
import CustomText from "../Components/CustomText";
import { getFormattedDate } from "../util/date";
import { removeFBExpense, storeExpense, updateFBExpense } from "../util/http";
import Loading from "../UI/Loading";
import Error from "../UI/Error";

const ManageExpenses = ({ route, navigation }) => {
  let editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  let selektor = useSelector((state) => state.expenseSlice.expenses);
  let selectedExpense = selektor.find(
    (expense) => expense.id === editedExpenseId
  );

  let dispatch = useDispatch();

  let [date, setDate] = useState("");
  let [amount, setAmount] = useState("");
  let [description, setDescription] = useState("");

  useEffect(() => {
    setDate(isEditing ? getFormattedDate(selectedExpense.date) : "");
    setAmount(isEditing ? selectedExpense.amount.toFixed(2).toString() : "");
    setDescription(isEditing ? selectedExpense.description : "");
  }, []);

  let [isValid, setIsValid] = useState(true);
  let [isSubmitting, setIsSubmitting] = useState(false);
  let [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? "Edit Expense" : "Add Expense",
      headerRight: ({ tintColor }) => {
        return (
          <TouchableOpacity onPress={navigation.goBack}>
            <Text style={styles.kapatText}>Kapat</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, isEditing]);

  let validityCheck = () => {
    if (
      !isNaN(amount) &&
      amount > 0 &&
      date.toString !== "Invalid Date" &&
      description.trim().length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  let HataText = () => {
    return (
      <View style={styles.hataView}>
        <CustomText style={styles.hataText}>
          Invalid Input! Please Check Entered Data!
        </CustomText>
      </View>
    );
  };

  let deleteHandler = async () => {
    try {
      setIsSubmitting(true);
      await removeFBExpense(editedExpenseId);
      dispatch(removeExpense(editedExpenseId));
      navigation.goBack();
    } catch (err) {
      setError(err.toString());
      setIsSubmitting(false);
    }
  };
  let cancelHandler = () => {
    navigation.goBack();
  };
  let confirmHandler = async () => {
    amount = +amount;
    date = new Date(date);
    if (!isEditing) {
      //Add
      if (validityCheck()) {
        try {
          setIsSubmitting(true);
          let id = await storeExpense({ date, description, amount });

          dispatch(addExpense({ id, date, description, amount }));
          navigation.goBack();
        } catch (err) {
          setError(err.toString());
          setIsSubmitting(false);
        }
      } else {
        setIsValid(false);
      }
    } else {
      //Update
      if (validityCheck()) {
        try {
          setIsSubmitting(true);
          await updateFBExpense({
            id: selectedExpense.id,
            date,
            description,
            amount,
          });

          dispatch(
            updateExpense({ id: selectedExpense.id, date, description, amount })
          );

          navigation.goBack();
        } catch (err) {
          setError(err.toString());
          setIsSubmitting(false);
        }
      } else {
        setIsValid(false);
      }
    }
  };

  if (error && !isSubmitting) {
    return <Error message={error} onPress={() => setError(null)} />;
  }

  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={setDate}
          value={date}
          placeholder="YYYY-MM-DD"
          color="white"
          placeholderTextColor={Renkler.primary200}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setAmount}
          value={amount}
          placeholder="Price"
          color="white"
          placeholderTextColor={Renkler.primary200}
        />
        <TextInput
          style={[styles.textInput, styles.desc]}
          onChangeText={setDescription}
          value={description}
          placeholder="Description"
          color="white"
          placeholderTextColor={Renkler.primary200}
          multiline={true}
        />
      </View>

      {!isValid && <HataText />}

      <View style={styles.buttonContainer}>
        <CustomButton style={styles.buton} mode="flat" onPress={cancelHandler}>
          Cancel
        </CustomButton>
        <CustomButton style={styles.buton} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </CustomButton>
      </View>

      {isEditing && (
        <View style={styles.deleteIconView}>
          <CustomText>{editedExpenseId}</CustomText>
          <IconButton
            color={Renkler.error500}
            icon="trash"
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  kapatText: {
    color: Renkler.primary50,
  },
  mainContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: Renkler.primary800,
  },
  deleteIconView: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Renkler.primary200,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buton: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  textInput: {
    backgroundColor: Renkler.primary700,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
  },
  desc: {
    textAlignVertical: "top",
    minHeight: 120,
  },
  hataText: {
    alignSelf: "center",
    fontSize: 18,
    color: Renkler.error50,
    textAlign: "center",
    padding: 10,
    width: "100%",
    fontWeight: "bold",
  },
  hataView: {
    backgroundColor: Renkler.error500,
    marginBottom: 20,
    borderRadius: 10,
  },
});
