import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@/entities/User';
import { ThunkConfig } from '@/providers/StoreProvider';
import { getAuthLogin } from '../selectors/getAuthLogin.ts';
import { getAuthPassword } from '../selectors/getAuthPassword.ts';

export const authByLogin = createAsyncThunk<User, void, ThunkConfig<string>>(
    'auth/authByLogin',
    async (_, thunkAPI) => {
        const { extra, getState, rejectWithValue } = thunkAPI;

        const login = getAuthLogin(getState());
        const password = getAuthPassword(getState());

        try {
            const response = await extra.api.post<User>('/user/login', {
                login,
                password,
            });
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e?.response?.data);
        }
    },
);
