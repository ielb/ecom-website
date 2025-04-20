"use client";

import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";
import { SearchBar } from "../search/SearchBar";
import { Cart } from "../cart/Cart";
import { useAuth } from "@/store/auth";
import { UserDropdown } from "./UserDropdown";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
// Define the navigation items to keep them consistent
const navItems = [
  { label: "Men", href: "/category/men" },
  { label: "Women", href: "/category/women" },
  { label: "Kids", href: "/category/kids" },
  { label: "New & Featured", href: "/category/new" },
  { label: "Sale", href: "/category/sale" },
];

export function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Promo bar */}
      <div className="w-full bg-black text-white text-center py-2 text-xs sm:text-sm">
        Get 25% Off This Summer Sale at Orium. Grab It Fast!! 15H : 45M : 37S
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>

          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold">
            <Image
              src="/images/logo.png"
              alt="orium"
              width={200}
              height={100}
              className="w-48 h-20 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-gray-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="hidden sm:block">
              <SearchBar />
            </div>
            <Link href="/wishlist" className="hover:text-gray-600">
              <Heart className="w-5 h-5" />
            </Link>
            <Cart />
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <Link href="/login" className="hover:text-gray-600">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search - Always visible on mobile */}
        <div className="mt-4 sm:hidden">
          <SearchBar />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-gray-600"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/wishlist"
                className="hover:text-gray-600 flex items-center"
              >
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Link>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
