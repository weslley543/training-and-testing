import { WithdrawService } from './WithdrawService'
import { IWithdrawRepository } from '../interfaces/IWithdrawRepository'
import { IWithdraw } from '../interfaces/IWithdraw';
import  { Withdraw }  from '../models/Withdraw'

interface SutTypes {
    sut: WithdrawService,
    withdrawRepository: IWithdrawRepository
}

const makeWithdrawRepository = () => {
    class WithdrawRepositoryStub implements IWithdrawRepository {
        async makeWithdraw (withdraw: IWithdraw): Promise<Withdraw> {
            return {
                transaction_id: 'any_transaction',
                value: 500,
                value_restant: 100,
                id: 'any_id'
            }
        }
    }

    return new WithdrawRepositoryStub();
}

const makeSut = () : SutTypes => {
    const withdrawRepository = makeWithdrawRepository()
    const sut = new WithdrawService(withdrawRepository);

    return { sut, withdrawRepository };
}

describe('Withdraw Service', () => {
    test('Should be throw when dont have suficient found ', async () => {
        const { sut } = makeSut();
        const valueToWithdraw = {
            transaction_id: 'any_transaction',
            value: 500,
            valueInAccount: 200,
            value_restant: 1000,
         };
         await expect(sut.makeWithdraw(valueToWithdraw)).rejects.toEqual(new Error('Insuficient balance'));
    });

    test('Should be throws when make withdraw throws', async () => {
        const { sut, withdrawRepository } = makeSut();
        const valueToWithdraw = {
            transaction_id: 'any_transaction',
            value: 500,
            valueInAccount: 600,
            value_restant: 100,
         };

         jest.spyOn(withdrawRepository, 'makeWithdraw').mockImplementationOnce(() => {
            throw new Error()
        })

        await expect(sut.makeWithdraw(valueToWithdraw)).rejects.toEqual(new Error());
    });

    test('Should be make withdraw', async () => {
        const { sut } = makeSut();
        const valueToWithdraw = {
            transaction_id: 'any_transaction',
            value: 500,
            valueInAccount: 600,
            value_restant: 100,
         };

         const value = await sut.makeWithdraw(valueToWithdraw);

         expect(value).toEqual({
            transaction_id: 'any_transaction',
            value: 500,
            value_restant: 100,
            id:'any_id'
         })
    });
});
