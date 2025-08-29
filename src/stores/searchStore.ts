import { create } from "zustand";
import { ProductType } from "@/types";

type SearchStore = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  filterProducts: (products: ProductType[]) => ProductType[];
};

const useSearchStore = create<SearchStore>((set, get) => ({
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  clearSearch: () => set({ searchQuery: "" }),
  filterProducts: (products: ProductType[]) => {
    const { searchQuery } = get();
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase().trim();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.shortDescription.toLowerCase().includes(query)
    );
  },
}));

export default useSearchStore;
