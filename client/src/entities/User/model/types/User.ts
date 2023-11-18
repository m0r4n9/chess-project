export interface User {
    id: string;
    login: string;
    accessToken: string;
    refreshToken: string;
}

export interface UserSchema {
    isLoading: boolean;
    authData?: User;
    _inited: boolean;
}