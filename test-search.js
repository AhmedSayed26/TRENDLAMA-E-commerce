// Simple test to verify searchStore functionality
import { create } from "zustand";

console.log("Zustand create function:", typeof create);

// Test basic Zustand functionality
const testStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

console.log("Test store created:", testStore);
console.log("Test store state:", testStore.getState());
testStore.getState().increment();
console.log("After increment:", testStore.getState());
