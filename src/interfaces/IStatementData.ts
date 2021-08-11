import { Deposit } from '../models/Deposit';
import { Withdraw } from '../models/Withdraw';
import { Payment } from '../models/Payment';
export interface StatementData{
    deposits?: Deposit[];
    withdraws?: Withdraw[];
    payments?: Payment[];
};
