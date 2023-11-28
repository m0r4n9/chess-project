import { StateSchema } from '@/providers/StoreProvider';

export const getUserData = (state: StateSchema) => state.user.authData;