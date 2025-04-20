"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { AddCardModal } from "@/components/payment/add-card-modal";
import { CardData } from "@/types/payment";

export default function UserPaymentMethodsPage() {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [savedCards, setSavedCards] = useState<CardData[]>([
    {
      id: "card_1",
      type: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      name: "John Doe",
      isDefault: true,
    },
    {
      id: "card_2",
      type: "mastercard",
      last4: "5555",
      expMonth: 8,
      expYear: 2024,
      name: "John Doe",
      isDefault: false,
    },
  ]);

  const handleAddCard = (cardData: CardData) => {
    // If the new card is set as default, update other cards
    if (cardData.isDefault) {
      setSavedCards((prevCards) =>
        prevCards.map((card) => ({
          ...card,
          isDefault: false,
        }))
      );
    }

    // Add the new card to the list
    setSavedCards((prevCards) => [...prevCards, cardData]);
  };

  const handleSetDefault = (cardId: string) => {
    setSavedCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      }))
    );
  };

  const handleDeleteCard = (cardId: string) => {
    setSavedCards((prevCards) =>
      prevCards.filter((card) => card.id !== cardId)
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">My Payment Methods</h1>
        <p className="text-gray-600">
          Manage your saved payment methods for faster checkout.
        </p>
      </div>

      <div className="space-y-6">
        {/* Add New Card Button */}
        <div className="flex justify-end mb-4">
          <Button
            className="flex items-center gap-2"
            onClick={() => setIsAddCardModalOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            Add New Card
          </Button>
        </div>

        {savedCards.length > 0 ? (
          <div className="space-y-4">
            {savedCards.map((card) => (
              <Card key={card.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 relative">
                      <Image
                        src={`/images/${card.type.toLowerCase()}.svg`}
                        alt={card.type}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div>
                      <p className="font-medium">
                        {card.type.charAt(0).toUpperCase() + card.type.slice(1)}{" "}
                        •••• {card.last4}
                      </p>
                      <p className="text-sm text-gray-500">
                        Expires {card.expMonth}/{card.expYear}
                      </p>
                      <p className="text-sm text-gray-500">{card.name}</p>
                      {card.isDefault && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 mt-1">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" title="Edit card">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      title="Remove card"
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {!card.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(card.id)}
                      >
                        Set as default
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No payment methods
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven&apos;t saved any payment methods yet.
            </p>
            <div className="mt-6">
              <Button
                className="flex items-center gap-2"
                onClick={() => setIsAddCardModalOpen(true)}
              >
                <PlusCircle className="h-4 w-4" />
                Add a payment method
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
          <h2 className="text-lg font-medium mb-2">Payment Security</h2>
          <p className="text-sm text-gray-600">
            Your card information is securely stored with our payment processor.
            We never store your complete credit card details on our servers. All
            transactions are protected with industry-standard encryption.
          </p>
        </div>

        {/* Back to Account Navigation */}
        <div className="mt-8 pt-6 border-t">
          <Button variant="outline" asChild>
            <Link href="/account">Back to Account</Link>
          </Button>
        </div>
      </div>

      {/* Add Card Modal */}
      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onAddCard={handleAddCard}
      />
    </div>
  );
}
