import express from 'express';
import { account } from './controllers/accounts';
import { send, receive } from './controllers/transactions';

const router = express.Router();

router.get('/accounts/:id', account);
router.post('/transactions/send', send);
router.post('/transactions/receive', receive);

export {
    router
}