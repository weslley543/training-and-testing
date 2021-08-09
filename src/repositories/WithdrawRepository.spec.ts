import { MongoHelper } from '../helpers/MongoHelper';
import  { WithdrawRepository }  from './WithdrawRepository';

describe('Account Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)        
    })
    afterAll(async () => {
        const depositCollection = await MongoHelper.getCollection('withdraw');
        await depositCollection.deleteMany({})
        await MongoHelper.disconnect();
    })
    
    test('should return an withdraw on success', async () => {
        const sut = new WithdrawRepository()
        const withdraw = await sut.makeWithdraw({
            transaction_id: 'any_transaction',
            value: 500,
            value_restant: 300
        });
        
        
        expect(withdraw).toBeTruthy()
        expect(withdraw.id).toBeTruthy()
        expect(withdraw.transaction_id).toBe('any_transaction')
        expect(withdraw.value).toBe(500)
        expect(withdraw.value_restant).toBe(300)
    });
});
