"use client";

import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/store/wishlist";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const mainImage =
    product.images.find((img) => img.isMain)?.url || product.images[0]?.url;

  const handleWishlist = () => {
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <Card className="group relative bg-gray-50 rounded bg-white border-none shadow-none">
      <CardContent className="p-0">
        {/* Main Product Image */}
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-[3/4] overflow-hidden bg-white cursor-pointer rounded-md">
            <Image
              src={mainImage}
              alt={product.name}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={false}
              quality={80}
            />
            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleWishlist();
              }}
              className={cn(
                "absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all z-10",
                isWishlisted && "text-red-500"
              )}
            >
              <Heart
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </button>
          </div>
        </Link>

        {/* Product Info */}
        <div className=" py-3  bg-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Link href={`/product/${product.id}`}>
                <h3 className="font-medium text-base sm:text-lg line-clamp-2">
                  {product.name}
                </h3>
              </Link>
            </div>
            <div className=" rounded-full text-black hover:bg-gray-800 transition-colors">
              <p className="text-base sm:text-lg font-bold">${product.price}</p>
              {product.basePrice > product.price && (
                <p className="text-xs sm:text-sm text-gray-500 line-through">
                  ${product.basePrice}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
