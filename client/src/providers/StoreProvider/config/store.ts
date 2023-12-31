import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from './StateSchema.ts';
import { authReducer } from '@/features/Auth';
import { $api } from '@/api/api.ts';
import { userReducer } from '@/entities/User';
import { profileReducer } from '@/pages/ProfilePage';

export function createReduxStore() {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        auth: authReducer,
        profile: profileReducer
    };

    const extraArgs: ThunkExtraArg = {
        api: $api,
    };

    return configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArgs,
                },
            }),
    });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
