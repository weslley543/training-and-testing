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
            value: 500,
            value_restant:500,
            account_number: 'any_account',
            created_at: new Date()
        });


        expect(withdraw).toBeTruthy()
        expect(withdraw.id).toBeTruthy()
        expect(withdraw.value).toBe(500)
        expect(withdraw.value_restant).toBe(500)
    });
});
