import { DepositService } from '../../../src/services/DepositService'
import { IDepositRepository } from '../../../src/interfaces/IDepositRepository'
import { IDeposit } from '../../../src/interfaces/IDeposit';
import  Deposit  from '../../../src/models/Deposit'

interface SutTypes {
    sut: DepositService,
    depositRepository: IDepositRepository
}

const makeDepositRepository = () => {
    class DepositRepositoryStub implements IDepositRepository{
        async makeDeposit (depositData: IDeposit): Promise<Deposit>{
            return {
                id: 1,
                transactionId:1,
                accountNumberTo:'any_account',
                value: 500,
                createdAt: new Date('2021-08-04T03:45:08.763Z')
            } as Deposit
        }
    }

    return new DepositRepositoryStub()
}

const makeSut = () : SutTypes => {
    const depositRepository = makeDepositRepository()
    const sut = new DepositService(depositRepository);

    return { sut, depositRepository };
}

describe('Deposit Service', () => {
    test('Should be make deposit', async () => {
        const { sut, depositRepository } = makeSut()
        const deposit = {
            id: 1,
            transactionId: 1,
            accountNumberTo: 'any_account',
            value: 500,
            createdAt: new Date('2021-08-04T03:45:08.763Z')
        };
        const makeDepositSpy = jest.spyOn(depositRepository, 'makeDeposit');

        const account = await sut.makeDeposit(deposit);
        expect(makeDepositSpy).toHaveBeenCalled();
        expect(account).toEqual({
            value: 500,
            account_to: 'any_account',
            created_at: new Date('2021-08-04T03:45:08.763Z'),
            transaction_id: 1
        });
    });

    test('Should be throws when make deposit throws', async () => {
        const { sut, depositRepository } = makeSut()
        const deposit = {
            id: 1,
            transactionId: 1,
            accountNumberTo: 'any_account',
            value: 500,
            createdAt: new Date('2021-08-04T03:45:08.763Z')
        };
        jest.spyOn(depositRepository, 'makeDeposit').mockImplementationOnce(() => {
            throw new Error();
        });
        
        await expect(sut.makeDeposit(deposit)).rejects
        .toEqual(new Error ());
       
    });
});
