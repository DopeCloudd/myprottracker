import authReducer from "@/domain/usecases/auth.slice";
import productsReducer from "@/domain/usecases/product.slice";
import userReducer from "@/domain/usecases/user.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  products: productsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
