import ProductList from "@/_components/ProductList/ProductList";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div>
      <div className="relative aspect-[3/1] mb-12">
        <Image src="/featured.png" alt="Featured" fill />
      </div>
      <ProductList></ProductList>
    </div>
  );
}
