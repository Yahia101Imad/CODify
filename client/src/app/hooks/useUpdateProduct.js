import { useState } from "react";
import { updateProduct } from "../services/api";

export const useUpdateProduct = () => {
  const [error, setError] = useState(null);

  const update = async (id, data) => {
    try {
      const res = await updateProduct(id, data);
      return res;
    } catch (err) {
      setError(err);
      console.log("Update error:", err);
      throw err;
    }
  };

  return { update, error };
};