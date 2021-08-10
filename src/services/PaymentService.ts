import { IPayment } from '../interfaces/IPayment';
import { IPaymentRepository } from '../interfaces/IPaymentRepository'
import { Payment } from '../models/Payment';
import AccountRepository from '../repositories/AccountRepository';

export class PaymentService {
    private readonly paymentRepositoryProtocol: IPaymentRepository
    private readonly accountRepository: AccountRepository

    constructor(paymentRepositoryProtocol: IPaymentRepository) {
        this.paymentRepositoryProtocol = paymentRepositoryProtocol
        this.accountRepository = new AccountRepository();
    }

    async makePayment(paymentData: IPayment): Promise<Payment> {
        const valueToUpdateAccount  = paymentData.valueInAccount - paymentData.value;
        if(valueToUpdateAccount < 0){
            throw new Error('Insuficient balance');
        }
        const payment = await this.paymentRepositoryProtocol.makePayment(paymentData);
        await this.accountRepository.updateBalance(paymentData.accountNumber, valueToUpdateAccount)
        return payment;
    }
};

