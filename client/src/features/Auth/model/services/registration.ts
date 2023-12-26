import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseAuth } from '@/features/Auth';
import { ThunkConfig } from '@/providers/StoreProvider';
import { userActions } from '@/entities/User';

interface RegistrationProps {
    login: string;
    password: string;
}

export const registration = createAsyncThunk<
ResponseAuth,
    RegistrationProps,
    ThunkConfig<string>
>("auth/registration", async (data, thunkAPI) => {
    const {extra, dispatch, rejectWithValue} = thunkAPI;

    try {
        const response = await extra.api.post<ResponseAuth>("/auth/registration", data);
        dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (e: any) {
        return rejectWithValue(e?.response?.data?.message);
    }
});