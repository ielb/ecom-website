"use client";

import { useCartStore } from "@/store/cart";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <ShoppingBag className="h-16 w-16 text-gray-400" />
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-gray-500">
          Add some items to your cart to get started
        </p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>

      <div className="mt-12">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <div className="mt-8">
          <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
            <div className="flow-root">
              <div className="-my-4 divide-y divide-gray-200">
                <div className="flex items-center justify-between py-4">
                  <div className="text-base font-medium text-gray-900">
                    Subtotal
                  </div>
                  <div className="text-base font-medium text-gray-900">
                    {formatPrice(total)}
                  </div>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div className="text-base font-medium text-gray-900">
                    Shipping
                  </div>
                  <div className="text-base font-medium text-gray-900">
                    {formatPrice(0)}
                  </div>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div className="text-lg font-medium text-gray-900">Total</div>
                  <div className="text-lg font-medium text-gray-900">
                    {formatPrice(total)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/checkout">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
