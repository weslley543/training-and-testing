import { IWithdraw } from '../interfaces/IWithdraw'
import { IWithdrawRepository } from '../interfaces/IWithdrawRepository'
import { Withdraw } from '../models/Withdraw'


export class WithdrawService {
   private readonly withdrawRepository: IWithdrawRepository

   constructor(withdrawRepository: IWithdrawRepository){
      this.withdrawRepository = withdrawRepository;
   }

   async makeWithdraw (withdraw: IWithdraw): Promise<Withdraw> {
      const valueRestant = withdraw.valueInAccount - withdraw.value;

      if(valueRestant < 0) {
         throw new Error('Insuficient balance');
      }
      withdraw.value_restant= valueRestant;

      const withdrawData = await this.withdrawRepository.makeWithdraw(withdraw);
      return withdrawData;
   }
}
