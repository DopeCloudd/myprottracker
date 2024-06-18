import authReducer from "@/application/redux/slices/auth.slice";
import categoryReducer from "@/application/redux/slices/category.slice";
import productsReducer from "@/application/redux/slices/product.slice";
import { categoryApi } from "@/infrastructure/api/category.api";
import { productApi } from "@/infrastructure/api/product.api";
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit/react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  category: categoryReducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      productApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
