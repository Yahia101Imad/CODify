import { useState } from "react";
import { deleteProduct as deleteProductApi } from "../services/api";

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (id) => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      await deleteProductApi(id, token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
};