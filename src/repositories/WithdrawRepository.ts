import { Withdraw } from '../models/Withdraw';
import { IWithdrawRepository } from '../interfaces/IWithdrawRepository';
import { MongoHelper } from '../helpers/MongoHelper';
import { IWithdraw } from '../interfaces/IWithdraw';
export class WithdrawRepository implements IWithdrawRepository {

    async makeWithdraw (withdraw: IWithdraw): Promise<Withdraw> {
        delete withdraw.valueInAccount;
        const accountCollection = await MongoHelper.getCollection('withdraw')
        const result = await accountCollection.insertOne(withdraw)
        return MongoHelper.map(result.ops[0]);
    }
    async getAllWithdraw(accountNumber: string): Promise<Withdraw[]>{
        const withdrawCollection = await MongoHelper.getCollection('withdraw');
        const result = await withdrawCollection.find({account_number: accountNumber}).toArray();
        return result;
    }
}
