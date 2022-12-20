import mongoose from "mongoose";

export interface CustomerInterface {
    shop: string;
    email: string;
    id: number;
    current_points: number;
    redeemed_points: number;
    total_points: number; // for analytics purpose
    referral_link: string;
    created_at: Date;
    updated_at: Date;
}


const CustomerSchema = new mongoose.Schema<CustomerInterface>({
    shop: {
        type: String,
        index: true,
        required: true
    },
    email: {
        type: String,
        index: true
    },
    id: {
        type: Number,
        required: true
    },
    current_points: {
        type: Number
    },
    redeemed_points: {
        type: Number
    },
    total_points: {
        type: Number
    },
    referral_link: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

export const Customer = mongoose.model<CustomerInterface>('Customer', CustomerSchema);