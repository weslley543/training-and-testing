import { Request, Response } from 'express';
import { WithdrawService } from '../services/WithdrawService';
import { WithdrawRepository } from '../repositories/WithdrawRepository';
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


            const withdrawService = new WithdrawService(new WithdrawRepository());

            const withdraw = await withdrawService.makeWithdraw({
                value: body.value,
                valueInAccount:account.balance,
                account_number: account.account_number,
                created_at: new Date()
            });
            return res.status(200).json(withdraw);
        }catch(e){
            return res.status(400).json({message: e.message});
        }
    }
}
