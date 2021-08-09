import { AccountService } from './AccountService'
import { IAccountRepository } from '../interfaces/IAccountRepository'
import  { Account } from '../models/Account';
import { IAccount } from '../interfaces/IAccount'


interface SutTypes {
    sut: AccountService;
    accountRepository: IAccountRepository
}

const makeAccountRepository = () => {
    class AccountRepositoryStub implements IAccountRepository {
        async getAccount (account: IAccount): Promise <Account> {
            return {
                account_number: 'any_account',
                name: 'any_name',
                balance: 500,
                id:'any_id',
                password_hash:'any_password'
            }
        }
        async getAccountByAccountNumber(accountNumber: string): Promise<Account>{
            return {
                account_number : accountNumber,
                name: 'any_name',
                balance: 500,
                id:'any_id',
                password_hash:'any_password'
            } 
        }
        async updateBalance(accountNumber: string, balance: number): Promise<Account>{
            return {
                account_number: 'any_account',
                name: 'any_name',
                balance,
                id:'any_id',
                password_hash:'any_password'
            }
        }
    }
    return new AccountRepositoryStub();
}

const makeSut = () : SutTypes => {
    const accountRepository = makeAccountRepository();
    const sut = new AccountService(accountRepository);
    return {
        sut,
        accountRepository
    }
}

describe('Account Service', () => {
    test('Should be throws if accountRepository throws', async () => {
        const { sut,  accountRepository } = makeSut()
        const accountData = {
            accountNumber: 'any_account',
            passwordHash: 'any_password'
        }

        jest.spyOn(accountRepository, 'getAccount').mockImplementationOnce(() => {
            throw new Error()
        })

        await expect(sut.getAccount(accountData))
        .rejects
        .toEqual(new Error ());
    });

    test('Should be return account if account is finded', async () => {
        const { sut } = makeSut()

        const accountData = {
            accountNumber: 'any_account',
            passwordHash: 'any_password'
        };

        const account = await sut.getAccount(accountData);

        expect(account).toEqual({
            account_number: 'any_account',
            name: 'any_name',
            balance: 500,
            id:'any_id',
            password_hash:'any_password'
        });
    });

    test('Should be return account if account is finded and updated', async () => {
        const { sut } = makeSut()
        const accountNumber = 'any_account';
        const value = 200;
        const account = await sut.updateBalanceInAccount(accountNumber, value);

        expect(account).toEqual({
            name: 'any_name',
            account_number: 'any_account',
            balance: value,
            id:'any_id',
            password_hash:'any_password'
        });
    });

    test('Should be throw when find account throw', async () => {
        const { sut, accountRepository } = makeSut()
        const accountNumber = 'any_account';
        const value = 200;
        const account = await sut.updateBalanceInAccount(accountNumber, value);
        jest.spyOn(accountRepository, 'getAccountByAccountNumber').mockImplementationOnce(() => {
            throw new Error()
        })

        await expect(sut.updateBalanceInAccount(accountNumber, value))
        .rejects
        .toEqual(new Error ());
    });

    test('Should be throw when update account throw', async () => {
        const { sut, accountRepository } = makeSut()
        const accountNumber = 'any_account';
        const value = 200;
        const account = await sut.updateBalanceInAccount(accountNumber, value);
        jest.spyOn(accountRepository, 'updateBalance').mockImplementationOnce(() => {
            throw new Error()
        })

        await expect(sut.updateBalanceInAccount(accountNumber, value))
        .rejects
        .toEqual(new Error ());
    });
});
