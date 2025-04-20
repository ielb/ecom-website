"use client";

import { useState } from "react";
import { useAuth, Address } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, removeAddress } = useAuth();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isDefault: e.target.checked }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      isDefault: false,
    });
  };

  const handleAddAddress = async () => {
    try {
      await addAddress(formData);
      toast({
        title: "Address added",
        description: "Your address has been added successfully.",
      });
      resetForm();
      setIsAddingAddress(false);
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add address. Please try again.",
      });
    }
  };

  const handleEditAddress = async (id: string) => {
    const address = addresses.find((a) => a.id === id);
    if (address) {
      setFormData({
        name: address.name,
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        isDefault: address.isDefault,
      });
      setIsEditingAddress(id);
    }
  };

  const handleUpdateAddress = async () => {
    if (!isEditingAddress) return;

    try {
      await updateAddress(isEditingAddress, formData);
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      });
      resetForm();
      setIsEditingAddress(null);
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update address. Please try again.",
      });
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await removeAddress(id);
      toast({
        title: "Address removed",
        description: "Your address has been removed successfully.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove address. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Addresses</h1>
          <p className="text-gray-500">
            Manage your shipping and billing addresses.
          </p>
        </div>
        <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="w-4 h-4" />
              <span>Add Address</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Address Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Home, Work, etc."
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="street" className="text-sm font-medium">
                  Street Address
                </label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">
                    City
                  </label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="state" className="text-sm font-medium">
                    State/Province
                  </label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="postalCode" className="text-sm font-medium">
                    Postal Code
                  </label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium">
                    Country
                  </label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={handleCheckboxChange}
                  className="rounded border-gray-300"
                />
                <label htmlFor="isDefault" className="text-sm font-medium">
                  Set as default address
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setIsAddingAddress(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddAddress}>Add Address</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <p className="text-gray-500">
            You don&apos;t have any saved addresses yet.
          </p>
          <Button className="mt-4" onClick={() => setIsAddingAddress(true)}>
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={cn(
                "border rounded-lg p-4 relative",
                address.isDefault && "border-black bg-gray-50"
              )}
            >
              {address.isDefault && (
                <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-full text-xs flex items-center">
                  <Check className="w-3 h-3 mr-1" />
                  Default
                </div>
              )}
              <div className="mt-2">
                <h3 className="font-medium">{address.name}</h3>
                <p className="text-gray-600 mt-1">{address.street}</p>
                <p className="text-gray-600">
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p className="text-gray-600">{address.country}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleEditAddress(address.id)}
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:border-red-300"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Address Dialog */}
      <Dialog
        open={!!isEditingAddress}
        onOpenChange={(open: boolean) => !open && setIsEditingAddress(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="edit-name" className="text-sm font-medium">
                Address Name
              </label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Home, Work, etc."
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-street" className="text-sm font-medium">
                Street Address
              </label>
              <Input
                id="edit-street"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="edit-city" className="text-sm font-medium">
                  City
                </label>
                <Input
                  id="edit-city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-state" className="text-sm font-medium">
                  State/Province
                </label>
                <Input
                  id="edit-state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="edit-postalCode"
                  className="text-sm font-medium"
                >
                  Postal Code
                </label>
                <Input
                  id="edit-postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-country" className="text-sm font-medium">
                  Country
                </label>
                <Input
                  id="edit-country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-isDefault"
                checked={formData.isDefault}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300"
              />
              <label htmlFor="edit-isDefault" className="text-sm font-medium">
                Set as default address
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsEditingAddress(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateAddress}>Update Address</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
