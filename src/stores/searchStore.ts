"use client";
import { create } from "zustand";
import { ProductType } from "@/types";

interface SearchState {
  searchQuery: string;
}

interface SearchActions {
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  filterProducts: (products: ProductType[]) => ProductType[];
}

const useSearchStore = create<SearchState & SearchActions>((set, get) => ({
  searchQuery: "",

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  clearSearch: () => {
    set({ searchQuery: "" });
  },

  filterProducts: (products: ProductType[]) => {
    try {
      const { searchQuery } = get();
      if (!searchQuery || !searchQuery.trim()) {
        return products;
      }

      const query = searchQuery.toLowerCase().trim();
      return products.filter((product) => {
        if (!product) return false;
        
        return (
          (product.name && product.name.toLowerCase().includes(query)) ||
          (product.shortDescription && product.shortDescription.toLowerCase().includes(query)) ||
          (product.description && product.description.toLowerCase().includes(query)) ||
          (product.colors && product.colors.some((color) =>
            color && color.toLowerCase().includes(query)
          )) ||
          (product.sizes && product.sizes.some((size) =>
            size && size.toLowerCase().includes(query)
          ))
        );
      });
    } catch (error) {
      console.error('Error filtering products:', error);
      return products;
    }
  },
}));

export default useSearchStore;
