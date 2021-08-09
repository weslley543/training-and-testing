import { Request, Response } from 'express';
import { DepositService } from '../services/DepositService';
import { DepositRepository } from '../repositories/DepositRepository';
import { TransactionRepository } from '../repositories/TransactionRepository'
import { AccountService } from '../services/AccountService';
import { TransactionTypes } from '../enums/TransactionTypes'
import AccountRepository  from '../repositories/AccountRepository'

export class DepositController {
    private readonly depositService: DepositService;
    private readonly transactionRepository: TransactionRepository;
    private readonly accountService: AccountService;

    constructor(){
        const depositRepository = new DepositRepository();
        const accountRepository = new AccountRepository();
        this.depositService = new DepositService(depositRepository);
        this.transactionRepository = new TransactionRepository();
        this.accountService = new AccountService(accountRepository);
    }

    async makeDeposit (req: Request, res: Response){
        try{
            const { body } = req;
            const requiredFields = ['value', 'accountNumberTo'];

            for(const field of requiredFields){
                if(!body[field]){
                    return res.status(400).json(new Error(`${field} is not find`));
                }
            }
            const accountFrom = await this.accountService.getAccountByAccountNumber(body.accountNumberFrom);

            const transaction = await this.transactionRepository.saveTransaction({
                account_number: body.accountNumberFrom,
                type: TransactionTypes.DEPOSITO
            });


            const deposit = await this.depositService.makeDeposit({
                 value: body.value,
                 account_number_to: body.accountNumberTo,
                 transaction_id: transaction.id
            });

            const valueToUpdate = deposit.value + accountFrom.balance;

            await this.accountService.updateBalanceInAccount(deposit.account_number_to, valueToUpdate);

            return res.status(200).json(deposit);

        }catch(e){
            return res.status(400).json(e)
        }
    }
}
