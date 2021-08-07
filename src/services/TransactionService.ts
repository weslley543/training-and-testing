import { ITransaction } from '../interfaces/ITransactionData'
import { ITransactionRepository } from '../interfaces/ITransactionRepository'

export class TransactionService {
    private readonly transactionRepository: ITransactionRepository
    
    constructor(paymentRepositoryProtocol: ITransactionRepository) {
        this.transactionRepository = paymentRepositoryProtocol
    }

    async saveTransacation(transactionData: ITransaction): Promise<ITransaction> {
        throw new Error();
    }
}
