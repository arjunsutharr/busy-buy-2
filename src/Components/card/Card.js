import { useNavigate } from "react-router-dom";
import cardStyles from "./Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authenticationSelector } from "../../redux/reducers/authenticationReducers";
import { addToCart, cartSelector } from "../../redux/reducers/cartReducer";

function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, userId } = useSelector(authenticationSelector);
  const { cart } = useSelector(cartSelector);
  const { product } = props;

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      dispatch(addToCart({ product, cart, userId }));
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className={cardStyles.cardContainer}>
      <div className={cardStyles.imgContainer}>
        <img src={product.img} alt={product.name} />
      </div>
      <div className={cardStyles.details}>
        <h4>{product.name}</h4>
        <h4>Rs. {product.price}</h4>
        <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
      </div>
    </div>
  );
}

export default Card;
