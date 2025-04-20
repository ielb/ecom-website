"use client";

import { useEffect, useState, use } from "react";
import { Product, ProductVariant } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { getProduct, getProducts } from "@/lib/products";
import { Heart } from "lucide-react";
import { useWishlist } from "@/store/wishlist";
import { cn } from "@/lib/utils";
import { SimilarProducts } from "@/components/product/SimilarProducts";
import { useToast } from "@/hooks/use-toast";
import { ReviewSection } from "@/components/product/ReviewSection";
import Image from "next/image";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();
  const { toast } = useToast();

  const isWishlisted = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    async function loadData() {
      try {
        const [productData, allProducts] = await Promise.all([
          getProduct(resolvedParams.id),
          getProducts(),
        ]);
        setProduct(productData);
        setSelectedImage(productData.images[0]?.url);
        setSimilarProducts(allProducts);
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [resolvedParams.id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        {error || "Product not found"}
      </div>
    );
  }

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a size",
      });
      return;
    }
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            <Image
              src={selectedImage || product.images[0]?.url}
              alt={product.name}
              className="object-contain"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              quality={85}
            />
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "aspect-square rounded-md overflow-hidden border-2 relative",
                  selectedImage === image.url
                    ? "border-black"
                    : "border-transparent"
                )}
                onClick={() => setSelectedImage(image.url)}
              >
                <Image
                  src={image.url}
                  alt={`View ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 25vw, 10vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviewCount} Reviews)
                </span>
              </div>
            </div>
            <button
              onClick={handleWishlist}
              className={cn(
                "p-2 rounded-full hover:bg-gray-100",
                isWishlisted && "text-red-500"
              )}
            >
              <Heart
                className="w-6 h-6"
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-bold">${product.price}</span>
              {product.basePrice > product.price && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.basePrice}
                </span>
              )}
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Select Variant</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <Button
                      key={variant.id}
                      variant={
                        selectedVariant?.id === variant.id
                          ? "default"
                          : "outline"
                      }
                      onClick={() => setSelectedVariant(variant)}
                      className="px-6"
                    >
                      {Object.values(variant.attributes).join(" / ")}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full h-12 text-lg"
                onClick={handleAddToCart}
                disabled={!selectedVariant}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewSection
        productId={product.id}
        averageRating={parseFloat(product.averageRating.toString())}
        reviewsCount={product.reviewCount}
      />

      {/* Similar Products */}
      {product && similarProducts.length > 0 && (
        <div className="mt-8 sm:mt-16">
          <SimilarProducts
            currentProduct={product}
            products={similarProducts}
          />
        </div>
      )}
    </div>
  );
}
