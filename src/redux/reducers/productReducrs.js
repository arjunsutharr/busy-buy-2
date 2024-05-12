import { collection, getDocs } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebaseInit";

const initialState = {
  products: [],
  filteredProducts: [],
  loader: false,
  filteredPrice: undefined,
  minPrice: null,
  maxPrice: null,
  selectedCatogories: [],
  searchInput: "",
  notFound: undefined,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const products = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    const minPrice = Math.min(
      ...products.map((product) => Number(product.price))
    );
    const maxPrice = Math.max(
      ...products.map((product) => Number(product.price))
    );

    return { products, minPrice, maxPrice };
  }
);

const filterByPrice = (price, selectedCatogories, products) => {
  let priceFilteredProducts;
  if (selectedCatogories.length > 0) {
    priceFilteredProducts = products.filter(
      (product) =>
        Number(product.price) <= Number(price) &&
        selectedCatogories.filter((category) => product.category === category)
    );
  } else {
    priceFilteredProducts = products.filter(
      (product) => Number(product.price) <= Number(price)
    );
  }
  return priceFilteredProducts;
};

const search = (name, products) => {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return { notFound: `${name} not found.` };
  }

  return { notFound: undefined, filteredProducts: filteredProducts };
};

const filterByCategory = (category, selectedCategories, products) => {
  const isSelected = selectedCategories.includes(category);
  const updatedSelectedCategories = isSelected
    ? [...selectedCategories.filter((cat) => cat !== category)]
    : [...selectedCategories, category];
  const categoryFilteredProducts = products.filter((product) =>
    updatedSelectedCategories.includes(product.category)
  );

  return {
    filteredProducts: categoryFilteredProducts,
    selectedCategories: updatedSelectedCategories,
  };
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    filterByPrice: (state, action) => {
      const price = action.payload;
      const filteredByPriceProducts = filterByPrice(
        price,
        state.selectedCatogories,
        state.products
      );
      state.filteredProducts = filteredByPriceProducts;
      state.filteredPrice = price;
    },
    filterByCategory: (state, action) => {
      const category = action.payload;
      const { filteredProducts, selectedCategories } = filterByCategory(
        category,
        state.selectedCatogories,
        state.products
      );
      state.filteredProducts = filteredProducts;
      state.selectedCatogories = selectedCategories;
    },
    search: (state, action) => {
      const input = action.payload;
      const searchResult = search(input, state.products);
      state.searchInput = input;
      if (searchResult.notFound) {
        state.notFound = searchResult.notFound;
      } else {
        state.notFound = searchResult.notFound;
        state.filteredProducts = searchResult.filteredProducts;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = [...action.payload.products];
        state.maxPrice = action.payload.maxPrice;
        state.minPrice = action.payload.minPrice;
        state.loader = false;
      });
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;

export const productSelector = (state) => state.productReducer;
