import { Router } from 'express';
import { PaymentController } from '../controller/PaymentController';

const paymentController = new PaymentController();
export default (router: Router): void => {
    router.post('/payment', paymentController.makePayment)
};
