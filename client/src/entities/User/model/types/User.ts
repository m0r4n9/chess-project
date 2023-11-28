export interface User {
    id: string;
    login: string;
}

export interface UserSchema {
    isLoading: boolean;
    authData?: User;
    _inited: boolean;
}