import { updateOrderStatus } from "../services/api";

export const useUpdateOrder = () => {
  const update = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
    } catch (error) {
      console.error(error);
    }
  };

  return { update };
};