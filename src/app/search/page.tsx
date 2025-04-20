'use client'

import { useState, useEffect } from "react"
import { Product } from "@/types/product"
import { ProductCard } from "@/components/product/ProductCard"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { getProducts } from "@/lib/products"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [appliedFilters, setAppliedFilters] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState('popularity')
  const [page, setPage] = useState(1)
  const limit = 12 // Products per page

  useEffect(() => {
    loadProducts()
  }, [query, appliedFilters, priceRange, sortBy])

  const loadProducts = async () => {
    setLoading(true)
    try {
      // Convert price range filter to min/max
      const priceFilters = appliedFilters
        .filter(f => f.includes('$'))
        .map(f => {
          const [min, max] = f.replace('$', '').split(' - ').map(Number)
          return { min, max }
        })[0] || { min: 0, max: 1000 }

      const results = await getProducts({
        search: query,
        category: appliedFilters.find(f => ['Woman', 'Men', 'Kids', 'Sporty', 'Casual'].includes(f)),
        minPrice: priceFilters.min,
        maxPrice: priceFilters.max,
        page,
        limit
      })
      setProducts(results)
    } catch (error) {
      console.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filter: string) => {
    setAppliedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-4">Category</h3>
              <div className="space-y-2">
                {['Woman', 'Men', 'Kids', 'Sporty', 'Casual'].map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={category}
                      checked={appliedFilters.includes(category)}
                      onCheckedChange={() => handleFilterChange(category)}
                    />
                    <label htmlFor={category} className="ml-2 text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="space-y-2">
                {['$20 - $100', '$100 - $200', 'Over $200'].map((range) => (
                  <div key={range} className="flex items-center">
                    <Checkbox
                      id={range}
                      checked={appliedFilters.includes(range)}
                      onCheckedChange={() => handleFilterChange(range)}
                    />
                    <label htmlFor={range} className="ml-2 text-sm">
                      {range}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="font-medium mb-4">Size</h3>
              <div className="space-y-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <div key={size} className="flex items-center">
                    <Checkbox
                      id={size}
                      checked={appliedFilters.includes(size)}
                      onCheckedChange={() => handleFilterChange(size)}
                    />
                    <label htmlFor={size} className="ml-2 text-sm">
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-600">
                Showing {products.length} results from total 37 for "tops"
              </p>
              <div className="flex gap-2 mt-2">
                {appliedFilters.map((filter) => (
                  <Button
                    key={filter}
                    variant="outline"
                    size="sm"
                    onClick={() => handleFilterChange(filter)}
                    className="text-xs"
                  >
                    {filter} ×
                  </Button>
                ))}
              </div>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-3 py-1.5 text-sm"
            >
              <option value="popularity">Sort by: Popularity</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
              <Button
                key={index}
                variant={page === 1 ? 'default' : 'outline'}
                size="sm"
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 