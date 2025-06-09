import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente reutilizable para botones
 * @param {string} text - Texto del botón
 * @param {function} onClick - Función a ejecutar al hacer click
 * @param {string} variant - Variante de estilo (primary, secondary, danger)
 * @param {string} type - Tipo de botón (button, submit, reset)
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {string} className - Clases CSS adicionales
 */
const Button = ({
    text,
    onClick,
    variant = 'primary',
    type = 'button',
    disabled = false,
    className = ''
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${variant} ${className}`}
        >
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool,
    className: PropTypes.string
};

export default Button;