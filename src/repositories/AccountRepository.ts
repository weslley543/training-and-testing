import Account from '../models/Account'
import {AccountRepositoryProtocol} from '../protocols/AccountRepositoryProtocol'
import { IAccountData } from '../types/IAccountData';

export default class AccountRepository implements AccountRepositoryProtocol {
    protected model = Account;

    async getAccount (accountData: IAccountData): Promise <Account> {
        const { accountNumber, passwordHash } = accountData;
        const account = this.model.findOne({ where : { accountNumber, passwordHash } })
        return new Promise(resolve => resolve(account))
    }
}
