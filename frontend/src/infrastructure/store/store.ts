import authReducer from "@/domain/usecases/auth.slice";
import productsReducer from "@/domain/usecases/product.slice";
import userReducer from "@/domain/usecases/user.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
