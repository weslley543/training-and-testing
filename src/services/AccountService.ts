import { IAccountRepository } from '../interfaces/IAccountRepository';
import { IAccount } from '../interfaces/IAccount'
import { Account } from '../models/Account';

export class AccountService {
    private readonly accountRepository: IAccountRepository
    constructor(accountRepository: IAccountRepository){
        this.accountRepository = accountRepository;
    }

    async getAccount (account: IAccount): Promise<Account>{
        const userAccount = await this.accountRepository.getAccount(account);
        if(!userAccount){
            throw new Error ('Account not find');
        }

        return userAccount;
    }

    async getAccountByAccountNumber(account: string):Promise<Account>{
        const user = await this.accountRepository.getAccountByAccountNumber(account);
        return user;
    }

    async updateBalanceInAccount(account: string, value: number):Promise<Account> {
        const userAccount = await this.accountRepository.getAccountByAccountNumber(account);

        if(!userAccount){
            throw new Error('Account not find');
        }

        const updatedUser = await this.accountRepository.updateBalance(userAccount.accountNumber, value);

        if(!updatedUser){
            throw new Error();
        }
        return updatedUser;
    }
}
