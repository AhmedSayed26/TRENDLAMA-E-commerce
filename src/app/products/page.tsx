import ProductList from "@/_components/ProductList/ProductList";
import React from "react";

export default async function productpage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "";
  const sort = params.sort || "newest";
  
  return (
    <div className="">
      <ProductList
        category={category}
        sort={sort}
        params="products"
      ></ProductList>
    </div>
  );
}
