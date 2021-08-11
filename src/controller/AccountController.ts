import { Request, Response } from 'express';
import { AccountService } from '../services/AccountService';
import AccountRepository from '../repositories/AccountRepository';
import singupTransform from '../transform/singupTransform';

 export default class AccountController {
    async getAccountByAccountNumber (req: Request, res: Response) {
      try{

            const { account_number }  = req.params;
            const accountService = new AccountService(new AccountRepository());
            const account = await accountService.getAccountByAccountNumber(account_number);

            const fieldsToDelete = ['balance', 'id', 'password_hash'];
            for(const field of fieldsToDelete){
                delete account[field];
            }

            return res.status(200).json(account);

        }catch(e){
            return res.status(400).json(e.message);
        }
    }

    async getAccount (req: Request, res: Response) {
        try{
            const requiredFields = ['accountNumber', 'passwordHash'];
            const { body } = req;

            for(const field of requiredFields){
                if(!body[field]){
                    throw new Error(`${field} is required`);
                }
            }
            const accountService = new AccountService(new AccountRepository());
            const account = await accountService.getAccount(body);
            delete account.password_hash;
            const singupData = singupTransform(account);
            return res.status(200).json(singupData);

        }catch(e){
            return res.status(400).json({ message: e.message });
        }
    }
    async signUp (req: Request, res: Response) {
        try{
            const { body } = req
            const requiredFields = ['account_number','name','password_hash'];

            for(const field of requiredFields){
                if(!body[field]){
                    throw new Error(`${field} is required`);
                }
            }

            const accountRepository = new AccountRepository();
            const isRegistred = await accountRepository.getAccountByAccountNumber(body.account_number);
            if(isRegistred){
                return res.status(400).json({ message: 'user already registered' });
            }
            const account = await accountRepository.createAccount({...body, balance: 0});
            return res.status(200).json(account);
          }catch(e){
              return res.status(400).json({ message: e.message });
          }
      }
}
