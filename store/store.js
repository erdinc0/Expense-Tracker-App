const { configureStore } = require("@reduxjs/toolkit");
import expenses from "./expenses";

let store = configureStore({
  reducer: {
    expenseSlice: expenses,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
