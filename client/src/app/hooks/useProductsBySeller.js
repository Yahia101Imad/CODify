import { useEffect, useState } from "react";
import { fetchProductsBySeller } from "../api/api";

export const useProductsBySeller = (id) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!id) return;

    fetchProductsBySeller(id)
      .then(setProducts)
      .catch((err) => console.log(err));
  }, [id]);

  return { products };
};