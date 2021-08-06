import Deposit from '../models/Deposit'
import { IDeposit } from '../types/IDeposit'

export interface DepositRepositoryProtocol {
    makeDeposit (depositData: IDeposit): Promise<Deposit>;
};
