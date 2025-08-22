"use client";
import { ShoppingCart } from "lucide-react";
import React from "react";
import Link from "next/link";
import useCartStore from "@/stores/cartStore";

export default function ShopingCart() {
  const { cart, hasHydrated } = useCartStore();

  if (!hasHydrated) return null;

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-4 h-4 text-gray-600"></ShoppingCart>
      <span className="absolute -top-2 -right-2 bg-amber-400 text-white rounded-full px-1 text-xs flex justify-center items-center">
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </Link>
  );
}
