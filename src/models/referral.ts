import mongoose from "mongoose";

export interface ReferralInterface {
    shop: string;
    customer_id: number;
    referral_link: string; // shortend link
    referral_type: 'signup' | 'share' | 'other';
    clicks: number; // number of clicks
    signup_count: number;
    created_at: Date;
}


const ReferralSchema = new mongoose.Schema<ReferralInterface>({
    shop: {
        type: String,
        index: true,
        required: true
    },
    customer_id: {
        type: Number,
        required: true
    },
    referral_link: {
        type: String,
        required: true
    },
    referral_type: {
        type: String,
        required: true,
        default: 'signup'
    },
    clicks: {
        type: Number,
        default: 0
    },
    signup_count: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export const Referral = mongoose.model<ReferralInterface>('Referral', ReferralSchema);