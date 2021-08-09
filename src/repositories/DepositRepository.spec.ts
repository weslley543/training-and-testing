import { MongoHelper } from '../helpers/MongoHelper';
import  { DepositRepository }  from './DepositRepository';

describe('Account Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)        
    })
    afterAll(async () => {
        const depositCollection = await MongoHelper.getCollection('deposits');
        await depositCollection.deleteMany({})
        await MongoHelper.disconnect();
    })
    
    test('should return an deposit on success', async () => {
        const sut = new DepositRepository()
        const deposit = await sut.makeDeposit({
            account_number_to: 'any_account_to',
            transaction_id: 'any_transaction',
            value: 500
        })
        expect(deposit).toBeTruthy()
        expect(deposit.id).toBeTruthy()
        expect(deposit.account_number_to).toBe('any_account_to')
        expect(deposit.transaction_id).toBe('any_transaction')
        expect(deposit.value).toBe(500)
    });
})