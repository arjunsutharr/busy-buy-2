import searchStyles from "./Search.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  productActions,
  productSelector,
} from "../../redux/reducers/productReducrs";

function Search() {
  const dispatch = useDispatch();
  const { searchInput } = useSelector(productSelector);
  return (
    <div className={searchStyles.searchContainer}>
      <input
        value={searchInput}
        onChange={(e) => dispatch(productActions.search(e.target.value))}
        placeholder="Search By Name"
      />
    </div>
  );
}

export default Search;
