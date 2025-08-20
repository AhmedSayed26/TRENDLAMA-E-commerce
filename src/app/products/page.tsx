import ProductList from "@/_components/ProductList/ProductList";
import React from "react";

export default async function productpage({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const category = (await searchParams).category || "";
  return (
    <div className="">
      <ProductList category={category} params="products"></ProductList>
    </div>
  );
}
