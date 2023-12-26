import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/providers/StoreProvider';
import { ProfileData } from '../types/UserPageSchema.ts';

export const fetchUserData = createAsyncThunk<
    ProfileData,
    string,
    ThunkConfig<string>
>('ProfilePage/fetchUserData', async (id, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get<ProfileData>(`/users/${id}`);
        return response.data;
    } catch (e: any) {
        return rejectWithValue(e.response.data);
    }
});
