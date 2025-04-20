"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Package, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

// Types for order data
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  trackingNumber?: string;
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-123456",
    date: "2023-09-15T14:30:00Z",
    status: "delivered",
    total: 129.99,
    items: [
      {
        id: "101",
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        variant: "Medium / Black",
      },
      {
        id: "102",
        name: "Slim Fit Jeans",
        price: 69.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        variant: "32 / Blue",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "91234",
      country: "USA",
    },
    trackingNumber: "TRK-987654321",
  },
  {
    id: "2",
    orderNumber: "ORD-654321",
    date: "2023-10-10T10:15:00Z",
    status: "shipped",
    total: 89.95,
    items: [
      {
        id: "201",
        name: "Running Shoes",
        price: 89.95,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        variant: "9 / Red",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "91234",
      country: "USA",
    },
    trackingNumber: "TRK-123456789",
  },
  {
    id: "3",
    orderNumber: "ORD-789012",
    date: "2023-10-25T16:45:00Z",
    status: "processing",
    total: 149.97,
    items: [
      {
        id: "301",
        name: "Wireless Headphones",
        price: 149.97,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        variant: "Black",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "91234",
      country: "USA",
    },
  },
];

// Status badge color mapping
const statusColors = {
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch orders from API
    const fetchOrders = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setOrders(mockOrders);
          setLoading(false);
        }, 800);
      } catch {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load orders. Please try again.",
        });
        setLoading(false);
      }
    };

    fetchOrders();
  }, [toast]);

  const filteredOrders = searchQuery
    ? orders.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : orders;

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const formatOrderDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
        <p className="text-gray-500">View and track your orders.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          className="pl-10"
          placeholder="Search orders by number or product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading your orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          {searchQuery ? (
            <>
              <p className="text-gray-500">
                No orders found matching &quot;{searchQuery}&quot;
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </>
          ) : (
            <p className="text-gray-500">
              You haven&apos;t placed any orders yet.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 hover:border-gray-400 transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="font-medium">{order.orderNumber}</h3>
                  <p className="text-sm text-gray-500">
                    {formatOrderDate(order.date)}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                  <Badge className={statusColors[order.status]}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                  <span className="text-gray-500 hidden sm:inline">|</span>
                  <span className="text-sm font-medium">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {order.items.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="relative w-12 h-12 rounded-md overflow-hidden border"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="object-cover"
                      fill
                    />
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="relative w-12 h-12 rounded-md overflow-hidden border flex items-center justify-center bg-gray-50">
                    <span className="text-xs text-gray-500">
                      +{order.items.length - 3}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-between items-center">
                {order.status === "shipped" || order.status === "processing" ? (
                  <div className="flex items-center text-sm text-blue-600">
                    <Package className="h-4 w-4 mr-1" />
                    <span>
                      {order.status === "shipped"
                        ? "Track Package"
                        : "Preparing for Shipment"}
                    </span>
                  </div>
                ) : (
                  <div></div>
                )}

                <Button
                  variant="ghost"
                  className="text-sm flex items-center gap-1"
                  onClick={() => viewOrderDetails(order)}
                >
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog
          open={!!selectedOrder}
          onOpenChange={(open: boolean) => !open && setSelectedOrder(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="font-medium">{selectedOrder.orderNumber}</h3>
                  <p className="text-sm text-gray-500">
                    {formatOrderDate(selectedOrder.date)}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <Badge className={statusColors[selectedOrder.status]}>
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {selectedOrder.trackingNumber && (
                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2 text-blue-700" />
                    <div>
                      <p className="text-sm font-medium text-blue-700">
                        Tracking Number: {selectedOrder.trackingNumber}
                      </p>
                      <a
                        href="#"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Track package
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Items</h4>
                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="object-cover"
                          fill
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">{item.name}</h5>
                        {item.variant && (
                          <p className="text-sm text-gray-500">
                            {item.variant}
                          </p>
                        )}
                        <div className="flex justify-between mt-1">
                          <p className="text-sm">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                          <p className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Shipping Address</h4>
                <p>{selectedOrder.shippingAddress.name}</p>
                <p>{selectedOrder.shippingAddress.street}</p>
                <p>
                  {selectedOrder.shippingAddress.city},{" "}
                  {selectedOrder.shippingAddress.state}{" "}
                  {selectedOrder.shippingAddress.postalCode}
                </p>
                <p>{selectedOrder.shippingAddress.country}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(selectedOrder.total - 10)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{formatPrice(10)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
