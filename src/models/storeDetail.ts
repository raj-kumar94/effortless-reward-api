import mongoose from "mongoose";

export interface StoreDetailInterface {
    shop: string;
    access_token: string;
    active: boolean;
    reward_point_mapping?: {
        [rewarded_for: string]: {
            active: boolean;
            points: number;
        }
    };
    created_at: Date;
    updated_at: Date;
    uninstalled_at: Date;
}


const StoreDetailSchema = new mongoose.Schema<StoreDetailInterface>({
    shop: {
        type: String,
        index: true,
        required: true
    },
    access_token: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    reward_point_mapping: {
        birthday: {
            active: Boolean,
            points: Number,
        },
        account_created: {
            active: Boolean,
            points: Number,
        },
        purchase: {
            active: Boolean,
            points: Number,
        },
        review_posted: {
            active: Boolean,
            points: Number,
        },
        social_share: {
            active: Boolean,
            points: Number,
        },
        social_visit: {
            active: Boolean,
            points: Number,
        },
        social_like: {
            active: Boolean,
            points: Number,
        },
        other: {
            active: Boolean,
            points: Number,
        },
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    uninstalled_at: {
        type: Date
    }
});

export const StoreDetail = mongoose.model<StoreDetailInterface>('StoreDetail', StoreDetailSchema);