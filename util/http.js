import axios from "axios";

let firebaseURL =
  "https://react-native-course-b216a-default-rtdb.firebaseio.com";

export let storeExpense = async (expenseData) => {
  let donen = await axios.post(firebaseURL + "/expenses.json", expenseData);
  let id = donen.data.name;
  return id;
};

export let getExpense = async () => {
  let returnedData = await axios.get(firebaseURL + "/expenses.json");
  let expenses = [];

  for (let key in returnedData.data) {
    let expenseObj = {
      id: key,
      amount: returnedData.data[key].amount,
      description: returnedData.data[key].description,
      date: new Date(returnedData.data[key].date),
    };
    expenses.push(expenseObj);
  }
  return expenses;
};

export let updateFBExpense = async (expenseData) => {
  return await axios.put(
    firebaseURL + "/expenses/" + expenseData.id + ".json",
    expenseData
  );
};

export let removeFBExpense = async (expenseId) => {
  await axios.delete(firebaseURL + "/expenses/" + expenseId + ".json");
};
