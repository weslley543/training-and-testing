import { Deposit } from '../models/Deposit';
import { IDepositRepository } from '../interfaces/IDepositRepository';
import { IDeposit } from '../interfaces/IDeposit';
import { MongoHelper } from '../helpers/MongoHelper';
export class DepositRepository implements IDepositRepository{

    async makeDeposit (depositData: IDeposit): Promise<Deposit> {

        const accountCollection = await MongoHelper.getCollection('deposit')
        const result = await accountCollection.insertOne(depositData)
        return MongoHelper.map(result.ops[0]);
    }
}
