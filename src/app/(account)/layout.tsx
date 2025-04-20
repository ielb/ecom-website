import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Sidebar, Mobile, HomeButton } from "./nav-components";

export const metadata = {
  title: {
    default: "Account",
    template: "%s | Account",
  },
  description: "Manage your account settings and preferences",
};

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  // Define the navigation links for the account section
  const navItems = [
    { href: "/profile", label: "Profile", icon: "User" },
    { href: "/settings", label: "Settings", icon: "Settings" },
    {
      href: "/payment-methods",
      label: "Payment Methods",
      icon: "CreditCard",
    },
    { href: "/orders", label: "Orders", icon: "Package" },
    { href: "/addresses", label: "Addresses", icon: "MapPin" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Account Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Account</h1>
          <HomeButton />
        </div>
        <Separator className="my-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Sidebar Navigation */}
        <div className="hidden md:block">
          <Card className="sticky top-24">
            <div className="p-2">
              <Sidebar items={navItems} />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div>
          {/* Mobile Navigation */}
          <div className="md:hidden mb-6">
            <Card>
              <div className="p-2">
                <Mobile items={navItems} />
              </div>
            </Card>
          </div>

          {/* Page Content */}
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
