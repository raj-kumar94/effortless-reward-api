import mongoose from "mongoose";

export interface RewardInterface {
    shop: string;
    customer_id: number;
    event_type: 'added' | 'removed' | 'redeemed' | 'referred'
    points: number;
    rewarded_for: 'birthday' | 'account_created' | 'purchase' | 'review_posted' | 'social_share' | 'social_visit' | 'social_like' | 'other';
    social_platform: string;
    link: string; // if a link was created
    created_at: Date;
}


const RewardSchema = new mongoose.Schema<RewardInterface>({
    shop: {
        type: String,
        index: true,
        required: true
    },
    customer_id: {
        type: Number, // can be positive or negative
        index: true
    },
    event_type: {
        type: String,
    },
    points: {
        type: Number,
    },
    rewarded_for: {
        type: String,
    },
    social_platform: {
        type: String,
    },
    created_at: {
        type: Date
    },
});

export const Reward = mongoose.model<RewardInterface>('Reward', RewardSchema);