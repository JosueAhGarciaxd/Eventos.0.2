import React, { useState } from 'react';
import Title from '../components/Title';
import Button from '../components/Button';
import Card from '../components/Card';
import Message from '../components/Message.jsx';

/**
 * Página principal/Dashboard de la aplicación Event Planner
 * Aquí se realizarán las operaciones CRUD de eventos
 */
const HomePage = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState('info');
    const [messageText, setMessageText] = useState('');

    // Función para mostrar mensajes temporales
    const showNotification = (text, type = 'info') => {
        setMessageText(text);
        setMessageType(type);
        setShowMessage(true);

        // Auto-ocultar después de 3 segundos
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    // Funciones placeholder para las operaciones CRUD
    const handleCreateEvent = () => {
        showNotification('Función crear evento - Por implementar', 'info');
    };

    const handleViewEvents = () => {
        showNotification('Cargando eventos...', 'info');
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
                                text="Ver Todos los Eventos"
                                onClick={handleViewEvents}
                                variant="secondary"
                            />
                        </div>
                    </Card>
                </section>

                {/* Área de contenido principal - aquí irán los eventos */}
                <section className="events-section">
                    <Title text="Eventos Recientes" level="h2" />

                    <div className="events-grid">
                        {/* Placeholder para los eventos */}
                        <Card className="event-card-placeholder">
                            <p>Los eventos se mostrarán aquí una vez implementado el CRUD</p>
                        </Card>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;