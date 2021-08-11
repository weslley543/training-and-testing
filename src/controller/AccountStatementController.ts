import { Request, Response } from 'express';
import { AccountStatementService } from '../services/AccountStatementService';
import AccountRepository from '../repositories/AccountRepository';


export class AccountStatementController {
    async getAccountStatement(req: Request, res: Response){
        try{
            const { body } = req;
            const accountRepository = new AccountRepository();
            const account = await accountRepository.getAccountById(body.id);
            const accountStatementService = new AccountStatementService();
            const result = await accountStatementService.getAccountStatement(account.account_number);
            return res.status(200).json(result);
        }catch(e){
            return res.status(400).json({message: e.message})
        }
    }
}
