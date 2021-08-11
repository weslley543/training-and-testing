import { ObjectId } from 'mongodb'
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
        if(result){
            return MongoHelper.map(result);
        }
        return null;
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

    async createAccount(account: Account): Promise<Account>{
        const accountCollection = await MongoHelper.getCollection('accounts');
        const result = await accountCollection.insertOne(account);
        return MongoHelper.map(result.ops[0]);

    }

    async getAccountById (id: string): Promise<Account> {
        const objectId = new ObjectId(id);
        const accountCollection = await MongoHelper.getCollection('accounts');
        const result = await accountCollection.findOne(objectId);
        return MongoHelper.map(result);
    }
}
