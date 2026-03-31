import { useEffect, useState } from "react";
import { fetchOrdersById } from "../api/api";

export const useOrder = (id) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetchOrdersById(id)
      .then(setOrder)
      .catch((err) => console.log(err));
  }, [id]);

  return { order };
};