import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebaseInit";
import { toast } from "react-toastify";

const initialState = {
  FormData: { name: "", email: "", password: "" },
  userId: null,
  isLoggedIn: false,
};

export const signup = createAsyncThunk("signup", async (FormData) => {
  const { email, password } = FormData;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const newUserUid = userCredential.user.uid;

  return newUserUid;
});

export const signin = createAsyncThunk("signin", async (FormData) => {
  try {
    const { email, password } = FormData;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userUid = userCredential.user.uid;
    return userUid;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
});

export const signOutUser = createAsyncThunk("signOutUser", async () => {
  try {
    await signOut(auth);
    toast.success("Sign-out successful.");
  } catch (error) {
    toast.error(error.message);
    throw error.message;
  }
});

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.FormData.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.FormData.password = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.FormData = { email: "", password: "" };
        state.userId = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        toast.error(action.error.message);
        state.isLoggedIn = false;
        state.FormData.password = "";
        state.userId = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.FormData = { email: "", password: "" };
        state.userId = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.FormData.password = "";
        state.userId = null;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.userId = null;
      });
  },
});

export const authenticationReducer = authenticationSlice.reducer;
export const authenticationActions = authenticationSlice.actions;
export const authenticationSelector = (state) => state.authenticationReducer;
