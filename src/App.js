import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./Components/nav/Nav";
import Products from "./pages/app/products/Products";
import Cart from "./pages/app/cart/Cart";
import SignUp from "./pages/app/signup/SignUp";
import SignIn from "./pages/app/signup/SignIn";
import MyOrders from "./pages/app/myOrders/MyOrders";
import Page404 from "./pages/misc/Page404/Page404";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Products />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/orders" element={<MyOrders />}></Route>
            <Route path="*" element={<Page404 />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
