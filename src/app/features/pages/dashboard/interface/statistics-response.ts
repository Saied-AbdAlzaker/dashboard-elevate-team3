export interface StatisticsResponse {
  message: string
  statistics: Statistics
}
interface Statistics {
  overall: any
  products: any
  orders: any
  categories: any[]
}
