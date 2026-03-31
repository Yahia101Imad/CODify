import { useEffect, useState } from "react";
import { fetchOrdersBySeller } from "../api/api";

export const useOrdersBySeller = (id) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!id) return;

    fetchOrdersBySeller(id)
      .then(setOrders)
      .catch((err) => console.log(err));
  }, [id]);

  return { orders };
};