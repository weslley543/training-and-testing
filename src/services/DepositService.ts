import { Deposit } from '../models/Deposit'
import { IDeposit } from '../interfaces/IDeposit';
import { IDepositRepository } from '../interfaces/IDepositRepository'


export class DepositService {
   private readonly depositRepository: IDepositRepository

   constructor(depositRepository: IDepositRepository){
      this.depositRepository = depositRepository;
   }

   async makeDeposit (accountData: IDeposit): Promise<Deposit> {
      const deposit = await this.depositRepository.makeDeposit(accountData)
      return deposit;
   }
}
