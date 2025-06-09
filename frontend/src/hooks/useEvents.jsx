import { useFetchData } from './useFetchDate';
import { useSaveData } from './useSaveData';
import { useDeleteData } from './useDeleteData';

/**
 * Custom hook principal para manejar todas las operaciones CRUD de eventos
 * Combina todos los hooks individuales en una interfaz unificada
 * @returns {object} - Todas las funciones y estados para manejar eventos
 */
export const useEvents = () => {
    // Hook para obtener datos
    const {
        data: events,
        loading: fetchLoading,
        error: fetchError,
        refetch
    } = useFetchData();

    // Hook para guardar datos
    const {
        createEvent,
        updateEvent,
        loading: saveLoading,
        error: saveError,
        success: saveSuccess,
        resetState: resetSaveState
    } = useSaveData();

    // Hook para eliminar datos
    const {
        deleteEvent,
        deleteMultipleEvents,
        loading: deleteLoading,
        error: deleteError,
        success: deleteSuccess,
        resetState: resetDeleteState
    } = useDeleteData();

    /**
     * Función para crear un evento y refrescar la lista
     * @param {object} eventData - Datos del evento
     * @returns {object} - Resultado de la operación
     */
    const handleCreateEvent = async (eventData) => {
        const result = await createEvent(eventData);
        if (result.success) {
            refetch(); // Refrescar la lista de eventos
        }
        return result;
    };

    /**
     * Función para actualizar un evento y refrescar la lista
     * @param {string|number} id - ID del evento
     * @param {object} eventData - Datos actualizados
     * @returns {object} - Resultado de la operación
     */
    const handleUpdateEvent = async (id, eventData) => {
        const result = await updateEvent(id, eventData);
        if (result.success) {
            refetch(); // Refrescar la lista de eventos
        }
        return result;
    };

    /**
     * Función para eliminar un evento y refrescar la lista
     * @param {string|number} id - ID del evento a eliminar
     * @returns {object} - Resultado de la operación
     */
    const handleDeleteEvent = async (id) => {
        const result = await deleteEvent(id);
        if (result.success) {
            refetch(); // Refrescar la lista de eventos
        }
        return result;
    };

    /**
     * Función para eliminar múltiples eventos y refrescar la lista
     * @param {array} ids - Array de IDs a eliminar
     * @returns {object} - Resultado de la operación
     */
    const handleDeleteMultipleEvents = async (ids) => {
        const result = await deleteMultipleEvents(ids);
        if (result.success) {
            refetch(); // Refrescar la lista de eventos
        }
        return result;
    };

    /**
     * Función para resetear todos los estados
     */
    const resetAllStates = () => {
        resetSaveState();
        resetDeleteState();
    };

    /**
     * Estado de loading combinado
     */
    const isLoading = fetchLoading || saveLoading || deleteLoading;

    /**
     * Errores combinados
     */
    const hasError = fetchError || saveError || deleteError;
    const errorMessage = fetchError || saveError || deleteError;

    /**
     * Estados de éxito combinados
     */
    const hasSuccess = saveSuccess || deleteSuccess;

    return {
        // Datos
        events,

        // Estados de carga
        isLoading,
        fetchLoading,
        saveLoading,
        deleteLoading,

        // Estados de error
        hasError,
        errorMessage,
        fetchError,
        saveError,
        deleteError,

        // Estados de éxito
        hasSuccess,
        saveSuccess,
        deleteSuccess,

        // Funciones CRUD
        createEvent: handleCreateEvent,
        updateEvent: handleUpdateEvent,
        deleteEvent: handleDeleteEvent,
        deleteMultipleEvents: handleDeleteMultipleEvents,

        // Funciones de utilidad
        refetch,
        resetAllStates
    };
};