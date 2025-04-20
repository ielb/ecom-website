import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

interface CartItemProps extends Product {
  quantity: number;
}

export function CartItem({ id, name, price, images, quantity }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center space-x-4 py-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-md">
        <Image
          src={images[0].url}
          alt={name}
          width={100}
          height={100}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100px, 200px"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="text-base font-medium text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">{formatPrice(price)}</p>
        <div className="mt-2 flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(id, Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="min-w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <span className="text-base font-medium">
          {formatPrice(price * quantity)}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => removeItem(id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
