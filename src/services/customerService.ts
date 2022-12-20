import { CustomError } from "../errors/CustomErrors.js";
import { Customer } from "../models/customer.js";
import { StoreDetail } from "../models/storeDetail.js";
import { getShopifyObj } from "../utils/shopifyObject.js";

export default class CustomerService {
    getCustomersFromShopify = async (shop: string) => {
        console.log("getCustomersFromShopify:start");
    
        const storeDetail = await StoreDetail.findOne({shop});
    
        if(!storeDetail) {
            throw new CustomError(404, "Store not found");
        }
    
        const shopify = getShopifyObj(storeDetail.shop, storeDetail.access_token);
        const customers = await shopify.customer.list();
    
        return customers;
    }

    getCustomerByCustomerId = async (customer_id: number) => {
        return Customer.findOne({ id: customer_id });
    }
}