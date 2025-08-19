import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Bell, Home, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center border-b  border-gray-200 pb-4">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="TrendEcommerce"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        ></Image>
        <p className="text-md font-medium tracking-wider hidden md:block">
          TRENDLAMA.
        </p>
      </Link>
      <div className="flex items-center gap-6">
        <SearchBar></SearchBar>
        <Link href="/">
          <Home className="w-4 h-4 text-gray-600" />
        </Link>
        <Bell className="w-4 h-4 text-gray-600"></Bell>
        <ShoppingCart className="w-4 h-4 text-gray-600"></ShoppingCart>
        <Link href="/Login">Sign in</Link>
      </div>
    </nav>
  );
}
