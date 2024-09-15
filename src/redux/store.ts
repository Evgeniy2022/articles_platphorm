import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import articleSlice from "./slices/articlesSlice";


export const store = configureStore({
  reducer: {
    userSlice,
    articleSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
