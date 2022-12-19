import { CustomError } from "../errors/CustomErrors.js";
import { StoreDetail } from "../models/storeDetail.js";
import { getShopifyObj } from "../utils/shopifyObject.js";

export const getCustomerFromShopifyService = async (shop: string) => {
    console.log("getCustomerFromShopifyService:start");

    const storeDetail = await StoreDetail.findOne({shop});

    if(!storeDetail) {
        throw new CustomError(404, "Store not found");
    }

    const shopify = getShopifyObj(storeDetail.shop, storeDetail.access_token);
    const customers = await shopify.customer.list();

    return customers;
}