"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const footerLinks = {
  shop: [
    { label: "Men", href: "category/men" },
    { label: "Women", href: "category/women" },
    { label: "Kids", href: "category/kids" },
    { label: "New Arrivals", href: "category/new-arrivals" },
    { label: "Sale", href: "category/sale" },
  ],
  help: [
    { label: "Customer Service", href: "/contact", key: "customer-service" },
    { label: "Track Order", href: "/orders" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Shipping", href: "/terms#6-shipping-and-delivery" },
    { label: "Contact Us", href: "/contact", key: "contact-us" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "About Us", href: "/about" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          {/* Newsletter Section */}
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="orium"
              width={200}
              height={100}
              className="w-48 h-20 object-contain brightness-0 invert"
            />
            <h3 className="text-lg font-bold">Subscribe to our newsletter</h3>
            <p className="text-gray-400">
              Be the first to know about new collections and exclusive offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded bg-gray-800 text-white"
              />
              <Button
                variant="outline"
                className="bg-white text-black hover:bg-gray-200"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.key || link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Orium. All rights reserved.
            </div>

            {/* Payment Methods */}
            <div className="flex gap-2">
              <Image
                src="/images/visa.svg"
                alt="Visa"
                className="h-8"
                width={32}
                height={32}
              />
              <Image
                src="/images/mastercard.svg"
                alt="Mastercard"
                className="h-8"
                width={32}
                height={32}
              />
              <Image
                src="/images/amex.svg"
                alt="American Express"
                className="h-8"
                width={32}
                height={32}
              />
              <Image
                src="/images/paypal.svg"
                alt="PayPal"
                className="h-8"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
