import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Title from './Title';
import Button from './Button';
import Card from './Card';
import { EVENT_TYPES } from '../utils/apiUrl';

const EventForm = ({ event, onSubmit, onCancel, loading = false }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: {
            evento: '',
            direccion: '',
            tipoEvento: EVENT_TYPES.PRESENCIAL,
            descripcion: ''
        }
    });

    // Efecto para prellenar el formulario en modo edición
    useEffect(() => {
        if (event) {
            setValue('evento', event.evento);
            setValue('direccion', event.direccion);
            setValue('tipoEvento', event.tipoEvento);
            setValue('descripcion', event.descripcion);
        } else {
            reset();
        }
    }, [event, setValue, reset]);

    // Función para manejar el envío del formulario
    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    const isEditing = !!event;

    return (
        <Card className="event-form-card">
            <Title
                text={isEditing ? 'Editar Evento' : 'Crear Nuevo Evento'}
                level="h2"
                className="form-title"
            />

            <form onSubmit={handleSubmit(handleFormSubmit)} className="event-form">
                {/* Campo Nombre del Evento */}
                <div className="form-group">
                    <label htmlFor="evento" className="form-label">
                        Nombre del Evento *
                    </label>
                    <input
                        id="evento"
                        type="text"
                        className={`form-input ${errors.evento ? 'form-input-error' : ''}`}
                        placeholder="Ingresa el nombre del evento"
                        {...register('evento', {
                            required: 'El nombre del evento es obligatorio',
                            minLength: {
                                value: 3,
                                message: 'El nombre debe tener al menos 3 caracteres'
                            },
                            maxLength: {
                                value: 100,
                                message: 'El nombre no puede exceder 100 caracteres'
                            }
                        })}
                    />
                    {errors.evento && (
                        <span className="form-error">{errors.evento.message}</span>
                    )}
                </div>

                {/* Campo Dirección */}
                <div className="form-group">
                    <label htmlFor="direccion" className="form-label">
                        Dirección/Ubicación *
                    </label>
                    <input
                        id="direccion"
                        type="text"
                        className={`form-input ${errors.direccion ? 'form-input-error' : ''}`}
                        placeholder="Ingresa la dirección o ubicación"
                        {...register('direccion', {
                            required: 'La dirección es obligatoria',
                            minLength: {
                                value: 5,
                                message: 'La dirección debe tener al menos 5 caracteres'
                            }
                        })}
                    />
                    {errors.direccion && (
                        <span className="form-error">{errors.direccion.message}</span>
                    )}
                </div>

                {/* Campo Tipo de Evento */}
                <div className="form-group">
                    <label htmlFor="tipoEvento" className="form-label">
                        Tipo de Evento *
                    </label>
                    <select
                        id="tipoEvento"
                        className={`form-select ${errors.tipoEvento ? 'form-input-error' : ''}`}
                        {...register('tipoEvento', {
                            required: 'Selecciona el tipo de evento'
                        })}
                    >
                        <option value={EVENT_TYPES.PRESENCIAL}>Presencial</option>
                        <option value={EVENT_TYPES.VIRTUAL}>Virtual</option>
                    </select>
                    {errors.tipoEvento && (
                        <span className="form-error">{errors.tipoEvento.message}</span>
                    )}
                </div>

                {/* Campo Descripción */}
                <div className="form-group">
                    <label htmlFor="descripcion" className="form-label">
                        Descripción *
                    </label>
                    <textarea
                        id="descripcion"
                        rows="4"
                        className={`form-textarea ${errors.descripcion ? 'form-input-error' : ''}`}
                        placeholder="Describe el evento..."
                        {...register('descripcion', {
                            required: 'La descripción es obligatoria',
                            minLength: {
                                value: 10,
                                message: 'La descripción debe tener al menos 10 caracteres'
                            },
                            maxLength: {
                                value: 500,
                                message: 'La descripción no puede exceder 500 caracteres'
                            }
                        })}
                    />
                    {errors.descripcion && (
                        <span className="form-error">{errors.descripcion.message}</span>
                    )}
                </div>

                {/* Botones de acción */}
                <div className="form-actions">
                    <Button
                        text="Cancelar"
                        onClick={onCancel}
                        variant="secondary"
                        type="button"
                        disabled={loading}
                    />

                    <Button
                        text={loading ? 'Guardando...' : (isEditing ? 'Actualizar Evento' : 'Crear Evento')}
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    />
                </div>
            </form>
        </Card>
    );
};

EventForm.propTypes = {
    event: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default EventForm;