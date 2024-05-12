import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseInit";
import { collection, onSnapshot } from "firebase/firestore";

const initialState = {
  orders: [],
};

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (userId, thunkApi) => {
    const orderRef = collection(db, "usersOrders", userId, "myOrders");

    onSnapshot(orderRef, (snapshot) => {
      const orders = snapshot.docs.map((doc) => {
        const orderData = doc.data();
        return orderData;
      });
      thunkApi.dispatch(orderActions.setOrders(orders));
    });
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {});
  },
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
export const orderSelector = (state) => state.orderReducer;
