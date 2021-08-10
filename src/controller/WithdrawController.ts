import { Request, Response } from 'express';
import { WithdrawService } from '../services/WithdrawService';
import { WithdrawRepository } from '../repositories/WithdrawRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';
import { TransactionTypes } from '../enums/TransactionTypes';
import AccountRepository  from '../repositories/AccountRepository'
export class WithdrawController {
    
    async makeWithdraw(req: Request, res: Response){
        try{
            const { body } = req;
            const requiredFields = ['value'];

            for(const field of requiredFields){
                if(!body[field]){
                    return res.status(400).json(new Error(`${field} is not find`));
                }
            }
            const accountRepository = new AccountRepository();
            const account = await accountRepository.getAccountById(body.id);
            const transactionRepository = new TransactionRepository();

            const transaction = await transactionRepository.saveTransaction({
                account_number: body.accountNumber, type: TransactionTypes.SAQUE
            });

            const withdrawService = new WithdrawService(new WithdrawRepository());

            const withdraw = await withdrawService.makeWithdraw({
                transaction_id: transaction.id,
                value: body.value,
                valueInAccount:account.balance,
                accountNumber: account.account_number
            });
            return res.status(200).json(withdraw);
        }catch(e){
            return res.status(400).json({message: e.message});
        }
    }
}
