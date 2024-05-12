import { authenticationReducer } from "./reducers/authenticationReducers";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
import { productReducer } from "./reducers/productReducrs";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    productReducer,
    authenticationReducer,
    cartReducer,
    orderReducer,
  },
});
