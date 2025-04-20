'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/types/product'
import { getProducts } from '@/lib/products'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProducts()
        setProducts(response || [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = (products || []).filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="relative">
      <div className="flex items-center border rounded-md">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          className="w-full px-4 py-2 outline-none"
          placeholder="Search products..."
          onFocus={() => setIsOpen(true)}
        />
        <Search className="w-5 h-5 mr-4 text-gray-400" />
      </div>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 shadow-lg z-50">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false)
                setQuery('')
              }}
            >
              {product.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 