import { MongoHelper } from '../helpers/MongoHelper';
import  AccountRepository  from './AccountRepository';

describe('Account Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
        const accountCollection = await MongoHelper.getCollection('accounts');
        await accountCollection.insertOne({
            account_number: 'any_account',
            name: 'any_name',
            balance: 500,
            password_hash: 'any_password'
        });

    })
    afterAll(async () => {
        await MongoHelper.disconnect();
        const accountCollection = await MongoHelper.getCollection('accounts');
        await accountCollection.deleteMany({})
    })

    test('should return an account on success', async () => {
        const sut = new AccountRepository()
        const account = await sut.getAccount({
            accountNumber:'any_account',
            passwordHash: 'any_password'
        })

        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.account_number).toBe('any_account')
        expect(account.password_hash).toBe('any_password')
        expect(account.balance).toBe(500)
    });
    test('should return an account', async () => {
        const sut = new AccountRepository()
        const account = await sut.getAccountByAccountNumber('any_account');

        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.account_number).toBe('any_account')
        expect(account.password_hash).toBe('any_password')
        expect(account.balance).toBe(500)
    });

    test('should account balance is updated', async () => {
        const sut = new AccountRepository()
        const account = await sut.updateBalance('any_account', 600)

        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.account_number).toBe('any_account')
        expect(account.password_hash).toBe('any_password')
        expect(account.balance).toBe(600)
    });
});
