import { useState } from 'react';
import { API_ENDPOINTS, DEFAULT_HEADERS } from '../utils/apiUrl';

/**
 * Custom hook para crear y actualizar datos en la API
 * @returns {object} - Funciones y estados para manejar el guardado de datos
 */
export const useSaveData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    /**
     * Función para crear un nuevo evento
     * @param {object} eventData - Datos del evento a crear
     * @returns {object} - Resultado de la operación
     */
    const createEvent = async (eventData) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const response = await fetch(API_ENDPOINTS.CREATE_EVENT, {
                method: 'POST',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(eventData)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            setSuccess(true);

            return {
                success: true,
                data: result,
                message: 'Evento creado exitosamente'
            };
        } catch (err) {
            const errorMessage = err.message || 'Error al crear el evento';
            setError(errorMessage);
            console.error('Error creating event:', err);

            return {
                success: false,
                error: errorMessage
            };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Función para actualizar un evento existente
     * @param {string|number} id - ID del evento a actualizar
     * @param {object} eventData - Datos actualizados del evento
     * @returns {object} - Resultado de la operación
     */
    const updateEvent = async (id, eventData) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const response = await fetch(API_ENDPOINTS.UPDATE_EVENT(id), {
                method: 'PUT',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(eventData)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            setSuccess(true);

            return {
                success: true,
                data: result,
                message: 'Evento actualizado exitosamente'
            };
        } catch (err) {
            const errorMessage = err.message || 'Error al actualizar el evento';
            setError(errorMessage);
            console.error('Error updating event:', err);

            return {
                success: false,
                error: errorMessage
            };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Función para resetear los estados
     */
    const resetState = () => {
        setError(null);
        setSuccess(false);
        setLoading(false);
    };

    return {
        createEvent,
        updateEvent,
        loading,
        error,
        success,
        resetState
    };
};