import mongoose from "mongoose";

export interface RedeemInterface {
    shop: string;
    customer_id: number;
    redemmed_points: number;
    redeemed_as: 'discount' | 'gift_card';
    redeemed_code: string;
    created_at: Date;
}


const RedeemSchema = new mongoose.Schema<RedeemInterface>({
    shop: {
        type: String,
        index: true,
        required: true
    },
    customer_id: {
        type: Number,
        required: true
    },
    redemmed_points: {
        type: Number,
        required: true
    },
    redeemed_as: {
        type: String,
        required: true,
        default: 'discount'
    },
    redeemed_code: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export const Redeem = mongoose.model<RedeemInterface>('Redeem', RedeemSchema);