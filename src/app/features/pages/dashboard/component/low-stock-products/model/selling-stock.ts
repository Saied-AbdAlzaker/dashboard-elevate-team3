export interface SellingStock {
  message: string
  statistics: Statistics
}

export interface Statistics {
  productsByCategory: ProductsByCategory[]
  topSellingProducts: TopSellingProduct[]
  lowStockProducts: LowStockProduct[]
}

export interface ProductsByCategory {
  _id: string
  count: number
  category: string
  products: Product[]
}

export interface Product {
  title: string
  price: number
  imgCover: string
  quantity: number
  sold?: number
}

export interface TopSellingProduct {
  _id: string
  title: string
  imgCover: string
  price: number
  sold: number
  id: string
}

export interface LowStockProduct {
  _id: string
  title: string
  imgCover: string
  price: number
  quantity: number
  id: string
}
