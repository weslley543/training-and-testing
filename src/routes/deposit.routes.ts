import { Router } from 'express';
import { DepositController } from '../controller/DepositController';

const depositController = new DepositController();
export default (router: Router): void => {
    router.post('/deposit', depositController.makeDeposit)
};
