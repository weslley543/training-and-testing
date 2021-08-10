import { Account } from '../models/Account'
import { IAccount } from '../interfaces/IAccount'

export interface IAccountRepository {
    getAccount (accountData: IAccount): Promise<Account>;
    getAccountByAccountNumber(accountNumber: string): Promise<Account>;
    updateBalance(accountNumber: string, balance: number): Promise<Account>;
};
