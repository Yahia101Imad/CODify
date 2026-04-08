import { useEffect, useState } from "react";
import { fetchProductsById } from "../services/api";

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetchProductsById(id)
      .then(setProduct)
      .catch((err) => console.log(err));
  }, [id]);

  return { product };
};