import { AccountService } from '../../../src/services/AccountService'
import { IAccountRepository } from '../../../src/interfaces/IAccountRepository'
import Account from '../../../src/models/Account';
import { IAccountData } from '../../../src/interfaces/IAccountData'


interface SutTypes {
    sut: AccountService;
    accountRepository: IAccountRepository
}

const makeAccountRepository = () => {
    class AccountRepositoryStub implements IAccountRepository {
        async getAccount (account: IAccountData): Promise <Account> {
            return {
                accountNumber:'any_account_number',
                name: 'any_name',
                createdAt: new Date('2021-08-04T03:45:08.763Z'),
                updatedAt: new Date('2021-08-04T03:45:08.763Z'),
                balance: 500,
                passwordHash: 'any_password',
            } as Account;
        }
        async getAccountByAccountNumber(accountNumber: string): Promise<Account>{
            return {
                accountNumber:accountNumber,
                name: 'any_name',
                createdAt: new Date('2021-08-04T03:45:08.763Z'),
                updatedAt: new Date('2021-08-04T03:45:08.763Z'),
                balance: 500,
                passwordHash: 'any_password',
            } as Account;
        }
        async updateBalance(accountNumber: string, balance: number): Promise<Account>{
            return {
                accountNumber:accountNumber,
                name: 'any_name',
                createdAt: new Date('2021-08-04T03:45:08.763Z'),
                updatedAt: new Date('2021-08-04T03:45:08.763Z'),
                balance: balance,
                passwordHash: 'any_password',
            } as Account;
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
            name: 'any_name',
            account_number: 'any_account_number',
            createdAt: new Date('2021-08-04T03:45:08.763Z'),
            updatedAt: new Date('2021-08-04T03:45:08.763Z'),
            balance: 500
        });
    });

    test('Should be return account if account is finded and updated', async () => {
        const { sut } = makeSut()
        const account_number = 'any_account';
        const value = 200;        
        const account = await sut.updateBalanceInAccount(account_number, value);
        
        expect(account).toEqual({
            name: 'any_name',
            account_number: account_number,
            createdAt: new Date('2021-08-04T03:45:08.763Z'),
            updatedAt: new Date('2021-08-04T03:45:08.763Z'),
            balance: value
        });
    });

    test('Should be throw when find account throw', async () => {
        const { sut, accountRepository } = makeSut()
        const account_number = 'any_account';
        const value = 200;        
        const account = await sut.updateBalanceInAccount(account_number, value);
        jest.spyOn(accountRepository, 'getAccountByAccountNumber').mockImplementationOnce(() => {
            throw new Error()
        })

        await expect(sut.updateBalanceInAccount(account_number, value))
        .rejects
        .toEqual(new Error ());
    });

    test('Should be throw when update account throw', async () => {
        const { sut, accountRepository } = makeSut()
        const account_number = 'any_account';
        const value = 200;        
        const account = await sut.updateBalanceInAccount(account_number, value);
        jest.spyOn(accountRepository, 'updateBalance').mockImplementationOnce(() => {
            throw new Error()
        })

        await expect(sut.updateBalanceInAccount(account_number, value))
        .rejects
        .toEqual(new Error ());
    });
});
