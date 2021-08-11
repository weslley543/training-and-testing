import { Request, Response } from 'express';
import { PaymentService } from '../services/PaymentService';
import { PaymentRepository } from '../repositories/PaymentRepository';
import AccountRepository from '../repositories/AccountRepository';

export class PaymentController {
    async makePayment(req: Request, res: Response){
        try{

            const { body } = req;
            const requiredFields = ['value'];

            for(const field of requiredFields){
                if(!body[field]){
                    throw new Error(`${field} is not find`);
                }
            }

            const accountRepository = new AccountRepository();
            const account = await accountRepository.getAccountById(body.id);
            const paymentService = new PaymentService(new PaymentRepository());

            const payment = await paymentService.makePayment({
                value: body.value,
                valueInAccount:account.balance,
                account_number: account.account_number,
                created_at: new Date()
            });

            return res.status(200).json(payment);
        }catch(e){
            return res.status(400).json({message: e.message});
        }
    }
}
