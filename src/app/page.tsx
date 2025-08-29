import ProductList from "@/_components/ProductList/ProductList";
import Image from "next/image";
import React from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category: string; search?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "";
  
  return (
    <div>
      <div className="relative aspect-[3/1] mb-12">
        <Image src="/featured.png" alt="Featured" fill />
      </div>
      <ProductList category={category} sort="" params="Home"></ProductList>
    </div>
  );
}
