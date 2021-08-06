import Withdraw from '../models/Withdraw'
import { IWithdrawData } from '../types/IWithdrawData'

export const withdrawTransform = (withdraw: Withdraw, valueRestant: number): IWithdrawData => {
    return {
        id: withdraw.id,
        transaction_id: withdraw.transactionId,
        value: withdraw.value,
        created_at: withdraw.createdAt,
        value_to_update_account: valueRestant
    };
};
