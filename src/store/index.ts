import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./comments-slice";
import {
  TypedUseSelectorHook,
  useSelector as useSelectorDefault,
  useDispatch as useDispatchDefault,
} from "react-redux";

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchDefault<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorDefault;
