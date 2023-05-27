import React from 'react';
import PropTypes from 'prop-types';

const Flex = ({children, flexDirection, alignItems, justifyContent}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection,
                alignItems,
                justifyContent,
            }}
        >
            {children}
        </div>
    );
};

Flex.propTypes = {
    children: PropTypes.node.isRequired,
    flexDirection: PropTypes.string,
    alignItems: PropTypes.string,
    justifyContent: PropTypes.string,
};

Flex.defaultProps = {
    flexDirection: 'row',
    alignItems: 'normal',
    justifyContent: 'normal',
};

export default Flex;
