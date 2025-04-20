"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Product } from "@/types/product";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice } from "@/lib/utils";
import { getProducts, getCategories } from "@/lib/products";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Most Popular", value: "popularity" },
];

// Sample tags for filtering
const tags = [
  "Summer",
  "Winter",
  "Casual",
  "Formal",
  "Sport",
  "Outdoor",
  "Indoor",
  "Clearance",
];

export default function CategoryPage({ params }: CategoryPageProps) {
  // Use destructuring with a type assertion
  const { slug } = React.use(params);

  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get initial filter values from URL parameters
  useEffect(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort");
    const search = searchParams.get("search");
    const tags = searchParams.get("tags");

    if (minPrice && maxPrice) {
      setPriceRange([parseInt(minPrice), parseInt(maxPrice)]);
    }
    if (sort) {
      setSortBy(sort);
    }
    if (search) {
      setSearchQuery(search);
    }
    if (tags) {
      setSelectedTags(tags.split(","));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productData);
        setCategories(categoryData);

        // Find the current category
        const current = categoryData.find((cat) => cat.slug === slug);
        setCurrentCategory(current || null);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const clearFilters = () => {
    setPriceRange([0, 500]);
    setSelectedTags([]);
    setSortBy("newest");
    setSearchQuery("");
  };

  // Apply filters to products
  const filteredProducts = products
    .filter((product) => {
      // Filter by category
      if (currentCategory && !product.category?.slug.includes(slug)) {
        return false;
      }

      // Filter by price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Filter by tags
      if (
        selectedTags.length > 0 &&
        !selectedTags.some((tag) => product.tags.includes(tag))
      ) {
        return false;
      }

      // Filter by search query
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort products
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "popularity":
          return b.reviewCount - a.reviewCount;
        case "newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

  const getFilterCount = () => {
    let count = 0;
    if (priceRange[0] > 0 || priceRange[1] < 500) count++;
    if (selectedTags.length > 0) count++;
    if (searchQuery) count++;
    return count;
  };

  const filterCount = getFilterCount();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize">
          {currentCategory?.name || slug.replace("-", " ")}
        </h1>
        {filteredProducts.length > 0 && (
          <p className="text-gray-500 mt-2">
            {filteredProducts.length} products
          </p>
        )}
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search in this category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Mobile Filter Button */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 sm:w-auto w-full justify-between"
              >
                <div className="flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </div>
                {filterCount > 0 && (
                  <Badge className="ml-2 bg-black text-white">
                    {filterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Narrow down your product search
                </SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Price Range</h3>
                    <span className="text-sm text-gray-500">
                      {formatPrice(priceRange[0])} -{" "}
                      {formatPrice(priceRange[1])}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="mb-4"
                  />
                </div>

                <div>
                  <h3 className="font-medium mb-4">Tags</h3>
                  <div className="space-y-2">
                    {tags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagToggle(tag)}
                        />
                        <label htmlFor={`tag-${tag}`} className="text-sm">
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={clearFilters}
                >
                  Clear
                </Button>
                <SheetClose asChild>
                  <Button className="flex-1">Apply Filters</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 sm:w-auto w-full">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2 hidden sm:inline">
                    Sort by:
                  </span>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {filterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {searchQuery && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 py-1 px-3"
            >
              Search: {searchQuery}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            </Badge>
          )}

          {(priceRange[0] > 0 || priceRange[1] < 500) && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 py-1 px-3"
            >
              Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => setPriceRange([0, 500])}
              />
            </Badge>
          )}

          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="flex items-center gap-1 py-1 px-3"
            >
              {tag}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              />
            </Badge>
          ))}

          <Button
            variant="link"
            className="text-sm h-auto p-0 text-gray-500"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-medium mb-2">No products found</h2>
          <p className="text-gray-500 mb-6">
            Try adjusting your filters or search terms.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
