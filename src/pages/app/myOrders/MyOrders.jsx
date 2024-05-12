import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import OrderTable from "../../../Components/orderTable/OrderTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  orderSelector,
} from "../../../redux/reducers/orderReducer";
import { authenticationSelector } from "../../../redux/reducers/authenticationReducers";

function MyOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector(orderSelector);
  const { isLoggedIn, userId } = useSelector(authenticationSelector);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchOrders(userId));
    }
  }, [isLoggedIn, dispatch, userId]);

  return (
    <>
      {isLoggedIn ? (
        orders.length > 0 ? (
          <div>
            {orders.map((order, i) => (
              <OrderTable key={i} order={order} />
            ))}
          </div>
        ) : (
          <div>No Order Found</div>
        )
      ) : (
        <Navigate to="/signin" replace />
      )}
    </>
  );
}

export default MyOrders;
