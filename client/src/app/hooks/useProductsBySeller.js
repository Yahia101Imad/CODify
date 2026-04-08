import { useEffect, useState } from "react";
import { fetchProductsBySeller } from "../services/api";

export const useProductsBySeller = (id) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!id) return;

    fetchProductsBySeller(id)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return { products };
};