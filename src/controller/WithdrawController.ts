import { Request, Response } from 'express';
import { WithdrawService } from '../services/WithdrawService';
import { WithdrawRepository } from '../repositories/WithdrawRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';
import { TransactionTypes } from '../enums/TransactionTypes';

export class WithdrawController {
    private readonly withdrawService: WithdrawService;
    private readonly transactionRepository: TransactionRepository

    constructor(){
        const withdrawRepository = new WithdrawRepository()
        this.withdrawService = new WithdrawService(withdrawRepository);
        this.transactionRepository = new TransactionRepository();
    }

    async makeWithdraw(req: Request, res: Response){
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

            const withdraw = await this.withdrawService.makeWithdraw({
                transaction_id: transaction.id,
                value: body.value,
                valueInAccount:body.valueInAccount,
            });
            return res.status(200).json(withdraw);
        }catch(e){
            return res.status(400).json(e);
        }
    }
}
