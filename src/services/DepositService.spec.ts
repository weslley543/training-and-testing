import { DepositService } from './DepositService'
import { IDepositRepository } from '../interfaces/IDepositRepository'
import { IDeposit } from '../interfaces/IDeposit';
import  { Deposit }  from '../models/Deposit'

interface SutTypes {
    sut: DepositService,
    depositRepository: IDepositRepository
}

const makeDepositRepository = () => {
    class DepositRepositoryStub implements IDepositRepository{
        async makeDeposit (depositData: IDeposit): Promise<Deposit>{
            return {
                id: 'any_id',
                transaction_id:'any_id',
                account_number_to :'any_account_id',
                value: 400
            }
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
            value:500,
            account_number_to: 'any_account',
            transaction_id: 'any_id',
        };
        const makeDepositSpy = jest.spyOn(depositRepository, 'makeDeposit');

        const account = await sut.makeDeposit(deposit);
        expect(makeDepositSpy).toHaveBeenCalled();
        expect(account).toEqual({
                id: 'any_id',
                transaction_id:'any_id',
                account_number_to :'any_account_id',
                value: 400
        });
    });

    test('Should be throws when make deposit throws', async () => {
        const { sut, depositRepository } = makeSut()
        const deposit = {
            value:500,
            account_number_to: 'any_account',
            transaction_id: 'any_id',
        };
        jest.spyOn(depositRepository, 'makeDeposit').mockImplementationOnce(() => {
            throw new Error();
        });

        await expect(sut.makeDeposit(deposit)).rejects
        .toEqual(new Error ());

    });
});
