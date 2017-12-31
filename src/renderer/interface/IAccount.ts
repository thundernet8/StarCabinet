export interface ICredentialsState {
    username: string;
    password: string;
}

export interface IProfile {
    login: string;
}

export interface ILoginResultState {
    success: boolean | null;
    profile: IProfile | null;
}
