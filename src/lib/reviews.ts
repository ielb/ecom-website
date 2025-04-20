import api from './axios'
import { Review } from '@/types/review'

interface ReviewsResponse {
    reviews: Review[]
    averageRating: number
    totalReviews: number
}

interface ReviewPayload {
    rating: number
    comment: string
}

export async function getProductReviews(productId: string): Promise<ReviewsResponse> {
    const response = await api.get(`/products/${productId}/reviews`)
    return response.data
}

export async function submitReview(productId: string, data: ReviewPayload): Promise<Review> {
    const response = await api.post(`/products/${productId}/reviews`, data)
    return response.data
}

export async function deleteReview(productId: string, reviewId: string): Promise<void> {
    await api.delete(`/products/${productId}/reviews/${reviewId}`)
}

export async function markReviewHelpful(productId: string, reviewId: string): Promise<Review> {
    const response = await api.post(`/products/${productId}/reviews/${reviewId}/helpful`)
    return response.data
}

export async function markReviewUnhelpful(productId: string, reviewId: string): Promise<Review> {
    const response = await api.post(`/products/${productId}/reviews/${reviewId}/unhelpful`)
    return response.data
}
