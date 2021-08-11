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
                value: 500,
                id:'any_id',
                value_restant:100,
                account_number: 'any_account',
                created_at: withdraw.created_at
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
            value: 500,
            valueInAccount: 200,
            value_restant: 100,
            created_at:new Date(),
            account_number:'any_account'
         };
         await expect(sut.makeWithdraw(valueToWithdraw)).rejects.toEqual(new Error('Insuficient balance'));
    });

    test('Should be throws when make withdraw throws', async () => {
        const { sut, withdrawRepository } = makeSut();
        const valueToWithdraw = {
            value: 500,
            valueInAccount: 200,
            value_restant: 100,
            created_at:new Date(),
            account_number:'any_account'
         };

         jest.spyOn(withdrawRepository, 'makeWithdraw').mockImplementationOnce(() => {
            throw new Error()
        })

        await expect(sut.makeWithdraw(valueToWithdraw)).rejects.toEqual(new Error());
    });

    test('Should be make withdraw', async () => {
        const { sut } = makeSut();
        const valueToWithdraw = {
            value: 500,
            valueInAccount: 200,
            value_restant: 400,
            created_at:new Date(),
            account_number:'any_account'
         };

         const value = await sut.makeWithdraw(valueToWithdraw);

         expect(value).toEqual({
            value: 500,
            valueInAccount: 200,
            value_restant: 400,
            created_at:valueToWithdraw.created_at,
            account_number:'any_account'
         })
    });
});
