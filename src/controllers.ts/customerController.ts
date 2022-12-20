import { Request, Response, NextFunction } from "express"
import { responseHandler } from "../response/responseHandler.js";
import CustomerService from "../services/customerService.js"


export default class CustomerController {
    private customerService: CustomerService;

    constructor() {
        this.customerService = new CustomerService();
    }
    
    
    getCustomersFromShopify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customers = await this.customerService.getCustomersFromShopify(req.shop);
            responseHandler({ res, status: 200, data: customers, message: 'Success' });
        } catch (error) {
            console.error(error.response?.body || error);
            next(error);
        }
    }
}
