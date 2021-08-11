import { MongoHelper } from '../helpers/MongoHelper';
import  { PaymentRepository }  from './PaymentRepository';

describe('Account Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })
    afterAll(async () => {
        const depositCollection = await MongoHelper.getCollection('payments');
        await depositCollection.deleteMany({})
        await MongoHelper.disconnect();
    })

    test('should return an deposit on success', async () => {
        const sut = new PaymentRepository()
        const deposit = await sut.makePayment({
            value: 500,
            valueInAccount: 500,
            account_number: 'any_account',
            created_at: new Date()
        })

        expect(deposit).toBeTruthy()
        expect(deposit.id).toBeTruthy()
        expect(deposit.value).toBe(500)
    });
})