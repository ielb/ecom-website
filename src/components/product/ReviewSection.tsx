'use client'

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/store/auth"
import { useToast } from "@/hooks/use-toast"
import { Review } from "@/types/review"
import { getProductReviews, submitReview, deleteReview, markReviewHelpful, markReviewUnhelpful } from '@/lib/reviews'


interface ReviewSectionProps {
    productId: string,
    averageRating: number,
    reviewsCount:number
}

export function ReviewSection({ productId, averageRating, reviewsCount }: ReviewSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newRating, setNewRating] = useState(5)
  const [comment, setComment] = useState("")
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState(averageRating)
    const [reviewCount, setReviewCount] = useState(reviewsCount)
    
    useEffect(() => {
        fetchReviews()
    }, [productId])

  const fetchReviews = async () => {
    try {
        const data = await getProductReviews(productId)
        console.log(data)
        setReviews(data.reviews)
        setRating(averageRating)
        setReviewCount(data.reviews.length)
        
    } catch (error) {
      console.error('Failed to fetch reviews')
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please login to submit a review",
      })
      return
    }

    try {
      await submitReview(productId, {
        rating: newRating,
        comment,
      })
      toast({
        title: "Success",
        description: "Your review has been submitted",
      })
      setShowReviewForm(false)
      setComment("")
      setNewRating(5)
      fetchReviews() // Refresh reviews
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit review",
      })
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(productId, reviewId)
      toast({
        title: "Success",
        description: "Review deleted successfully",
      })
      fetchReviews() // Refresh reviews
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete review",
      })
    }
  }

  const handleHelpful = async (reviewId: string) => {
    try {
      await markReviewHelpful(productId, reviewId)
      fetchReviews() // Refresh reviews
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark review as helpful",
      })
    }
  }

  const handleUnhelpful = async (reviewId: string) => {
    try {
      await markReviewUnhelpful(productId, reviewId)
      fetchReviews() // Refresh reviews
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark review as unhelpful",
      })
    }
  }

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">
              {rating.toFixed(1)} out of 5
            </span>
            <span className="text-gray-500">
              ({reviewCount} reviews)
            </span>
          </div>
        </div>
        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
          Write a Review
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setNewRating(value)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      value <= newRating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block mb-2 text-sm font-medium">
              Review
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>
          <Button type="submit">Submit Review</Button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{review.user.firstName}</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
            <span className="text-sm text-gray-500 mt-2 block">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 