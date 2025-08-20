"use client";
import { ShoppingCart } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function ShopingCart() {
  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-4 h-4 text-gray-600"></ShoppingCart>
      <span className="absolute -top-2 -right-2 bg-amber-400 text-white rounded-full px-1 text-xs flex justify-center items-center">
        0
      </span>
    </Link>
  );
}
