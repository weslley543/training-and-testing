import { PaymentService } from './PaymentService'
import { IPaymentRepository } from '../interfaces/IPaymentRepository'
import { IPayment } from '../interfaces/IPayment';
import  { Payment }  from '../models/Payment'

interface SutTypes {
    sut: PaymentService,
    paymentRepository: IPaymentRepository
}

const makePaymentRepository = () => {
    class PaymentRepositoryStub implements IPaymentRepository {
        async makePayment (payment: IPayment): Promise<Payment> {
            return {
                value:500,

                id: 'any_id'
            }
        }
    }

    return new PaymentRepositoryStub();
}

const makeSut = () : SutTypes => {
    const paymentRepository = makePaymentRepository()
    const sut = new PaymentService(paymentRepository);

    return { sut, paymentRepository };
}

describe('Withdraw Service', () => {
    test('Should be throw when dont have suficient found ', async () => {
        const { sut } = makeSut();
        const valueToPay = {
    
            value: 1000,
            valueInAccount: 500
         };
         await expect(sut.makePayment(valueToPay)).rejects.toEqual(new Error('Insuficient balance'));
    });

    test('Should be throws when make payment throws', async () => {
        const { sut, paymentRepository } = makeSut();
        const valueToPay = {
            value: 1000,
            valueInAccount: 1500
         };

         jest.spyOn(paymentRepository, 'makePayment').mockImplementationOnce(() => {
            throw new Error()
        })

        await expect(sut.makePayment(valueToPay)).rejects.toEqual(new Error());
    });

    test('Should be make payment', async () => {
        const { sut } = makeSut();
        const valueToPay = {
            value:500,

            valueInAccount: 1500
         };

         const value = await sut.makePayment(valueToPay);

         expect(value).toEqual({
            value:500,
            id: 'any_id'
         })
    });
});
