import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseInit";
import { toast } from "react-toastify";

const initialState = {
  cart: [],
  cartTotalAmount: 0,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, thunkApi) => {
    const cartRef = collection(db, "usersCarts", userId, "myCart");

    onSnapshot(cartRef, (snapshot) => {
      const cartItems = snapshot.docs.map((doc) => doc.data());
      thunkApi.dispatch(cartActions.setCartItems(cartItems));
    });
  }
);

export const addToCart = createAsyncThunk(
  "addToCart",
  async ({ product, cart, userId }) => {
    const foundItem = cart.find((cartItem) => cartItem.id === product.id);
    const cartRef = doc(db, "usersCarts", userId, "myCart", product.id);

    if (foundItem) {
      await updateDoc(cartRef, {
        qty: foundItem.qty + 1,
        amount: foundItem.price * (foundItem.qty + 1),
      });

      const data = cart.map((cartItem) =>
        cartItem.id === product.id
          ? {
              ...cartItem,
              qty: cartItem.qty + 1,
              amount: foundItem.price * (foundItem.qty + 1),
            }
          : cartItem
      );

      toast.success("Item added to cart.");
      return data;
    } else {
      await setDoc(cartRef, { ...product, qty: 1, amount: product.price });

      const data = [...cart, { ...product, qty: 1, amount: product.price }];

      toast.success("Item added to cart.");
      return data;
    }
  }
);

export const increaseCartItemQuantity = createAsyncThunk(
  "cart/increaseCartItemQuantity",
  async ({ item, cart, userId }) => {
    const foundItem = cart.find((cartItem) => cartItem.id === item.id);
    const cartRef = doc(db, "usersCarts", userId, "myCart", item.id);
    await updateDoc(cartRef, {
      qty: foundItem.qty + 1,
      amount: foundItem.price * (foundItem.qty + 1),
    });

    const data = cart.map((cartItem) =>
      cartItem.id === item.id
        ? {
            ...cartItem,
            qty: cartItem.qty + 1,
            amount: foundItem.price * (foundItem.qty + 1),
          }
        : cartItem
    );

    return data;
  }
);

export const decreaseCartItemQuantity = createAsyncThunk(
  "cart/decreaseCartItemQuantity",
  async ({ item, cart, userId }) => {
    const foundItem = cart.find((cartItem) => cartItem.id === item.id);
    const cartRef = doc(db, "usersCarts", userId, "myCart", item.id);
    if (foundItem.qty > 1) {
      await updateDoc(cartRef, {
        qty: foundItem.qty - 1,
        amount: foundItem.price * (foundItem.qty - 1),
      });

      const data = cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              qty: cartItem.qty - 1,
              amount: foundItem.price * (foundItem.qty - 1),
            }
          : cartItem
      );

      return data;
    } else {
      return null;
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ item, userId }) => {
    try {
      const cartItemRef = doc(db, "usersCarts", userId, "myCart", item.id);
      await deleteDoc(cartItemRef);
    } catch (error) {
      throw error;
    }
  }
);

export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async ({ userId, cart, cartTotalAmount }) => {
    try {
      const orderRef = collection(db, "usersOrders", userId, "myOrders");

      const newOrderDoc = await addDoc(orderRef, {
        totalAmount: cartTotalAmount,
        items: cart,
        createdOn: new Date().toLocaleDateString(),
      });

      await clearUserCart(userId);

      return { orderId: newOrderDoc.id };
    } catch (error) {
      throw error;
    }
  }
);

const clearUserCart = async (userId) => {
  try {
    const cartRef = collection(db, "usersCarts", userId, "myCart");
    const snapshot = await getDocs(cartRef);
    snapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (error) {
    console.log("error while clearing cart");
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cart = [...action.payload];
      state.cartTotalAmount = state.cart.reduce(
        (currentTotal, item) => item.amount + currentTotal,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {})
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = [...action.payload];
      })
      .addCase(increaseCartItemQuantity.fulfilled, (state, action) => {
        state.cart = [...action.payload];
      })
      .addCase(decreaseCartItemQuantity.fulfilled, (state, action) => {
        const updatedCart = action.payload;
        if (updatedCart !== null) {
          state.cart = [...action.payload];
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {})
      .addCase(removeCartItem.rejected, (state, action) => {
        toast.error("error while removing the item");
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.cart = [];
        state.cartTotalAmount = 0;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        console.log("error while placing order");
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const cartSelector = (state) => state.cartReducer;
