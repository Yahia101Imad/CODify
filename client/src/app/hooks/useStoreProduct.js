import { useEffect, useState } from "react";
import { fetchUserByUsername, fetchProductsBySeller } from "../services/api";

export const useStoreProducts = (username) => {
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState(null);

  const fetchData = async () => {
    try {
      // 1. get user
      const user = await fetchUserByUsername(username);

      setStore(user);

      // 2. get user product
      const productsData = await fetchProductsBySeller(user._id);

      setProducts(Array.isArray(productsData) ? productsData : []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  useEffect(() => {
    if (username) fetchData();
  }, [username]);

  return { products, store };
};