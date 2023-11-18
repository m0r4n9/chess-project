import { AuthSchema } from '../types/AuthSchema.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authByLogin } from '@/features/Auth/model/services/AuthByLogin.ts';

const initialState: AuthSchema = {
    isLoading: false,
    login: '',
    password: '',
};

const authSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(authByLogin.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(authByLogin.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(authByLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }),
});

export const {
    actions: authActions,
    reducer: authReducer
} = authSlice;