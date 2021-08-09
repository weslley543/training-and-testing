import { Transaction } from '../models/Transaction';
import { ITransactionRepository } from '../interfaces/ITransactionRepository';
import { ITransaction } from '../interfaces/ITransaction';
import { MongoHelper } from '../helpers/MongoHelper';

export class TransactionRepository implements ITransactionRepository {

    async saveTransaction(transactionData: ITransaction): Promise<Transaction> {
        const accountCollection = await MongoHelper.getCollection('withdraw')
        const result = await accountCollection.insertOne(transactionData)

        return MongoHelper.map(result.ops[0]);
    }
}
