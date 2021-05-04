import { Product } from './Product'

export interface Transaction {
  id: string
  product: Array<Product>
  date: Date
  totalAmount: number
}