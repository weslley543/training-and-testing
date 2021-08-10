import authConfig from "../config/authConfig"
import jwt from 'jsonwebtoken'
import { Account } from '../models/Account'
import { ISingUp } from '../interfaces/ISingUp'

export default (account: Account) : ISingUp => {
    return {
        account, 
        token: jwt.sign({ id: account.id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        }),
    }
};
