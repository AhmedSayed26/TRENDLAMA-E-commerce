"use client";
import useOrdersStore from "@/stores/ordersStore";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";
import Image from "next/image";

export default function OrdersPage() {
  const { orders } = useOrdersStore();
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-4">Your Orders</h1>
        <p className="text-sm">Please <Link href="/login" className="underline">login</Link> to view your orders.</p>
      </div>
    );
  }

  const userOrders = orders.filter((o) => o.userId === user.id);

  return (
    <div className="w-full">
      <h1 className="text-xl md:text-2xl font-semibold mb-4">Your Orders</h1>
      {userOrders.length === 0 ? (
        <p className="text-sm text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {userOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs sm:text-sm text-gray-600 mb-3">
                <span className="font-medium">Order</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex flex-col divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                        <Image
                          src={item.images[item.selectedColor]}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="font-medium leading-5">{item.name}</span>
                        <span className="text-gray-500">Size: {item.selectedSize} • Color: {item.selectedColor}</span>
                        <span className="text-gray-500">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right text-sm md:min-w-[120px]">
                      <div className="font-medium">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray-600">Total</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


