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
            transaction_id: 'any_transaction',
            value: 500,
            valueInAccount:50
        })
        
        expect(deposit).toBeTruthy()
        expect(deposit.id).toBeTruthy()
        expect(deposit.transaction_id).toBe('any_transaction')
        expect(deposit.value).toBe(500)
    });
})