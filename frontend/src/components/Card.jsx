import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente reutilizable para tarjetas de contenido
 * @param {React.ReactNode} children - Contenido de la tarjeta
 * @param {string} className - Clases CSS adicionales
 * @param {function} onClick - Función a ejecutar al hacer click en la tarjeta
 */
const Card = ({ children, className = '', onClick }) => {
    return (
        <div
            className={`card ${className} ${onClick ? 'card-clickable' : ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default Card;