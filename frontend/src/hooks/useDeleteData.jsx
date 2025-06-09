import { useState } from 'react';
import { API_ENDPOINTS } from '../utils/apiUrl';

/**
 * Custom hook para eliminar datos de la API
 * @returns {object} - Funciones y estados para manejar la eliminación de datos
 */
export const useDeleteData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    /**
     * Función para eliminar un evento
     * @param {string|number} id - ID del evento a eliminar
     * @returns {object} - Resultado de la operación
     */
    const deleteEvent = async (id) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const response = await fetch(API_ENDPOINTS.DELETE_EVENT(id), {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            setSuccess(true);

            return {
                success: true,
                message: 'Evento eliminado exitosamente'
            };
        } catch (err) {
            const errorMessage = err.message || 'Error al eliminar el evento';
            setError(errorMessage);
            console.error('Error deleting event:', err);

            return {
                success: false,
                error: errorMessage
            };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Función para eliminar múltiples eventos
     * @param {array} ids - Array de IDs de eventos a eliminar
     * @returns {object} - Resultado de la operación
     */
    const deleteMultipleEvents = async (ids) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const deletePromises = ids.map(id =>
                fetch(API_ENDPOINTS.DELETE_EVENT(id), {
                    method: 'DELETE'
                })
            );

            const responses = await Promise.all(deletePromises);

            // Verificar si todas las respuestas fueron exitosas
            const failedDeletes = responses.filter(response => !response.ok);

            if (failedDeletes.length > 0) {
                throw new Error(`Error al eliminar ${failedDeletes.length} evento(s)`);
            }

            setSuccess(true);

            return {
                success: true,
                message: `${ids.length} evento(s) eliminado(s) exitosamente`
            };
        } catch (err) {
            const errorMessage = err.message || 'Error al eliminar los eventos';
            setError(errorMessage);
            console.error('Error deleting multiple events:', err);

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
        deleteEvent,
        deleteMultipleEvents,
        loading,
        error,
        success,
        resetState
    };
};