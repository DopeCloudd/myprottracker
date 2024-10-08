import alertsReducer from "@/application/redux/slices/alerts.slice";
import authReducer from "@/application/redux/slices/auth.slice";
import categoryReducer from "@/application/redux/slices/category.slice";
import dialogReducer from "@/application/redux/slices/dialog.slice";
import favoritesReducer from "@/application/redux/slices/favorites.slice";
import fileReducer from "@/application/redux/slices/file.slice";
import { alertApi } from "@/infrastructure/api/alert.api";
import { authApi } from "@/infrastructure/api/auth.api";
import { brandApi } from "@/infrastructure/api/brand.api";
import { categoryApi } from "@/infrastructure/api/category.api";
import { favoriteApi } from "@/infrastructure/api/favorite.api";
import { productApi } from "@/infrastructure/api/product.api";
import { requestApi } from "@/infrastructure/api/request.api";
import { scrapingApi } from "@/infrastructure/api/scraping.api";
import { statisticsApi } from "@/infrastructure/api/statistics.api";
import { stripeApi } from "@/infrastructure/api/stripe.api";
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit/react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoritesReducer,
  alerts: alertsReducer,
  category: categoryReducer,
  file: fileReducer,
  dialog: dialogReducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  [alertApi.reducerPath]: alertApi.reducer,
  [brandApi.reducerPath]: brandApi.reducer,
  [scrapingApi.reducerPath]: scrapingApi.reducer,
  [requestApi.reducerPath]: requestApi.reducer,
  [statisticsApi.reducerPath]: statisticsApi.reducer,
  [stripeApi.reducerPath]: stripeApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      favoriteApi.middleware,
      alertApi.middleware,
      brandApi.middleware,
      scrapingApi.middleware,
      requestApi.middleware,
      statisticsApi.middleware,
      stripeApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
