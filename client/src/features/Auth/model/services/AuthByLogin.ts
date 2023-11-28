import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/providers/StoreProvider';
import { ResponseAuth } from '@/features/Auth';

interface AuthByLoginProps {
    login: string;
    password: string;
}


export const authByLogin = createAsyncThunk<
    ResponseAuth,
    AuthByLoginProps,
    ThunkConfig<string>
>('auth/authByLogin', async (data, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post<ResponseAuth>('/auth/login', data);
        dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (e: any) {
        return rejectWithValue(e?.response?.data);
    }
});
