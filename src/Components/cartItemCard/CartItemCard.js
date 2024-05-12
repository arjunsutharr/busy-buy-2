import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import cartItemStyle from "./CartItemCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from "../../redux/reducers/cartReducer";
import { authenticationSelector } from "../../redux/reducers/authenticationReducers";

function CartItemCard(props) {
  const { cartItems } = props;
  const dispatch = useDispatch();
  const { cart } = useSelector(cartSelector);
  const { userId } = useSelector(authenticationSelector);

  return (
    <>
      {cartItems.map((item) => (
        <div key={item.id} className={cartItemStyle.container}>
          <div className={cartItemStyle.imgContainer}>
            <img src={item.img} alt={item.name} />
          </div>
          <div className={cartItemStyle.itemDetailsContainer}>
            <div>
              <h4>{item.name}</h4>
              <p>Price: {item.price}</p>
            </div>
            <div className={cartItemStyle.cardFooter}>
              <div className={cartItemStyle.qtyControlContainer}>
                <FiMinusCircle
                  onClick={() =>
                    dispatch(decreaseCartItemQuantity({ item, cart, userId }))
                  }
                  className={cartItemStyle.icons}
                />
                <p>{item.qty}</p>
                <FiPlusCircle
                  onClick={() =>
                    dispatch(increaseCartItemQuantity({ item, cart, userId }))
                  }
                  className={cartItemStyle.icons}
                />
              </div>
              <p>{item.amount}</p>
            </div>
          </div>
          <div
            onClick={() => dispatch(removeCartItem({ item, userId }))}
            className={cartItemStyle.crossIcon}
          >
            <RxCross2 className={cartItemStyle.icons} />
          </div>
        </div>
      ))}
    </>
  );
}

export default CartItemCard;
