import Transaction from '../models/Transaction';
import  { ITransaction } from '../interfaces/ITransaction';

export interface ITransactionRepository {
    saveTransaction(transactionData: ITransaction): Promise<Transaction>;
}
