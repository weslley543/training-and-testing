import { IWithdraw } from '../interfaces/IWithdraw'
import { IWithdrawData } from '../interfaces/IWithdrawData'
import { IWithdrawRepository } from '../interfaces/IWithdrawRepository'
import { withdrawTransform } from '../transforms/WithdrawTransform'


export class WithdrawService {
   private readonly withdrawRepository: IWithdrawRepository

   constructor(withdrawRepository: IWithdrawRepository){
      this.withdrawRepository = withdrawRepository;
   }

   async makeWithdraw (withdraw: IWithdraw): Promise<IWithdrawData> {
      const valueRestant = withdraw.valueInAccount - withdraw.value;
      
      if(valueRestant < 0) {
         throw new Error('Insuficient balance');
      }
      
      const withdrawData = await this.withdrawRepository.makeWithdraw(withdraw);
      return withdrawTransform(withdrawData, valueRestant);
   }
}
