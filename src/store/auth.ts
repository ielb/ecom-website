"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/axios";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "paypal";
  lastFour?: string;
  cardBrand?: string;
  expiryDate?: string;
  isDefault: boolean;
}

interface ProfileUpdateData {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

interface AuthStore {
  token: string | null;
  user: User | null;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  addAddress: (address: Omit<Address, "id">) => Promise<void>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  removeAddress: (id: string) => Promise<void>;
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => Promise<void>;
  removePaymentMethod: (id: string) => Promise<void>;
  setDefaultPaymentMethod: (id: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

export const useAuth = create<AuthStore>()(
  persist<AuthStore>(
    (set, get) => ({
      token: null,
      user: null,
      addresses: [],
      paymentMethods: [],
      isAuthenticated: false,
      setAuth: (token: string, user: User) => {
        set({ token, user, isAuthenticated: true });
      },
      login: async (email: string, password: string) => {
        try {
          const response = await api.post("/auth/login", { email, password });

          const { token, user } = response.data;
          set({
            token,
            user,
            isAuthenticated: true,
          });
        } catch {
          throw new Error("Login failed");
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          const response = await api.post("/auth/register", {
            name,
            email,
            password,
          });

          const { token, user } = response.data;
          set({
            token,
            user,
            isAuthenticated: true,
          });
        } catch {
          throw new Error("Registration failed");
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },

      updateProfile: async (data: ProfileUpdateData) => {
        try {
          await api.put("/user/profile", data);

          set({
            user: { ...get().user, ...data } as User,
          });
        } catch {
          throw new Error("Profile update failed");
        }
      },

      addAddress: async (address: Omit<Address, "id">) => {
        try {
          const response = await api.post("/user/addresses", address);

          const newAddress = response.data;
          set({
            addresses: [...get().addresses, newAddress],
          });
        } catch {
          throw new Error("Failed to add address");
        }
      },

      updateAddress: async (id: string, addressUpdate: Partial<Address>) => {
        try {
          await api.put(`/user/addresses/${id}`, addressUpdate);

          set({
            addresses: get().addresses.map((addr) =>
              addr.id === id ? { ...addr, ...addressUpdate } : addr
            ),
          });
        } catch {
          throw new Error("Failed to update address");
        }
      },

      removeAddress: async (id: string) => {
        try {
          await api.delete(`/user/addresses/${id}`);

          set({
            addresses: get().addresses.filter((addr) => addr.id !== id),
          });
        } catch {
          throw new Error("Failed to remove address");
        }
      },

      addPaymentMethod: async (method: Omit<PaymentMethod, "id">) => {
        try {
          const response = await api.post("/user/payment-methods", method);

          const newMethod = response.data;
          set({
            paymentMethods: [...get().paymentMethods, newMethod],
          });
        } catch {
          throw new Error("Failed to add payment method");
        }
      },

      removePaymentMethod: async (id: string) => {
        try {
          await api.delete(`/user/payment-methods/${id}`);

          set({
            paymentMethods: get().paymentMethods.filter(
              (method) => method.id !== id
            ),
          });
        } catch {
          throw new Error("Failed to remove payment method");
        }
      },

      setDefaultPaymentMethod: async (id: string) => {
        try {
          await api.put(`/user/payment-methods/${id}/default`);

          set({
            paymentMethods: get().paymentMethods.map((method) => ({
              ...method,
              isDefault: method.id === id,
            })),
          });
        } catch {
          throw new Error("Failed to set default payment method");
        }
      },

      resetPassword: async (email: string) => {
        try {
          await api.post("/auth/reset-password", { email });
        } catch {
          throw new Error("Password reset request failed");
        }
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        try {
          await api.put("/user/change-password", {
            currentPassword,
            newPassword,
          });
        } catch {
          throw new Error("Password change failed");
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
