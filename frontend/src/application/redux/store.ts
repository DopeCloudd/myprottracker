import alertsReducer from "@/application/redux/slices/alerts.slice";
import authReducer from "@/application/redux/slices/auth.slice";
import categoryReducer from "@/application/redux/slices/category.slice";
import favoritesReducer from "@/application/redux/slices/favorites.slice";
import { alertApi } from "@/infrastructure/api/alert.api";
import { authApi } from "@/infrastructure/api/auth.api";
import { categoryApi } from "@/infrastructure/api/category.api";
import { favoriteApi } from "@/infrastructure/api/favorite.api";
import { productApi } from "@/infrastructure/api/product.api";
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit/react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoritesReducer,
  alerts: alertsReducer,
  category: categoryReducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  [alertApi.reducerPath]: alertApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      favoriteApi.middleware,
      alertApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
