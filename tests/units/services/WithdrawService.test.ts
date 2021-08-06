import { WithdrawService } from '../../../src/services/WithdrawService'
import { WithdrawRepositoryProtocol } from '../../../src/protocols/WithdrawRepositoryProtocol'
import { IWithdraw } from '../../../src/types/IWithdraw';
import  Withdraw  from '../../../src/models/Withdraw'

interface SutTypes {
    sut: WithdrawService,
    withdrawRepository: WithdrawRepositoryProtocol
}

const makeWithdrawRepository = () => {
    class WithdrawRepositoryStub implements WithdrawRepositoryProtocol {
        async makeWithdraw (withdraw: IWithdraw): Promise<Withdraw> {
            return {
                id: 1,
                transactionId:1,
                value: 1000,
                createdAt: new Date('2021-08-04T03:45:08.763Z')
            } as Withdraw
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
            transactionId: 1,
            value: 1000,
            valueInAccount: 500,
         };
         await expect(sut.makeWithdraw(valueToWithdraw)).rejects.toEqual(new Error('Insuficient balance'));
    });

    test('Should be throws when make withdraw throws', async () => {
        const { sut, withdrawRepository } = makeSut();
        const valueToWithdraw = {
            transactionId: 1,
            value: 1000,
            valueInAccount: 1500,
         };

         jest.spyOn(withdrawRepository, 'makeWithdraw').mockImplementationOnce(() => {
            throw new Error()
        })

        await expect(sut.makeWithdraw(valueToWithdraw)).rejects.toEqual(new Error());
    });

    test('Should be make withdraw', async () => {
        const { sut } = makeSut();
        const valueToWithdraw = {
            transactionId: 1,
            value: 1000,
            valueInAccount: 1500,
         };

         const value = await sut.makeWithdraw(valueToWithdraw);

         expect(value).toEqual({
            id: 1,
            transaction_id: 1,
            value: 1000,
            created_at: new Date('2021-08-04T03:45:08.763Z'),
            value_to_update_account: 500,
         })
    });
});
