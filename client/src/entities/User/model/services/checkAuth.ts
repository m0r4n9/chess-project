import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/providers/StoreProvider';
import { User } from '@/entities/User';

export const checkAuth = createAsyncThunk<User, string, ThunkConfig<string>>(
    'user/checkAuth',
    async (token, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<User>('/auth/refresh', {
                params: {
                    token,
                },
            });
            // dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e?.response?.data);
        }
    },
);
