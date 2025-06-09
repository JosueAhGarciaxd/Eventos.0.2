import React, { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import Title from '../components/Title';
import Button from '../components/Button';
import Card from '../components/Card';
import Message from '../components/Message';
import EventForm from '../components/EventFrom';

/**
 * Página principal/Dashboard de la aplicación Event Planner
 * Aquí se realizarán las operaciones CRUD de eventos
 */
const HomePage = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState('info');
    const [messageText, setMessageText] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    // Hook principal para manejar eventos
    const {
        events,
        isLoading,
        hasError,
        errorMessage,
        createEvent,
        updateEvent,
        deleteEvent,
        refetch
    } = useEvents();

    // Función para mostrar mensajes temporales
    const showNotification = (text, type = 'info') => {
        setMessageText(text);
        setMessageType(type);
        setShowMessage(true);

        // Auto-ocultar después de 4 segundos
        setTimeout(() => {
            setShowMessage(false);
        }, 4000);
    };

    // Función para manejar la creación de eventos
    const handleCreateEvent = () => {
        setShowCreateForm(true);
        setEditingEvent(null);
    };

    // Función para manejar la edición de eventos
    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setShowCreateForm(true);
    };

    // Función para manejar la eliminación de eventos
    const handleDeleteEvent = async (eventId, eventName) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar el evento "${eventName}"?`)) {
            const result = await deleteEvent(eventId);
            if (result.success) {
                showNotification(result.message, 'success');
            } else {
                showNotification(result.error, 'error');
            }
        }
    };

    // Función para refrescar eventos
    const handleRefreshEvents = () => {
        refetch();
        showNotification('Refrescando eventos...', 'info');
    };

    // Función para manejar el envío del formulario
    const handleFormSubmit = async (formData) => {
        try {
            let result;

            if (editingEvent) {
                // Actualizar evento existente
                result = await updateEvent(editingEvent.id, formData);
            } else {
                // Crear nuevo evento
                result = await createEvent(formData);
            }

            if (result.success) {
                showNotification(result.message, 'success');
                setShowCreateForm(false);
                setEditingEvent(null);
            } else {
                showNotification(result.error, 'error');
            }
        } catch (error) {
            showNotification('Error inesperado al procesar el evento', 'error');
        }
    };

    // Función para cancelar el formulario
    const handleCancelForm = () => {
        setShowCreateForm(false);
        setEditingEvent(null);
    };

    return (
        <div className="home-page">
            <div className="home-container">
                {/* Header */}
                <header className="home-header">
                    <Title
                        text="Event Planner Dashboard"
                        level="h1"
                        className="dashboard-title"
                    />
                    <Title
                        text="Impulso Creativo"
                        level="h3"
                        className="organization-subtitle"
                    />
                </header>

                {/* Mensaje de notificación */}
                <Message
                    text={messageText}
                    type={messageType}
                    show={showMessage}
                    onClose={() => setShowMessage(false)}
                />

                {/* Mensaje de error de la API */}
                {hasError && (
                    <Message
                        text={`Error: ${errorMessage}`}
                        type="error"
                        show={true}
                    />
                )}

                {/* Acciones principales */}
                <section className="dashboard-actions">
                    <Card className="action-card">
                        <Title text="Gestión de Eventos" level="h2" />
                        <p>Administra todos los eventos de Impulso Creativo</p>

                        <div className="button-group">
                            <Button
                                text="Crear Nuevo Evento"
                                onClick={handleCreateEvent}
                                variant="primary"
                            />

                            <Button
                                text="Refrescar Eventos"
                                onClick={handleRefreshEvents}
                                variant="secondary"
                                disabled={isLoading}
                            />
                        </div>
                    </Card>
                </section>

                {/* Formulario de crear/editar evento */}
                {showCreateForm && (
                    <EventForm
                        event={editingEvent}
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancelForm}
                        loading={isLoading}
                    />
                )}

                {/* Área de contenido principal - eventos */}
                {!showCreateForm && (
                    <section className="events-section">
                        <div className="events-header">
                            <Title text="Lista de Eventos" level="h2" />
                            {events && (
                                <span className="events-count">
                                    Total: {events.length} evento(s)
                                </span>
                            )}
                        </div>

                        {/* Estado de carga */}
                        {isLoading && (
                            <Card className="loading-card">
                                <p>Cargando eventos...</p>
                            </Card>
                        )}

                        {/* Lista de eventos */}
                        {!isLoading && events && events.length > 0 && (
                            <div className="events-grid">
                                {events.map((event) => (
                                    <Card key={event.id} className="event-card">
                                        <div className="event-card-header">
                                            <Title text={event.evento} level="h3" className="event-title" />
                                            <span className={`event-type ${event.tipoEvento.toLowerCase()}`}>
                                                {event.tipoEvento}
                                            </span>
                                        </div>

                                        <div className="event-card-body">
                                            <p className="event-location">
                                                <strong>📍 Ubicación:</strong> {event.direccion}
                                            </p>

                                            <p className="event-description">
                                                <strong>📝 Descripción:</strong> {event.descripcion}
                                            </p>
                                        </div>

                                        <div className="event-card-actions">
                                            <Button
                                                text="Editar"
                                                onClick={() => handleEditEvent(event)}
                                                variant="secondary"
                                            />

                                            <Button
                                                text="Eliminar"
                                                onClick={() => handleDeleteEvent(event.id, event.evento)}
                                                variant="danger"
                                            />
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* Estado vacío */}
                        {!isLoading && events && events.length === 0 && (
                            <Card className="empty-state-card">
                                <Title text="No hay eventos" level="h3" />
                                <p>No se encontraron eventos. ¡Crea tu primer evento!</p>
                                <Button
                                    text="Crear Primer Evento"
                                    onClick={handleCreateEvent}
                                    variant="primary"
                                />
                            </Card>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};

export default HomePage;