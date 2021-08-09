import { Request, Response } from 'express';
import { PaymentService } from '../services/PaymentService';
import { PaymentRepository } from '../repositories/PaymentRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';
import { TransactionTypes } from '../enums/TransactionTypes';

export class PaymentController {
    private readonly paymentService: PaymentService;
    private readonly transactionRepository: TransactionRepository

    constructor(){
        const paymentRepository = new PaymentRepository()
        this.paymentService = new PaymentService(paymentRepository);
        this.transactionRepository = new TransactionRepository();
    }

    async makePayment(req: Request, res: Response){
        try{
            const { body } = req;
            const requiredFields = ['value', 'valueInAccount', 'accountNumber'];

            for(const field of requiredFields){
                if(!body[field]){
                    return res.status(400).json(new Error(`${field} is not find`));
                }
            }
            const transaction = await this.transactionRepository.saveTransaction({
                account_number: body.accountNumber, type: TransactionTypes.SAQUE
            });

            const payment = await this.paymentService.makePayment({
                transaction_id: transaction.id,
                value: body.value,
                valueInAccount:body.valueInAccount,
            });
            return res.status(200).json(payment);
        }catch(e){
            return res.status(400).json(e);
        }
    }
}
