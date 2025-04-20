export interface CardData {
  id: string;
  type: string;
  last4: string;
  expMonth: number;
  expYear: number;
  name: string;
  isDefault: boolean;
}

export interface CardFormData {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  makeDefault: boolean;
}
