"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { BaggageClaim, Home } from "lucide-react";
import ShopingCart from "../ShopingCart/ShopingCart";
import useAuthStore from "@/stores/authStore";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  
  // Debug: Log user data to see what's happening
  React.useEffect(() => {
    if (user) {
      console.log('Navbar user data:', user);
    }
  }, [user]);
  
  return (
    <nav className="w-full flex justify-between items-center border-b border-gray-200 pb-4">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="TrendEcommerce"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        ></Image>
        <p className="text-md font-medium tracking-wider hidden md:block">
          TREND.
        </p>
      </Link>
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <SearchBar></SearchBar>
        <Link href="/" className="hidden sm:block">
          <Home className="w-4 h-4 text-gray-600" />
        </Link>
        <Link href="/orders" className="text-sm text-gray-700 underline">
          <BaggageClaim className="w-4 h-4 text-gray-600" />
        </Link>
        <ShopingCart></ShopingCart>
        {!isAuthenticated ? (
          <>
            <Link href="/login" className="text-sm">Login</Link>
            <Link href="/register" className="text-sm">Register</Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-600">
              {user?.name ? user.name : user?.email}
            </span>
            <button onClick={logout} className="text-sm text-gray-600">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
