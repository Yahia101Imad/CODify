import { useEffect, useState } from "react";
import { getOrdersBySeller } from "../services/api";

export const useOrdersBySeller = (sellerId) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrdersBySeller(sellerId);

      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (error) {
      console.error(error);
      setOrders([]);
    }
  };

  useEffect(() => {
    if (sellerId) fetchOrders();
  }, [sellerId]);

  return { orders, refetch: fetchOrders };
};