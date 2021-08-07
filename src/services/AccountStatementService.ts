import { IAccountRepository } from "../interfaces/IAccountRepository";
import { accountTransform } from "../transforms/AccountTransform";
import { IAccountData } from '../interfaces/IAccountData'

export class AccountStatementService {
    private readonly accountRepository: IAccountRepository
    constructor(accountRepository: IAccountRepository){
        this.accountRepository = accountRepository;
    }

    async getAccountStatement (accountNumber: string, data:Date, period: number = 30){
        const userAccount = await this.accountRepository.getAccount(account);
        if(!userAccount){
            throw new Error ('Account not find');
        }
        const parsedAccount = accountTransform(userAccount);

        return parsedAccount;
    }
}
