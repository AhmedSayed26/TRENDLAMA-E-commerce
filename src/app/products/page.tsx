import ProductList from "@/_components/ProductList/ProductList";
import React from "react";

export default async function productpage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string };
}) {
  const category = searchParams.category || "";
  const sort = searchParams.sort || "newest";
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
