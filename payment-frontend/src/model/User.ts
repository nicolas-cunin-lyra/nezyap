import { Transaction } from "./Transaction"

export interface User {
  email: string
  transactions: Array<Transaction>
}