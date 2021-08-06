import Withdraw from '../models/Withdraw'
import { IWithdraw } from '../types/IWithdraw'

export interface WithdrawRepositoryProtocol {
    makeWithdraw (withdraw: IWithdraw): Promise<Withdraw>;
};
