import { useState } from "react";
import { SneakerService } from "../service/SneakerService";

export const useRemoveSneaker = (sneakers, setSneakers) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let sneakerService = new SneakerService();
  const removeSneaker = async (id) => {
    const makeDeleteApiRequest = async () => {
      try {
        setLoading(true);
        await sneakerService.deleteSneaker(id);
        setSneakers(sneakers.filter((sneaker) => sneaker.id !== id));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    makeDeleteApiRequest();
  };
  return { removeSneaker, loading, error };
};
