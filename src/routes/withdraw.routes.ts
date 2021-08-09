import { Router } from 'express';
import { WithdrawController } from '../controller/WithdrawController';

const withdrawController = new WithdrawController();
export default (router: Router): void => {
    router.post('/withdraw', withdrawController.makeWithdraw)
};
