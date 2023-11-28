import { User } from '@/entities/User';

export interface ResponseAuth {
    user: User;
    jwtToken: string;
}

export interface AuthSchema {
    isLoading: boolean;
    user?: User;
    error?: string;
}