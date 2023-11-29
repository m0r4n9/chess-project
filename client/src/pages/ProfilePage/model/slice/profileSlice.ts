import { createSlice } from '@reduxjs/toolkit';
import { ProfilePageSchema } from '../types/UserPageSchema.ts';
import { fetchUserData } from '@/pages/ProfilePage/model/services/fetchUserData.ts';

const initialState: ProfilePageSchema = {
    isLoading: false,
};

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }),
});

export const {
    actions: profileActions,
    reducer: profileReducer
} = profileSlice;
