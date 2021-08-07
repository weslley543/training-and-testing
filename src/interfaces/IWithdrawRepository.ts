import Withdraw from '../models/Withdraw'
import { IWithdraw } from '../interfaces/IWithdraw'

export interface IWithdrawRepository {
    makeWithdraw (withdraw: IWithdraw): Promise<Withdraw>;
};
