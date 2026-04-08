import { useEffect, useState } from "react";
import { fetchUserData } from "../services/api";

export const useUser = (id) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetchUserData(id)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return { user };
};
