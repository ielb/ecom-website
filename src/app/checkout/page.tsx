"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { useAuth } from "@/store/auth";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

import {
  CreditCard,
  Check,
  Truck,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PhoneInput } from "@/components/ui/phone-input";
import { CountryDropdown } from "@/components/ui/country-dropdown";

// Types for checkout data
interface ShippingInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  savePaymentInfo: boolean;
}

type CheckoutStep = "shipping" | "payment" | "review" | "confirmation";

export default function MultiStepCheckoutPage() {
  const { items, clearCart } = useCartStore();
  const { isAuthenticated, addresses } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [orderNumber, setOrderNumber] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "paypal">(
    "credit-card"
  );

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    savePaymentInfo: false,
  });

  // Get default address if authenticated
  useEffect(() => {
    if (isAuthenticated && addresses.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
        setShippingInfo({
          ...shippingInfo,
          firstName: "",
          lastName: "",
          address: defaultAddress.street,
          city: defaultAddress.city,
          state: defaultAddress.state,
          postalCode: defaultAddress.postalCode,
          country: defaultAddress.country,
        });
      }
    }
  }, [isAuthenticated, addresses]);

  // Check if cart is empty
  useEffect(() => {
    if (items.length === 0 && currentStep !== "confirmation") {
      router.push("/cart");
      toast({
        variant: "destructive",
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before checkout.",
      });
    }
  }, [items.length, router, toast, currentStep]);

  // Handle input changes for shipping info
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for payment info
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle address selection
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
    const selected = addresses.find((addr) => addr.id === addressId);
    if (selected) {
      setShippingInfo({
        ...shippingInfo,
        address: selected.street,
        city: selected.city,
        state: selected.state,
        postalCode: selected.postalCode,
        country: selected.country,
      });
    }
  };

  // Go to next step
  const nextStep = () => {
    if (currentStep === "shipping") {
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      setCurrentStep("review");
    } else if (currentStep === "review") {
      handlePlaceOrder();
    }
  };

  // Go to previous step
  const prevStep = () => {
    if (currentStep === "payment") {
      setCurrentStep("shipping");
    } else if (currentStep === "review") {
      setCurrentStep("payment");
    }
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    // In a real app, submit order to API
    // Simulate order processing
    setTimeout(() => {
      // Generate random order number
      const orderNum =
        "ORD-" + Math.floor(100000 + Math.random() * 900000).toString();
      setOrderNumber(orderNum);
      setCurrentStep("confirmation");
      clearCart();
    }, 1500);
  };

  // Calculate shipping cost based on method
  const shippingCost = shippingMethod === "express" ? 15 : 5;

  // Calculate tax (example: 10%)
  const taxRate = 0.1;
  // Prevent NaN by ensuring total exists or defaulting to 0
  const taxAmount = items.length > 0 ? total * taxRate : 0;

  // Calculate order total
  const orderTotal =
    items.length > 0 ? total + shippingCost + taxAmount : shippingCost;

  // Check if current step is valid and can proceed
  const canProceed = () => {
    if (currentStep === "shipping") {
      return (
        shippingInfo.firstName &&
        shippingInfo.lastName &&
        shippingInfo.address &&
        shippingInfo.city &&
        shippingInfo.state &&
        shippingInfo.postalCode &&
        shippingInfo.country
      );
    } else if (currentStep === "payment") {
      if (paymentMethod === "credit-card") {
        return (
          paymentInfo.cardName &&
          paymentInfo.cardNumber &&
          paymentInfo.expiryDate &&
          paymentInfo.cvv
        );
      }
      return true;
    }
    return true;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {currentStep !== "confirmation" ? (
        <>
          {/* Checkout Steps Progress */}
          <div className="mb-8">
            <div className="flex justify-between">
              {["shipping", "payment", "review"].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      currentStep === step
                        ? "border-black bg-black text-white"
                        : currentStep === "review" && step === "payment"
                        ? "border-black bg-black text-white"
                        : currentStep === "review" && step === "shipping"
                        ? "border-black bg-black text-white"
                        : currentStep === "payment" && step === "shipping"
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {step === "shipping" && <Truck className="w-5 h-5" />}
                    {step === "payment" && <CreditCard className="w-5 h-5" />}
                    {step === "review" && <Check className="w-5 h-5" />}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      currentStep === step ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 relative">
              <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
              <div
                className="absolute top-0 left-0 h-1 bg-black transition-all duration-300"
                style={{
                  width:
                    currentStep === "shipping"
                      ? "33%"
                      : currentStep === "payment"
                      ? "66%"
                      : "100%",
                }}
              ></div>
            </div>
          </div>

          {/* Checkout Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Checkout Form */}
            <div className="lg:col-span-2">
              {/* Shipping Information */}
              {currentStep === "shipping" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Shipping Information</h2>

                  {isAuthenticated && addresses.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">
                        Select a saved address
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((address) => (
                          <div
                            key={address.id}
                            className={`border rounded-lg p-4 cursor-pointer ${
                              selectedAddress === address.id
                                ? "border-black bg-gray-50"
                                : "border-gray-200"
                            }`}
                            onClick={() => handleAddressSelect(address.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{address.name}</p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {address.street}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {address.city}, {address.state}{" "}
                                  {address.postalCode}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {address.country}
                                </p>
                              </div>
                              {selectedAddress === address.id && (
                                <Check className="text-black w-5 h-5" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center">
                        <span className="text-sm text-gray-500 mr-2">
                          Or enter a new address:
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium mb-1"
                      >
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium mb-1"
                      >
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium mb-1"
                    >
                      Street Address
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium mb-1"
                      >
                        City
                      </label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium mb-1"
                      >
                        State/Province
                      </label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium mb-1"
                      >
                        Postal Code
                      </label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium mb-1"
                      >
                        Country
                      </label>
                      <CountryDropdown
                        defaultValue={shippingInfo.country}
                        onChange={(value) =>
                          setShippingInfo((prev) => ({
                            ...prev,
                            country: value.alpha3,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-1"
                    >
                      Phone Number
                    </label>
                    <PhoneInput
                      value={shippingInfo.phone}
                      defaultCountry="US"
                      onChange={(value) =>
                        setShippingInfo((prev) => ({
                          ...prev,
                          phone: value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Shipping Method
                    </h3>
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={(value) =>
                        setShippingMethod(value as "standard" | "express")
                      }
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 border p-4 rounded-lg">
                        <RadioGroupItem value="standard" id="standard" />
                        <div className="flex-1">
                          <label
                            htmlFor="standard"
                            className="font-medium cursor-pointer flex justify-between"
                          >
                            <span>Standard Shipping (3-5 business days)</span>
                            <span>{formatPrice(5)}</span>
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 border p-4 rounded-lg">
                        <RadioGroupItem value="express" id="express" />
                        <div className="flex-1">
                          <label
                            htmlFor="express"
                            className="font-medium cursor-pointer flex justify-between"
                          >
                            <span>Express Shipping (1-2 business days)</span>
                            <span>{formatPrice(15)}</span>
                          </label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              {currentStep === "payment" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Payment Information</h2>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) =>
                        setPaymentMethod(value as "credit-card" | "paypal")
                      }
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 border p-4 rounded-lg">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <div className="flex-1">
                          <label
                            htmlFor="credit-card"
                            className="font-medium cursor-pointer flex justify-between"
                          >
                            <span>Credit / Debit Card</span>
                            <div className="flex space-x-2">
                              <CreditCard className="w-5 h-5" />
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 border p-4 rounded-lg">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <div className="flex-1">
                          <label
                            htmlFor="paypal"
                            className="font-medium cursor-pointer"
                          >
                            PayPal
                          </label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="cardName"
                          className="block text-sm font-medium mb-1"
                        >
                          Name on Card
                        </label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={paymentInfo.cardName}
                          onChange={handlePaymentInfoChange}
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="block text-sm font-medium mb-1"
                        >
                          Card Number
                        </label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentInfoChange}
                          placeholder="0000 0000 0000 0000"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="expiryDate"
                            className="block text-sm font-medium mb-1"
                          >
                            Expiry Date
                          </label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={handlePaymentInfoChange}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="cvv"
                            className="block text-sm font-medium mb-1"
                          >
                            CVV
                          </label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentInfoChange}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center mt-4">
                        <input
                          id="savePaymentInfo"
                          name="savePaymentInfo"
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={paymentInfo.savePaymentInfo}
                          onChange={(e) =>
                            setPaymentInfo((prev) => ({
                              ...prev,
                              savePaymentInfo: e.target.checked,
                            }))
                          }
                        />
                        <label
                          htmlFor="savePaymentInfo"
                          className="ml-2 text-sm"
                        >
                          Save this card for future purchases
                        </label>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="border rounded-lg p-6 text-center">
                      <p className="mb-4">
                        You will be redirected to PayPal to complete your
                        payment.
                      </p>
                      <Button>Continue to PayPal</Button>
                    </div>
                  )}
                </div>
              )}

              {/* Order Review */}
              {currentStep === "review" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Review Your Order</h2>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium flex items-center">
                          <MapPin className="w-5 h-5 mr-2" />
                          Shipping Information
                        </h3>
                        <Button
                          variant="link"
                          className="text-sm h-auto p-0"
                          onClick={() => setCurrentStep("shipping")}
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="text-sm">
                        <p>
                          {shippingInfo.firstName} {shippingInfo.lastName}
                        </p>
                        <p>{shippingInfo.address}</p>
                        <p>
                          {shippingInfo.city}, {shippingInfo.state}{" "}
                          {shippingInfo.postalCode}
                        </p>
                        <p>{shippingInfo.country}</p>
                        <p>{shippingInfo.phone}</p>
                        <p className="mt-2 font-medium">
                          {shippingMethod === "standard"
                            ? "Standard Shipping (3-5 business days)"
                            : "Express Shipping (1-2 business days)"}
                        </p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium flex items-center">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Payment Information
                        </h3>
                        <Button
                          variant="link"
                          className="text-sm h-auto p-0"
                          onClick={() => setCurrentStep("payment")}
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="text-sm">
                        {paymentMethod === "credit-card" ? (
                          <div>
                            <p>Credit Card</p>
                            <p>{paymentInfo.cardName}</p>
                            <p>
                              **** **** **** {paymentInfo.cardNumber.slice(-4)}
                            </p>
                            <p>Expires: {paymentInfo.expiryDate}</p>
                          </div>
                        ) : (
                          <p>PayPal</p>
                        )}
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {items.map((item) => {
                          const mainImage =
                            item.images.find((img) => img.isMain)?.url ||
                            item.images[0]?.url;

                          return (
                            <div
                              key={item.id}
                              className="flex py-3 border-b last:border-0"
                            >
                              <div className="relative w-16 h-16 rounded-md overflow-hidden">
                                <Image
                                  src={mainImage}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex justify-between">
                                  <div>
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-sm text-gray-500">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                  <p className="font-medium">
                                    {formatPrice(item.price * item.quantity)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 bg-gray-50 sticky top-6">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>

                {/* Cart item preview */}
                {items.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">Items in Cart</h4>
                    <div className="max-h-40 overflow-y-auto">
                      {items.map((item) => {
                        const mainImage =
                          item.images.find((img) => img.isMain)?.url ||
                          item.images[0]?.url;

                        return (
                          <div
                            key={item.id}
                            className="flex items-center py-2 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={mainImage}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                              <p className="text-xs truncate">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-xs font-medium ml-2">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({items.length} items)
                    </span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(orderTotal)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentStep !== "shipping" && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={prevStep}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  )}

                  <Button
                    className="w-full"
                    onClick={nextStep}
                    disabled={!canProceed()}
                  >
                    {currentStep === "review" ? (
                      "Place Order"
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Order Confirmation */
        <div className="max-w-2xl mx-auto text-center">
          <div className="py-12">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-2">
              Thank You For Your Order!
            </h1>
            <p className="text-gray-600 mb-6">
              Your order has been received and is now being processed.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Order Number:</span>
                <span>{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Order Total:</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              A confirmation email has been sent to {shippingInfo.email}. We
              will notify you once your order has shipped.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="w-full sm:w-auto">Continue Shopping</Button>
              </Link>
              <Link href="/orders">
                <Button variant="outline" className="w-full sm:w-auto">
                  View My Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
