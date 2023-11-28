import { AxiosInstance } from "axios";
import { AuthSchema } from "@/features/Auth";
import { UserSchema } from "@/entities/User";

export interface StateSchema {
    user: UserSchema;
    auth: AuthSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}