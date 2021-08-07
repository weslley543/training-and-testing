import { IAccountRepository } from "../interfaces/IAccountRepository";
import { accountTransform } from "../transforms/AccountTransform";
import { IAccountData } from '../interfaces/IAccountData'

export class AccountService {
    private readonly accountRepository: IAccountRepository
    constructor(accountRepository: IAccountRepository){
        this.accountRepository = accountRepository;
    }

    async getAccount (account: IAccountData){
        const userAccount = await this.accountRepository.getAccount(account);
        if(!userAccount){
            throw new Error ('Account not find');
        }
        const parsedAccount = accountTransform(userAccount);

        return parsedAccount;
    }

    async updateBalanceInAccount(account: string, value: number) {
        const userAccount = await this.accountRepository.getAccountByAccountNumber(account);
        
        if(!userAccount){
            throw new Error('Account not find');
        }
       
        const updatedUser = await this.accountRepository.updateBalance(userAccount.accountNumber, value);

        if(!updatedUser){
            throw new Error();
        }
        return accountTransform(updatedUser);
    }
}
