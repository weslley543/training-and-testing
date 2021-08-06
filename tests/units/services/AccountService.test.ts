import { AccountService } from '../../../src/services/AccountService'
import { AccountRepositoryProtocol } from '../../../src/protocols/AccountRepositoryProtocol'
import Account from '../../../src/models/Account';
import { IAccountData } from '../../../src/types/IAccountData'


interface SutTypes {
    sut: AccountService;
    accountRepository: AccountRepositoryProtocol
}

const makeAccountRepository = () => {
    class AccountRepositoryStub implements AccountRepositoryProtocol {
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
    // test('Should be throws if account not found', async () => {
    //     const { sut,  accountRepository } = makeSut()
    //     const accountData = {
    //         accountNumber: 'any_account',
    //         passwordHash: 'any_password'
    //     }

    //     jest.spyOn(accountRepository, 'getAccount').mockImplementationOnce(() => {
    //         return null
    //     })

    //     await expect(sut.getAccount(accountData))
    //     .rejects
    //     .toEqual(new Error ('Account not find'));
    // });

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
});
