import IProfile from "./IProfile";

export interface ICredentialsState {
    username: string;
    password: string;
}

export interface ILoginResultState {
    success: boolean | null;
    profile: IProfile | null;
}
