import { useState } from "react";
import { createProduct } from "../services/api";

export const useCreateProduct = () => {
  //   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    const token = localStorage.getItem("token");

    try {
      //   setLoading(true);
      const res = await createProduct(data, token);
      return res;
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      //   setLoading(false);
    }
  };

  return { create, error };
};
