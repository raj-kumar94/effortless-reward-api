import { Express } from "express";
import Shopify from "shopify-api-node";


type ShopifyObjectsType = {
    [shopName: string]: Shopify
}

declare global {
    namespace Express {
        interface Request {
            shop?: string;
            user?: {
                email: string;
            }
        }
    }
}