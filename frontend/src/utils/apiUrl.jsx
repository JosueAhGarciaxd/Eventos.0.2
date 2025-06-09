/**
 * Configuración de URLs y endpoints de la API
 * Archivo centralizado para manejar todas las rutas de la API
 */

// URL base de la API
export const API_BASE_URL = 'https://retoolapi.dev/JWtbTo/eventos';

// Endpoints específicos
export const API_ENDPOINTS = {
    // Obtener todos los eventos
    GET_ALL_EVENTS: API_BASE_URL,

    // Obtener un evento específico por ID
    GET_EVENT_BY_ID: (id) => `${API_BASE_URL}/${id}`,

    // Crear nuevo evento
    CREATE_EVENT: API_BASE_URL,

    // Actualizar evento existente
    UPDATE_EVENT: (id) => `${API_BASE_URL}/${id}`,

    // Eliminar evento
    DELETE_EVENT: (id) => `${API_BASE_URL}/${id}`
};

// Configuración de headers por defecto
export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

// Tipos de eventos permitidos
export const EVENT_TYPES = {
    VIRTUAL: 'Virtual',
    PRESENCIAL: 'Presencial'
};

// Configuración de timeouts
export const API_CONFIG = {
    TIMEOUT: 10000, // 10 segundos
    RETRY_ATTEMPTS: 3
};