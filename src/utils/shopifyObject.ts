import Shopify from "shopify-api-node";

export const getShopifyObj = (shop: string, access_token: string) => {
    const shopify = new Shopify({
        shopName: shop.replace('.myshopify.com', ''),
        accessToken: access_token
    });

    return shopify;
}