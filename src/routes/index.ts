import { Router } from 'express';
import AccountController from '../controller/AccountController';
import { DepositController } from '../controller/DepositController';
import { PaymentController } from '../controller/PaymentController';
import { WithdrawController } from '../controller/WithdrawController';
import { AccountStatementController } from '../controller/AccountStatementController';
import authmiddlaware from '../middlewares/authmiddlaware';

const routes = Router();

const accountController = new AccountController();
const depositController = new DepositController();
const paymentController = new PaymentController();
const withdrawController = new WithdrawController();
const accountStatementController = new AccountStatementController();


routes.get('/account/:account_number', accountController.getAccountByAccountNumber);
routes.post('/signin', accountController.getAccount);
routes.post('/signup', accountController.signUp);
routes.post('/deposit', depositController.makeDepositUnlogged);

routes.get('/account_statement', authmiddlaware ,accountStatementController.getAccountStatement);
routes.post('/payment', authmiddlaware, paymentController.makePayment);
routes.post('/withdraw', authmiddlaware, withdrawController.makeWithdraw);

export default routes;
