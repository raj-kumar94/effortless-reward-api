import { Request, Response, NextFunction } from "express"
import { responseHandler } from "../response/responseHandler.js";
import { getCustomerFromShopifyService } from "../services/customerService.js"


export const getCustomerFromShopify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await getCustomerFromShopifyService(req.shop);
        responseHandler({ res, status: 200, data: customers, message: 'Success' });
    } catch (error) {
        console.error(error.response?.body || error);
        next(error);
    }
}