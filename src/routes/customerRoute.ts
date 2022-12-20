import express from 'express';
import { body } from  'express-validator';
const router = express.Router();
import CustomerController from '../controllers.ts/customerController.js';
import { isUser } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/expressErrorsMiddleware.js';


const customerController = new CustomerController();
router.get('/list', validateRequest, isUser, customerController.getCustomersFromShopify);

export default router;