import { Categories } from "./categories"

export interface ResponseCategories {
  message: string
  metadata: Metadata
  categories: Categories[]

}
export interface Metadata {
  currentPage: number
  limit: number
  totalPages: number
  totalItems: number
}
