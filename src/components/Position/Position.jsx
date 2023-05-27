import React from 'react';
import PropTypes from 'prop-types';

const Position = ({children, position, top, bottom, right, left}) => {
    return (
        <div
            style={{
                position,
                top,
                bottom,
                right,
                left,
            }}
        >
            {children}
        </div>
    );
};

Position.propTypes = {
    children: PropTypes.node.isRequired,
    position: PropTypes.string,
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Position.defaultProps = {
    position: 'absolute',
    top: 'auto',
    bottom: 'auto',
    right: 'auto',
    left: 'auto',
};

export default Position;
