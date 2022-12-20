import { CustomError } from "../errors/CustomErrors.js";
import { Redeem } from "../models/redeem.js";
import { Reward } from "../models/reward.js"
import { StoreDetail } from "../models/storeDetail.js";
import { getShopifyObj } from "../utils/shopifyObject.js";
import CustomerService from "./customerService.js";
import DiscountService from "./discountService.js";


export default class RewardService {

    addPoints = async ({ shop, customer_id, event_type, rewarded_for, social_platform }: { shop: string, customer_id: number, event_type: string, rewarded_for: string, social_platform }) => {
        // fetch points from the database
        const storeDetail = await StoreDetail.findOne({shop}, { reward_point_mapping: 1, active: 1 });
        if(!storeDetail) {
            throw new CustomError(404, `Store not found`);
        }

        if(!storeDetail.active) {
            throw new CustomError(403, 'Forbidden');
        }

        const points = (storeDetail.reward_point_mapping[rewarded_for] && storeDetail.reward_point_mapping[rewarded_for].points) || 0;
        
        if(!points) {
            throw new CustomError(422, `No points found for customer ${customer_id}`);
        }

        const customerService = new CustomerService();
        const customer = await customerService.getCustomerByCustomerId(customer_id);
        if(!customer) {
            throw new CustomError(404, `Customer ${customer_id} not found`);
        }

        const reward = new Reward({
            shop,
            customer_id,
            event_type,
            points,
            rewarded_for,
            social_platform,
            created_at: new Date()
        });

        await reward.save();
        customer.total_points = customer.total_points + points;
        customer.current_points = customer.current_points + points;
        await customer.save();

        return reward;
    }

    redeemPoints = async ({ shop, customer_id, points }: { shop: string, customer_id: number, points: number }) => {
        const storeDetail = await StoreDetail.findOne({shop}, { reward_point_mapping: 1, active: 1 });
        if(!storeDetail) {
            throw new CustomError(404, `Store not found`);
        }

        if(!storeDetail.active) {
            throw new CustomError(403, 'Forbidden');
        }
        
        const customerService = new CustomerService();
        const customer = await customerService.getCustomerByCustomerId(customer_id);

        if(customer.current_points < points) {
            throw new CustomError(422, `Not enough points to redeem, customer: ${customer_id}`);
        }

        // create a discount for the customer
        const shopify = getShopifyObj(storeDetail.shop, storeDetail.access_token);
        const discountService = new DiscountService(shopify);
        const discountData = await discountService.createPriceRuleAndDiscount({
            customer_id,
            discount_amount: points
        });

        // add the redeem entry
        const redeem = new Redeem({
            shop,
            customer_id,
            redemmed_points: points,
            redeemed_as: 'discount', // or gift_card
            redeemed_code: discountData.code,
            created_at: new Date()
        });
        await redeem.save();

        customer.current_points = customer.current_points - points;
        customer.redeemed_points = customer.redeemed_points + points;
        customer.total_points = customer.total_points + points;
        await customer.save();

        // TODO: send an email as well?

        // send the discount code back to the customer
        return discountData.code;

    }
}