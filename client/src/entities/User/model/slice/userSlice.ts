import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkAuth } from '../services/checkAuth.ts';
import { User, UserSchema } from "../types/User.ts";
import { ResponseAuth } from '@/features/Auth';

const initialState: UserSchema = {
    isLoading: false,
    _inited: false,
};

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<ResponseAuth>) => {
            state.authData = action.payload.user;
            localStorage.setItem('token', action.payload.jwtToken);
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.authData = undefined;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authData = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.authData = undefined;
            }),
});

export const { actions: userActions, reducer: userReducer } = userSlice;
