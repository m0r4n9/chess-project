export interface ProfileData {
    id: string;
    login: string;
    countGames: string;
    wins: string;
}

export interface ProfilePageSchema {
    isLoading: boolean;
    profile?: ProfileData;
    error?: string;
}