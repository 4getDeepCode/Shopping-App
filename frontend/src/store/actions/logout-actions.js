import { logoutUser } from "../auth-slice";
import { resetCart } from "../shop/cart-slice";

export const logoutAndClearCart = () => async (dispatch) => {
  await dispatch(logoutUser());  // logout from backend
  dispatch(resetCart());         // clear cart immediately after logout
};
