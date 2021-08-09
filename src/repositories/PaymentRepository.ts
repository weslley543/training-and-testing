import { IPayment } from '../interfaces/IPayment';
import { IPaymentRepository } from '../interfaces/IPaymentRepository';
import { Payment } from '../models/Payment';
import { MongoHelper } from '../helpers/MongoHelper';
export class PaymentRepository implements IPaymentRepository {

    async makePayment (payment: IPayment): Promise<Payment> {
        delete payment.valueInAccount;
        const accountCollection = await MongoHelper.getCollection('payment')
        const result = await accountCollection.insertOne(payment)

        return MongoHelper.map(result.ops[0]);
    }
}
