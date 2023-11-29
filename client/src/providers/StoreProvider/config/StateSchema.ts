import { AxiosInstance } from "axios";
import { AuthSchema } from "@/features/Auth";
import { UserSchema } from "@/entities/User";
import { ProfilePageSchema } from '@/pages/ProfilePage';

export interface StateSchema {
    user: UserSchema;
    auth: AuthSchema;
    profile: ProfilePageSchema
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}