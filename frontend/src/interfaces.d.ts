declare interface IProductInfo {
  id: number
  averageRatings: number
  name: string
}
declare interface IGetReviewResponse {
  status: boolean
  message: string
  result: IReview[]
}
declare interface IReview {
  averageRatings: number
  rating: number
  review: string
}

declare interface ISubmitReviewPayload {
  productId: number
  rating: number
  review: string
}
