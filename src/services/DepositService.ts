import { IDeposit } from '../interfaces/IDeposit'
import { IDepositData } from '../interfaces/IDepositData'
import { IDepositRepository } from '../interfaces/IDepositRepository'
import { depositTransform } from '../transforms/DepositTransform'

export class DepositService {
   private readonly depositRepository: IDepositRepository

   constructor(depositRepository: IDepositRepository){
      this.depositRepository = depositRepository;
   }

   async makeDeposit (accountData: IDeposit): Promise<IDepositData> {
      const deposit = await this.depositRepository.makeDeposit(accountData)
      return depositTransform(deposit)
   }

}
