import mongoose from "mongoose";

export interface StoreDetailInterface {
    shop: string;
    access_token: string;
}


const StoreDetailSchema = new mongoose.Schema<StoreDetailInterface>({
    shop: {
        type: String,
        index: true,
        required: true
    },
    access_token: {
        type: String
    }
});

export const StoreDetail = mongoose.model<StoreDetailInterface>('StoreDetail', StoreDetailSchema);