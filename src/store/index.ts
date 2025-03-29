import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage for persistence
import { apiServices } from "../../src/services/apiServices";
import authReducer from "../../src/features/auth/authSlice";
import productReducer from "../../src/features/products/productSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const productPersistConfig = {
  key: "products",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedProductReducer = persistReducer(productPersistConfig, productReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Persisted Auth Reducer
    product: persistedProductReducer, // Persisted Product Reducer
    [apiServices.reducerPath]: apiServices.reducer, // API Reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiServices.middleware),
});

export const persistor = persistStore(store); // Persistor for Redux Persist

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
