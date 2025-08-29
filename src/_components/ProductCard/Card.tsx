"use client";
import useCartStore from "@/stores/cartStore";
import useAuthStore from "@/stores/authStore";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Card({ product }: { product: ProductType }) {
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [productType, setproductType] = useState({
    color: product.colors[0],
    size: product.sizes[0],
  });

  const handelproductType = ({
    type,
    value,
  }: {
    type: "color" | "size";
    value: string;
  }) => {
    setproductType((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  function handelAddToCart() {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart({
      ...product,
      quantity: 1,
      selectedColor: productType.color,
      selectedSize: productType.size,
    });
    toast.success("Product added to cart");
  }

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[productType.color]}
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
                  onClick={() =>
                    handelproductType({ type: "size", value: size })
                  }
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
                  className={`rounded-full ${
                    productType.color === color
                      ? " border-gray-400"
                      : "border-gray-200"
                  } border-1 p-[1.2] cursor-pointer hover:scale-110 transition-all duration-300`}
                  onClick={() =>
                    handelproductType({ type: "color", value: color })
                  }
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
          <button
            onClick={handelAddToCart}
            className="flex items-center gap-2 px-2 py-1 ring-1 ring-gray-200 shadow-lg rounded-md hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
