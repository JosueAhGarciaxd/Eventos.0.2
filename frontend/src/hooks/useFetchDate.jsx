import { useState, useEffect } from 'react';
import { API_ENDPOINTS, DEFAULT_HEADERS } from '../utils/apiUrl';

/**
 * Custom hook para obtener datos de la API
 * @param {string} endpoint - Endpoint de la API a consultar
 * @param {object} options - Opciones adicionales para la petición
 * @returns {object} - Estado de la petición (data, loading, error, refetch)
 */
export const useFetchData = (endpoint = API_ENDPOINTS.GET_ALL_EVENTS, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Función para realizar la petición fetch
     */
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    ...DEFAULT_HEADERS,
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Función para refetch manual de los datos
     */
    const refetch = () => {
        fetchData();
    };

    // Efecto para cargar datos al montar el componente
    useEffect(() => {
        fetchData();
    }, [endpoint]);

    return {
        data,
        loading,
        error,
        refetch
    };
};