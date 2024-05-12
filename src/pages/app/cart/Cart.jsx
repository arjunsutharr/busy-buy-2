import { Navigate, useNavigate } from "react-router-dom";
import CartItemCard from "../../../Components/cartItemCard/CartItemCard";
import cartStyles from "./Cart.module.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  fetchCartItems,
  placeOrder,
} from "../../../redux/reducers/cartReducer";
import { authenticationSelector } from "../../../redux/reducers/authenticationReducers";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, cartTotalAmount } = useSelector(cartSelector);
  const { userId, isLoggedIn } = useSelector(authenticationSelector);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartItems(userId));
    }
  }, [isLoggedIn, dispatch, userId]);

  const handlePlaceOrder = async () => {
    try {
      const response = await dispatch(
        placeOrder({ userId, cart, cartTotalAmount })
      );
      if (response.meta.requestStatus === "fulfilled") {
        navigate("/orders");
      }
    } catch (error) {
      console.log("error while placing order", error);
      toast.error("error while placing order");
    }
  };

  return (
    <>
      {isLoggedIn ? (
        cart.length > 0 ? (
          <div className={cartStyles.container}>
            <div className={cartStyles.cartItemsContainer}>
              <CartItemCard cartItems={cart} />
            </div>
            <div className={cartStyles.cartSummaryContainer}>
              <p>Total Amount: {cartTotalAmount}</p>
              <button onClick={() => handlePlaceOrder()}>Place Order</button>
            </div>
          </div>
        ) : (
          <div>Your Cart Is Empty</div>
        )
      ) : (
        <Navigate to="/signin" replace />
      )}
    </>
  );
}

export default Cart;
