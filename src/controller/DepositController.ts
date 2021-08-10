import { Request, Response } from 'express';
import { DepositService } from '../services/DepositService';
import { DepositRepository } from '../repositories/DepositRepository';
import { TransactionRepository } from '../repositories/TransactionRepository'
import { TransactionTypes } from '../enums/TransactionTypes'
import AccountRepository  from '../repositories/AccountRepository'

export class DepositController {


    async makeDepositUnlogged (req: Request, res: Response){
        try{
           const { body } = req;
           const requiredField = ['accountNumberTo', 'value'];
           
           for(let field of requiredField){
                if(!body[field]){
                    throw new Error(`${field} is required`);
                }
           }

           const accountRepository = new AccountRepository();
           const accountTo = await accountRepository.getAccountByAccountNumber(body.accountNumberTo);
           const valueToUpdate = Number(body.value) + accountTo.balance;
           const depositService = new DepositService(new DepositRepository());
           const transactionRepository = new TransactionRepository();
           const transaction = await transactionRepository.saveTransaction({
               account_number: '',
               type: TransactionTypes.DEPOSITO
           })
           const deposit = await depositService.makeDeposit({
               account_number_to: accountTo.account_number,
               value: Number(body.value),
               transaction_id: transaction.id
           })

           const account = await accountRepository.updateBalance(accountTo.account_number, valueToUpdate);
           delete account.password_hash;
           return res.status(200).json({ deposit, account });

        }catch(e){
            return res.status(400).json(e.message)
        }
    }
}
