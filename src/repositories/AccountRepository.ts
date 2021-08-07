import Account from '../models/Account'
import { IAccountRepository } from '../interfaces/IAccountRepository'
import { IAccountData } from '../interfaces/IAccountData';

export default class AccountRepository implements IAccountRepository {
    protected model = Account;

    async getAccount (accountData: IAccountData): Promise <Account> {
        const { accountNumber, passwordHash } = accountData;
        return await this.model.findOne({ where : { accountNumber, passwordHash } }) || new Account();
    }
    
    async getAccountByAccountNumber(accountNumber: string): Promise<Account>{
        return await this.model.findOne({ where: { accountNumber } }) || new Account()
    }
    
    async updateBalance(accountNumber: string, balance: number): Promise<Account>{
        const [, updatedAccount] = await this.model.update({ balance }, { where : { accountNumber } });
        return updatedAccount[0];
    }
}

