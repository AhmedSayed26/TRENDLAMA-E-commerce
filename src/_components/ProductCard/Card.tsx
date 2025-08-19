"use client";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Card({ product }: { product: ProductType }) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[product.colors[0]]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          ></Image>
        </div>
      </Link>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">${product.shortDescription}</p>
        <div className="flex items-center gap-4 text-sm">
          {/* size */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="ring-1 ring-gray-300 rounded-md px-2 py-1"
            >
              {product.sizes.map((size) => (
                <option
                  key={size}
                  value={size}
                  className="rounded-md flex items-center gap-2"
                >
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* {color} */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-500">Colors</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="border-2 rounded-full border-gray-300 cursor-pointer hover:scale-110 transition-all duration-300"
                >
                  <div
                    className={`w-4 h-4 rounded-full p-2 `}
                    style={{ backgroundColor: color }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button className="flex items-center gap-2 px-2 py-1 ring-1 ring-gray-200 shadow-lg rounded-md hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
