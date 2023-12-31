import userReducer from './slices/userSlice';
import loadingReducer from './slices/loadingSlice';
import { useDispatch } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './slices/errorSlice';

export const store = configureStore({
    reducer: {
        loadingReducer,
        userReducer,
        errorReducer,

    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;