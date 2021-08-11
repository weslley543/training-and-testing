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
            value:500,
            account_number_to: 'any_account_to',
            created_at: new Date('2021-08-10T23:26:37.419Z')
        })
        expect(deposit).toBeTruthy()
        expect(deposit.id).toBeTruthy()
        expect(deposit.account_number_to).toBe('any_account_to')
        expect(deposit.value).toBe(500)
        expect(deposit.created_at).toBe('2021-08-10T23:26:37.419Z')
    });
})