import { MongoHelper } from '../helpers/MongoHelper';
import { IAccountRepository } from '../interfaces/IAccountRepository'
import { Account } from '../models/Account'
import { IAccount } from '../interfaces/IAccount';

export default class AccountRepository implements IAccountRepository {

    async getAccount (accountData: IAccount): Promise <Account> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const result = await accountCollection.findOne({account_number: accountData.accountNumber, password_hash: accountData.passwordHash})
        return MongoHelper.map(result);
    }

    async getAccountByAccountNumber(accountNumber: string): Promise<Account>{
        const accountCollection = await MongoHelper.getCollection('accounts')
        const result = await accountCollection.findOne({account_number: accountNumber});

        return MongoHelper.map(result);
    }

    async updateBalance(accountNumber: string, balance: number): Promise<Account>{
        const accountCollection = await MongoHelper.getCollection('accounts')
        const result = await accountCollection.findOneAndUpdate(
            {account_number: accountNumber}, 
            { $set: {balance} }, 
            {returnOriginal: false}
            );
        return MongoHelper.map(result.value);
    }
}
