import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/productSlice";
import categoryReducer from "./Slices/categorySlice";
import userReducer from "./Slices/userSlice";
import cartReducer from "./Slices/cartSlice";



const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    user: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
