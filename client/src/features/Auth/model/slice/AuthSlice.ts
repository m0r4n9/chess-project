import { AuthSchema } from '../types/AuthSchema.ts';
import { createSlice } from '@reduxjs/toolkit';
import { authByLogin } from '@/features/Auth/model/services/AuthByLogin.ts';
import { registration } from '@/features/Auth/model/services/registration.ts';

const initialState: AuthSchema = {
    isLoading: false,
};

const authSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(authByLogin.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(authByLogin.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(authByLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(registration.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(registration.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
});

export const { actions: authActions, reducer: authReducer } = authSlice;
