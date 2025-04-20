"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Settings,
  CreditCard,
  Package,
  MapPin,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

interface ActiveLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const iconMap = {
  User,
  Settings,
  CreditCard,
  Package,
  MapPin,
  Home,
};

function ActiveLink({ href, label, icon }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex items-center py-2 px-3 rounded-md font-medium transition-colors ${
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function ActiveMobileLink({ href, label, icon }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex flex-col items-center py-3 px-2 rounded-md text-center transition-colors ${
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

export function Sidebar({ items }: { items: NavItem[] }) {
  return (
    <nav className="flex flex-col space-y-1">
      {items.map((item) => {
        const IconComponent = iconMap[item.icon as keyof typeof iconMap];
        return (
          <ActiveLink
            key={item.href}
            href={item.href}
            icon={<IconComponent className="mr-2 h-4 w-4" />}
            label={item.label}
          />
        );
      })}
    </nav>
  );
}

export function Mobile({ items }: { items: NavItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => {
        const IconComponent = iconMap[item.icon as keyof typeof iconMap];
        return (
          <ActiveMobileLink
            key={item.href}
            href={item.href}
            icon={<IconComponent className="mb-1 h-5 w-5" />}
            label={item.label}
          />
        );
      })}
    </div>
  );
}

export function HomeButton() {
  return (
    <Button variant="outline" asChild>
      <Link href="/">
        <Home className="mr-2 h-4 w-4" />
        Return to Home
      </Link>
    </Button>
  );
}

// Also export as a single object for convenience
export const Navigation = {
  Sidebar,
  Mobile,
  HomeButton,
};
