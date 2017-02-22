import { ICredentials }    from './ICredentials'

export interface IBaseAction {
  type: string
}

export interface IRequestLoginResultAction extends IBaseAction {
  credentials: ICredentials
}
