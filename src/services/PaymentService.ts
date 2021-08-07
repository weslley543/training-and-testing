import { IPaymentData } from "../interfaces/IPaymentData";
import { IPayment } from "../interfaces/IPayment";
import { IPaymentRepository } from '../interfaces/IPaymentRepository'
import { paymentTransform } from "../transforms/PaymentTransfrom";

export class PaymentService {
    private readonly paymentRepositoryProtocol: IPaymentRepository
    
    constructor(paymentRepositoryProtocol: IPaymentRepository) {
        this.paymentRepositoryProtocol = paymentRepositoryProtocol
    }

    async makePayment(paymentData: IPayment): Promise<IPaymentData> {
        const valueToUpdateAccount  = paymentData.valueInAccount - paymentData.value;
        if(valueToUpdateAccount < 0){
            throw new Error('Insuficient balance');
        }
        const account = await this.paymentRepositoryProtocol.makePayment(paymentData);
        
        return paymentTransform(account, valueToUpdateAccount);
    }
}
