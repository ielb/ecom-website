// src/types/review.ts

import { Product } from "./product";
import { User } from "./user";

export interface Review {
    id: string;
    rating: number;
    comment: string;
    title?: string;
    isVerifiedPurchase: boolean;
    helpfulVotes: number;
    media?: { type: string; url: string }[];
    product: Product;
    user: User;
    product_id: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}