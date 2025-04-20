"use client";

import { useState } from "react";
import { User, KeyRound, Bell, ShieldAlert, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Define types for our settings
interface NotificationSettings {
  email: {
    marketing: boolean;
    orderUpdates: boolean;
    newProducts: boolean;
    accountUpdates: boolean;
  };
  push: {
    orderUpdates: boolean;
    promotions: boolean;
    reminders: boolean;
    accountUpdates: boolean;
  };
}

interface PrivacySettings {
  shareDataWithPartners: boolean;
  allowCookies: boolean;
  showRecentlyViewed: boolean;
  savePaymentInfo: boolean;
}

interface AccountSettings {
  name: string;
  email: string;
  phone: string;
}

interface UserSettings {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  account: AccountSettings;
}

export default function SettingsPage() {
  const [saveLoading, setSaveLoading] = useState(false);

  // Settings state
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: {
        marketing: true,
        orderUpdates: true,
        newProducts: false,
        accountUpdates: true,
      },
      push: {
        orderUpdates: true,
        promotions: false,
        reminders: true,
        accountUpdates: true,
      },
    },
    privacy: {
      shareDataWithPartners: false,
      allowCookies: true,
      showRecentlyViewed: true,
      savePaymentInfo: true,
    },
    account: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
  });

  // Handle settings changes
  const handleToggleChange = (
    category: "notifications",
    section: "email" | "push",
    setting: string
  ) => {
    setSettings((prev) => {
      const updatedSettings = { ...prev };

      if (section === "email") {
        updatedSettings.notifications.email = {
          ...updatedSettings.notifications.email,
          [setting]:
            !updatedSettings.notifications.email[
              setting as keyof NotificationSettings["email"]
            ],
        };
      } else if (section === "push") {
        updatedSettings.notifications.push = {
          ...updatedSettings.notifications.push,
          [setting]:
            !updatedSettings.notifications.push[
              setting as keyof NotificationSettings["push"]
            ],
        };
      }

      return updatedSettings;
    });
  };

  // Simple toggle for privacy settings
  const handlePrivacyToggle = (setting: keyof PrivacySettings) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: !prev.privacy[setting],
      },
    }));
  };

  // Handle account detail changes
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      account: {
        ...prev.account,
        [name]: value,
      },
    }));
  };

  // Mock save settings function
  const handleSaveSettings = async () => {
    setSaveLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaveLoading(false);
    // You would typically show a success notification here
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <Card id="profile-section">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={settings.account.name}
                  onChange={handleAccountChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={settings.account.email}
                  onChange={handleAccountChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={settings.account.phone}
                  onChange={handleAccountChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSaveSettings}
              disabled={saveLoading}
              className="ml-auto"
            >
              {saveLoading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Password Section */}
        <Card id="password-section">
          <CardHeader>
            <CardTitle className="flex items-center">
              <KeyRound className="mr-2 h-5 w-5" />
              Change Password
            </CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSaveSettings}
              disabled={saveLoading}
              className="ml-auto"
            >
              {saveLoading ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </Card>

        {/* Notifications Section */}
        <Card id="notifications-section">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Control how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="email">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="push">Push Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="email" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing emails</Label>
                    <p className="text-sm text-gray-500">
                      Receive emails about new products, promotions, and sales.
                    </p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={settings.notifications.email.marketing}
                    onCheckedChange={() =>
                      handleToggleChange("notifications", "email", "marketing")
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-emails">Order updates</Label>
                    <p className="text-sm text-gray-500">
                      Receive emails about your order status.
                    </p>
                  </div>
                  <Switch
                    id="order-emails"
                    checked={settings.notifications.email.orderUpdates}
                    onCheckedChange={() =>
                      handleToggleChange(
                        "notifications",
                        "email",
                        "orderUpdates"
                      )
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-product-emails">New products</Label>
                    <p className="text-sm text-gray-500">
                      Receive emails when new products are added.
                    </p>
                  </div>
                  <Switch
                    id="new-product-emails"
                    checked={settings.notifications.email.newProducts}
                    onCheckedChange={() =>
                      handleToggleChange(
                        "notifications",
                        "email",
                        "newProducts"
                      )
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="account-emails">Account updates</Label>
                    <p className="text-sm text-gray-500">
                      Receive emails about your account activity.
                    </p>
                  </div>
                  <Switch
                    id="account-emails"
                    checked={settings.notifications.email.accountUpdates}
                    onCheckedChange={() =>
                      handleToggleChange(
                        "notifications",
                        "email",
                        "accountUpdates"
                      )
                    }
                  />
                </div>
              </TabsContent>
              <TabsContent value="push" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-push">Order updates</Label>
                    <p className="text-sm text-gray-500">
                      Receive push notifications about your order status.
                    </p>
                  </div>
                  <Switch
                    id="order-push"
                    checked={settings.notifications.push.orderUpdates}
                    onCheckedChange={() =>
                      handleToggleChange(
                        "notifications",
                        "push",
                        "orderUpdates"
                      )
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="promotions-push">Promotions</Label>
                    <p className="text-sm text-gray-500">
                      Receive push notifications about sales and promotions.
                    </p>
                  </div>
                  <Switch
                    id="promotions-push"
                    checked={settings.notifications.push.promotions}
                    onCheckedChange={() =>
                      handleToggleChange("notifications", "push", "promotions")
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reminders-push">Reminders</Label>
                    <p className="text-sm text-gray-500">
                      Receive push notifications for cart reminders and wishlist
                      updates.
                    </p>
                  </div>
                  <Switch
                    id="reminders-push"
                    checked={settings.notifications.push.reminders}
                    onCheckedChange={() =>
                      handleToggleChange("notifications", "push", "reminders")
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="account-push">Account updates</Label>
                    <p className="text-sm text-gray-500">
                      Receive push notifications about your account activity.
                    </p>
                  </div>
                  <Switch
                    id="account-push"
                    checked={settings.notifications.push.accountUpdates}
                    onCheckedChange={() =>
                      handleToggleChange(
                        "notifications",
                        "push",
                        "accountUpdates"
                      )
                    }
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSaveSettings}
              disabled={saveLoading}
              className="ml-auto"
            >
              {saveLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </CardFooter>
        </Card>

        {/* Privacy Section */}
        <Card id="privacy-section">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldAlert className="mr-2 h-5 w-5" />
              Privacy Settings
            </CardTitle>
            <CardDescription>
              Control how your data is used and stored
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sharing">Data Sharing</Label>
                  <p className="text-sm text-gray-500">
                    Share your data with our partners to improve your shopping
                    experience
                  </p>
                </div>
                <Switch
                  id="data-sharing"
                  checked={settings.privacy.shareDataWithPartners}
                  onCheckedChange={() =>
                    handlePrivacyToggle("shareDataWithPartners")
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cookie-usage">Cookie Usage</Label>
                  <p className="text-sm text-gray-500">
                    Allow cookies to enhance your browsing experience
                  </p>
                </div>
                <Switch
                  id="cookie-usage"
                  checked={settings.privacy.allowCookies}
                  onCheckedChange={() => handlePrivacyToggle("allowCookies")}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="recently-viewed">Recently Viewed</Label>
                  <p className="text-sm text-gray-500">
                    Show recently viewed products on the homepage
                  </p>
                </div>
                <Switch
                  id="recently-viewed"
                  checked={settings.privacy.showRecentlyViewed}
                  onCheckedChange={() =>
                    handlePrivacyToggle("showRecentlyViewed")
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="save-payment-info">
                    Save Payment Information
                  </Label>
                  <p className="text-sm text-gray-500">
                    Save payment information for faster checkout
                  </p>
                </div>
                <Switch
                  id="save-payment-info"
                  checked={settings.privacy.savePaymentInfo}
                  onCheckedChange={() => handlePrivacyToggle("savePaymentInfo")}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSaveSettings}
              disabled={saveLoading}
              className="ml-auto"
            >
              {saveLoading ? "Saving..." : "Save Privacy Settings"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
