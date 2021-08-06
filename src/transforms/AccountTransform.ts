import Account from '../models/Account';
import { IAccount } from '../types/IAccount';

export const accountTransform = (account: Account) : IAccount => {
    return {
        name: account.name,
        account_number: account.accountNumber,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
        balance: account.balance
    };
};
