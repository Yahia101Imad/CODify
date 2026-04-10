import { useEffect, useState } from "react";
import { fetchProductsBySeller } from "../services/api";

export const useProductsBySeller = (id) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    if (!id) return;

    try {
      const res = await fetchProductsBySeller(id);
      setProducts(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  return { products, refetch: fetchProducts };
};