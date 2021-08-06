import { AccountRepositoryProtocol } from "../protocols/AccountRepositoryProtocol";
import { accountTransform } from "../transforms/AccountTransform";
import { IAccountData } from '../types/IAccountData'

export class AccountService {
    private readonly accountRepository: AccountRepositoryProtocol
    constructor(accountRepository: AccountRepositoryProtocol){
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
}
