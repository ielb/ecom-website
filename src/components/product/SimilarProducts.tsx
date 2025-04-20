'use client'

import { Product } from "@/types/product"
import { ProductCard } from "./ProductCard"

interface SimilarProductsProps {
  currentProduct: Product
  products: Product[]
}

export function SimilarProducts({ currentProduct, products }: SimilarProductsProps) {
  // Filter out current product and limit to 4 similar products
  const similarProducts = products
    .filter(product => product.id !== currentProduct.id)
    .slice(0, 4)

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
} 