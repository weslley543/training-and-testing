import Payment from '../models/Payment';
import { IPayment } from '../interfaces/IPayment';

export interface IPaymentRepository {
    makePayment(paymentData: IPayment): Promise<Payment>;
}
