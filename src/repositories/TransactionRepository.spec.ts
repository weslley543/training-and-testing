import { MongoHelper } from '../helpers/MongoHelper';
import  { TransactionRepository }  from './TransactionRepository';

describe('Account Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)        
    })
    afterAll(async () => {
        const depositCollection = await MongoHelper.getCollection('transactions');
        await depositCollection.deleteMany({})
        await MongoHelper.disconnect();
    })
    
    test('should return an deposit on success', async () => {
        const sut = new TransactionRepository()
        const deposit = await sut.saveTransaction({
            account_number: 'any_account',
            type: 3
        })
        
        expect(deposit).toBeTruthy()
        expect(deposit.id).toBeTruthy()
        expect(deposit.account_number).toBe('any_account')
        expect(deposit.type).toBe(3)
    });
});
