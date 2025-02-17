export type Product = {
  id: number
  name: string
  description?: string
  weight?: string
  prices: { gold: number; regular: number }
}
