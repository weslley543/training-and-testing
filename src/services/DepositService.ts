import { IDeposit } from '../types/IDeposit'
import { IDepositData } from '../types/IDepositData'
import { DepositRepositoryProtocol } from '../protocols/DepositRepositoryProtocol'
import { depositTransform } from '../transforms/DepositTransform'

export class DepositService {
   private readonly depositRepository: DepositRepositoryProtocol

   constructor(depositRepository: DepositRepositoryProtocol){
      this.depositRepository = depositRepository;
   }

   async makeDeposit (accountData: IDeposit): Promise<IDepositData> {
      const deposit = await this.depositRepository.makeDeposit(accountData)
      return depositTransform(deposit)
   }

}
