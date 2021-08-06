import Account from '../models/Account'
import { IAccountData } from '../types/IAccountData'

export interface AccountRepositoryProtocol {
    getAccount (accountData: IAccountData): Promise<Account>;
}
