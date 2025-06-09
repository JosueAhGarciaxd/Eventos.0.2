import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ text, type = 'info', show = true, onClose, className = '' }) => {
    if (!show) return null;

    return (
        <div className={`message message-${type} ${className}`}>
            <span className="message-text">{text}</span>
            {onClose && (
                <button
                    className="message-close"
                    onClick={onClose}
                    aria-label="Cerrar mensaje"
                >
                    ×
                </button>
            )}
        </div>
    );
};

Message.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
    show: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string
};

export default Message;