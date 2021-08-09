import { AccountController } from "../controller/AccountController";
import { Router } from 'express';

const accountController = new AccountController();
export default (router: Router): void => {
    router.post('/signin', accountController.getAccount)
    //router.get('/account/get/:account_number', accountController.getAccountByAccountNumber);
};
