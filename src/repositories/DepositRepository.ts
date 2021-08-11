import { Deposit } from '../models/Deposit';
import { IDepositRepository } from '../interfaces/IDepositRepository';
import { IDeposit } from '../interfaces/IDeposit';
import { MongoHelper } from '../helpers/MongoHelper';
export class DepositRepository implements IDepositRepository{

    async makeDeposit (depositData: IDeposit): Promise<Deposit> {

        const depositCollection = await MongoHelper.getCollection('deposit')
        const result = await depositCollection.insertOne(depositData)
        return MongoHelper.map(result.ops[0]);
    }
    async getAllDeposit(accountNumber: string): Promise<Deposit[]>{
        const depositCollection = await MongoHelper.getCollection('deposit');
        const result = await depositCollection.find({account_number_to: accountNumber}).toArray();
        return result;
    }
}
