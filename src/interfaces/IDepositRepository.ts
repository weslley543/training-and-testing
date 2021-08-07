import Deposit from '../models/Deposit'
import { IDeposit } from '../interfaces/IDeposit'

export interface IDepositRepository {
    makeDeposit (depositData: IDeposit): Promise<Deposit>;
};
