import Payment from '../models/Payment'
import { IPaymentData } from '../interfaces/IPaymentData'

export const paymentTransform = (payment: Payment, valueRestant: number): IPaymentData => {
    return {
        id: payment.id,
        transaction_id: payment.transactionId,
        value: payment.value,
        created_at: payment.createdAt,
        value_to_update_account: valueRestant
    };
};
