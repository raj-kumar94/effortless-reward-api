import express from 'express';
import { body } from  'express-validator';
const router = express.Router();
import { getCustomerFromShopify } from '../controllers.ts/customerController.js';
import { isUser } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/expressErrorsMiddleware.js';

router.get('/list', validateRequest, isUser, getCustomerFromShopify);

export default router;