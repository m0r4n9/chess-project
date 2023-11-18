import { StateSchema } from "@/providers/StoreProvider";

export const getAuthPassword = (state: StateSchema) => state.auth.password;