import { useEffect, useState } from "react";
import { SneakerService } from "../service/SneakerService";

export const useGetAllSneakers = () => {
    const [sneakers, setSneakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();
        const signal = abortController.signal;
        const sneakerService = new SneakerService(signal);

        const fetchSneakers = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await sneakerService.getAllSneakers();
                if (isMounted) {
                    setSneakers(response);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSneakers();

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, []);

    return { sneakers, setSneakers, loading, error };
};