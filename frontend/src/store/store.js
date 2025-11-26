import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import AdminProductsSlice from "../../src/store/admin/products-slice"
import shopProductsSlice from "./shop/products-slice/"
import shopCartSlice from "./shop/cart-slice";
import shopReviewSlice from "./shop/review-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopReview: shopReviewSlice,
  }
})

export default store;
