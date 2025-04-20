"use client";

import { useState } from "react";
import { useWishlist } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingBag, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/product";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCartStore();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = searchQuery
    ? items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your wishlist.`,
    });
  };

  const handleAddToCart = (item: Product) => {
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleClearWishlist = () => {
    if (items.length === 0) return;
    clearWishlist();
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Continue shopping
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">My Wishlist</h1>
        {items.length > 0 && (
          <Button
            variant="outline"
            className="text-sm"
            onClick={handleClearWishlist}
          >
            Clear wishlist
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-gray-50">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Save items you love by clicking the heart icon on any product.
          </p>
          <Link href="/">
            <Button>Explore Products</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="relative mb-6">
            <Input
              className="pl-10"
              placeholder="Search your wishlist"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Heart className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <p className="text-gray-500">
                No items found matching &quot;{searchQuery}&quot;
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const mainImage =
                  item.images.find((img) => img.isMain)?.url ||
                  item.images[0]?.url;

                return (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 relative hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all z-10"
                    >
                      <Heart
                        className="w-4 h-4 text-red-500"
                        fill="currentColor"
                      />
                    </button>

                    <Link href={`/product/${item.id}`}>
                      <div className="relative aspect-[3/4] mb-4">
                        <Image
                          src={mainImage}
                          alt={item.name}
                          className="object-cover rounded-md"
                          fill
                        />
                      </div>

                      <h3 className="font-medium text-lg line-clamp-2 mb-1">
                        {item.name}
                      </h3>
                    </Link>

                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="font-bold">{formatPrice(item.price)}</p>
                        {item.basePrice > item.price && (
                          <p className="text-sm text-gray-500 line-through">
                            {formatPrice(item.basePrice)}
                          </p>
                        )}
                      </div>

                      <Button
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
