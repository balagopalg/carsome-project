declare interface ProductResponse {
  status: boolean
  message: string
  result: [ProductResult]
}

declare interface ProductResult {
  id: number
  name: string
  averageratings: number
  rating?: string
  review?: number
}
declare interface SqlError {
  errObj: ErrorMap
}

declare interface ErrorMap {
  sqlMessage: string
}