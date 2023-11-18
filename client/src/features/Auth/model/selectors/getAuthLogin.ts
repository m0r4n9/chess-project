import { StateSchema } from '@/providers/StoreProvider';

export const getAuthLogin = (state: StateSchema) => state.auth.login;
