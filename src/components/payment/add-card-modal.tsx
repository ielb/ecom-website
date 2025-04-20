"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CardData, CardFormData } from "@/types/payment";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (cardData: CardData) => void;
}

export function AddCardModal({
  isOpen,
  onClose,
  onAddCard,
}: AddCardModalProps) {
  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    makeDefault: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, makeDefault: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // This would typically be an API call to your payment processor
      // For demo purposes, we're just simulating a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Process the card data
      // In a real app, you would send this to your secure payment processor
      const cardData: CardData = {
        id: `card_${Date.now()}`,
        type: getCardType(formData.cardNumber),
        last4: formData.cardNumber.slice(-4),
        expMonth: parseInt(formData.expiryMonth),
        expYear: parseInt(formData.expiryYear),
        name: formData.cardholderName,
        isDefault: formData.makeDefault,
      };

      onAddCard(cardData);
      onClose();
    } catch (error) {
      console.error("Error adding card:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple function to determine card type from number
  const getCardType = (number: string): string => {
    if (number.startsWith("4")) {
      return "visa";
    } else if (number.startsWith("5")) {
      return "mastercard";
    } else if (number.startsWith("3")) {
      return "amex";
    } else if (number.startsWith("6")) {
      return "discover";
    } else {
      return "generic";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Payment Method</DialogTitle>
            <DialogDescription>
              Enter your card details below. Your information is securely
              processed.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength={19}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                name="cardholderName"
                placeholder="John Doe"
                value={formData.cardholderName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryMonth">Expiry Month</Label>
                <Input
                  id="expiryMonth"
                  name="expiryMonth"
                  placeholder="MM"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  maxLength={2}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiryYear">Expiry Year</Label>
                <Input
                  id="expiryYear"
                  name="expiryYear"
                  placeholder="YYYY"
                  value={formData.expiryYear}
                  onChange={handleChange}
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                type="password"
                placeholder="•••"
                value={formData.cvv}
                onChange={handleChange}
                maxLength={4}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="makeDefault"
                checked={formData.makeDefault}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="makeDefault"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Make this my default payment method
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Card"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
