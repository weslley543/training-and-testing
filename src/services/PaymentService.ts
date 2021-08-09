import { IPayment } from '../interfaces/IPayment';
import { IPaymentRepository } from '../interfaces/IPaymentRepository'
import { Payment } from '../models/Payment';

export class PaymentService {
    private readonly paymentRepositoryProtocol: IPaymentRepository

    constructor(paymentRepositoryProtocol: IPaymentRepository) {
        this.paymentRepositoryProtocol = paymentRepositoryProtocol
    }

    async makePayment(paymentData: IPayment): Promise<Payment> {
        const valueToUpdateAccount  = paymentData.valueInAccount - paymentData.value;
        if(valueToUpdateAccount < 0){
            throw new Error('Insuficient balance');
        }
        const account = await this.paymentRepositoryProtocol.makePayment(paymentData);

        return account;
    }
}
