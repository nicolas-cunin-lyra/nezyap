import { Product } from "./Product"

export class Transaction {
  id: string
  product: Array<Product>
  date: Date
  totalAmount: number
}