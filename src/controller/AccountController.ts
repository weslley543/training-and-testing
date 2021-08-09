import { Request, Response } from 'express';
import { AccountService } from '../services/AccountService';
import AccountRepository from '../repositories/AccountRepository';

export class AccountController {
    private accountService: AccountService;
    constructor() {
        const accountRepository = new AccountRepository();
        this.accountService = new AccountService(accountRepository);
    }

    async getAccountByAccountNumber (req: Request, res: Response) {
        try{
            const { accountNumber }  = req.body;
            const account = await this.accountService.getAccountByAccountNumber(accountNumber);
            return res.json(account)
        }catch(e){
            return res.status(400).json(e);
        }
    }

    async getAccount (req: Request, res: Response) {
        try{
            const requiredFields = ['accountNumber', 'password'];
            const { body } = req;

            for(const field of requiredFields){
                if(!body[field]){
                    throw new Error(`${field} is required`);
                }
            }
            const account = this.accountService.getAccount(req.body);
            return res.status(200).json(account)
        }catch(e){
            return res.status(400).json(e);
        }
    }
}
