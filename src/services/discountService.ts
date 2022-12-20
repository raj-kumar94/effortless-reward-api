import crypto from 'crypto';
import Shopify from "shopify-api-node";

export default class DiscountService {

    private shopify: Shopify
    constructor(shopify: Shopify) {
        this.shopify = shopify;
    }

    createPriceRule = async ({ title, target_type, target_selection, allocation_method, value_type, value, customer_selection, customer_segment_prerequisite_ids}) => {
        return this.shopify.priceRule.create({
            title, // customer-{id}-discount
            target_type, // line_item
            target_selection, // all
            allocation_method, // across
            value_type, // fixed_amount
            value, // Amount
            customer_selection, // prerequisite
            customer_segment_prerequisite_ids, // selected customer
        });
    }

    createDiscount = async (price_rule_id : number, code: string) => {
        return this.shopify.discountCode.create(price_rule_id, code);
    }

    createPriceRuleAndDiscount = async ({ customer_id, discount_amount }: { customer_id: number, discount_amount: number }) => {
        // TODO: Genrate a unique code
        const code = crypto.randomBytes(4).toString('hex').toUpperCase();

        const priceRule = await this.createPriceRule({
            title: `${code}`,
            target_type: 'line_item',
            target_selection: 'all',
            allocation_method: 'across',
            value_type: 'fixed',
            value: discount_amount,
            customer_selection: 'prerequisite',
            customer_segment_prerequisite_ids: [customer_id]
        });

        const discount = await this.createDiscount(priceRule.id, code);
        return discount;
    }
}