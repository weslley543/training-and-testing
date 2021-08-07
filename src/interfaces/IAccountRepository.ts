import Account from '../models/Account'
import { IAccountData } from '../interfaces/IAccountData'

export interface IAccountRepository {
    getAccount (accountData: IAccountData): Promise<Account>;
    getAccountByAccountNumber(accountNumber: string): Promise<Account>;
    updateBalance(accountNumber: string, balance: number): Promise<Account>;
}
