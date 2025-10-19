export interface OrderStatus {
  message: string
  statistics: Statistics

  // ordersByStatus: ordersByStatus []
  // dailyRevenue: dailyRevenue []
  // monthlyRevenue: monthlyRevenue []
}

export interface Statistics {
  ordersByStatus: ordersByStatus[]

  // dailyRevenue: dailyRevenue[]
  // monthlyRevenue: monthlyRevenue[]
}

export interface ordersByStatus {
  _id?: string
  count: number
}

/*export interface dailyRevenue {
  _id: string
  revenue: number
  count: number
}

export interface monthlyRevenue {
  _id: string
  revenue: number
  count: number
}*/
