import { DepositRepository } from '../repositories/DepositRepository';
import { WithdrawRepository } from '../repositories/WithdrawRepository';
import { PaymentRepository } from '../repositories/PaymentRepository';
import StatementTransform from '../transform/StatementTransform'
export class AccountStatementService {
    private  depositRepository: DepositRepository;
    private  withdrawRepository: WithdrawRepository;
    private  paymentRepository:  PaymentRepository
    constructor( ){
        this.depositRepository = new DepositRepository();
        this.withdrawRepository = new WithdrawRepository();
        this.paymentRepository = new PaymentRepository();
    }

    async getAccountStatement (accountNumber: string):Promise<any> {

          const deposits = await this.depositRepository.getAllDeposit(accountNumber) || [];
          const withdraws = await this.withdrawRepository.getAllWithdraw(accountNumber) || [];
          const payments = await this.paymentRepository.getAllPayments(accountNumber) || [];
          const result = StatementTransform({deposits ,withdraws, payments })
          return result;
    }
}
