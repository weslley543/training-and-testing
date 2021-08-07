import Deposit from '../models/Deposit'
import { IDepositData } from '../interfaces/IDepositData'

export const depositTransform = (deposit: Deposit): IDepositData => {
    return {
        value: deposit.value,
        account_to: deposit.accountNumberTo,
        created_at: deposit.createdAt,
        transaction_id: deposit.transactionId
    };
};
