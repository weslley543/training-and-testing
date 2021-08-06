import { IWithdraw } from '../types/IWithdraw'
import { IWithdrawData } from '../types/IWithdrawData'
import { WithdrawRepositoryProtocol } from '../protocols/WithdrawRepositoryProtocol'
import { withdrawTransform } from '../transforms/WithdrawTransform'


export class WithdrawService {
   private readonly withdrawRepository: WithdrawRepositoryProtocol

   constructor(withdrawRepository: WithdrawRepositoryProtocol){
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

