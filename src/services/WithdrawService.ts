import { IWithdraw } from '../interfaces/IWithdraw'
import { IWithdrawRepository } from '../interfaces/IWithdrawRepository'
import { Withdraw } from '../models/Withdraw'
import AccountRepository  from '../repositories/AccountRepository'


export class WithdrawService {
   private readonly withdrawRepository: IWithdrawRepository;
   private readonly accountRepository: AccountRepository

   constructor(withdrawRepository: IWithdrawRepository){
      this.withdrawRepository = withdrawRepository;
      this.accountRepository = new AccountRepository();
   }

   async makeWithdraw (withdraw: IWithdraw): Promise<Withdraw> {
      const valueRestant = withdraw.valueInAccount - withdraw.value;

      if(valueRestant < 0) {
         throw new Error('Insuficient balance');
      }
      withdraw.value_restant= valueRestant;

      const withdrawData = await this.withdrawRepository.makeWithdraw(withdraw);
      await this.accountRepository.updateBalance(withdraw.accountNumber, valueRestant);
      return withdrawData;
   }
}
