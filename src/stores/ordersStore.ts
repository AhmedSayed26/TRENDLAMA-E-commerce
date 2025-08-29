import { OrdersActionsType, OrdersStateType, OrderType } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useOrdersStore = create<OrdersStateType & OrdersActionsType>()(
  persist(
    (set) => ({
      orders: [],
      hasHydrated: false,

      addOrder: (order: OrderType) =>
        set((state) => ({ orders: [order, ...state.orders] })),

      clearOrdersForUser: (userId: string) =>
        set((state) => ({ orders: state.orders.filter((o) => o.userId !== userId) })),
    }),
    {
      name: "orders-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export default useOrdersStore;


