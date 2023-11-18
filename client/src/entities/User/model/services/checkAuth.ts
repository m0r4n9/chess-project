import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from "../slice/userSlice.ts";
import { ThunkConfig } from "@/providers/StoreProvider";
import { User } from "@/entities/User";

export const checkAuth = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/checkAuth',
    async (_, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<User>('/user/refresh');
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e?.response?.data);
        }
    },
);
