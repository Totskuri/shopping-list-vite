import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({children, gridTemplateColumns, rowGap, columnGap, padding}) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns,
                rowGap,
                columnGap,
                padding,
            }}
        >
            {children}
        </div>
    );
};

Grid.propTypes = {
    children: PropTypes.node.isRequired,
    gridTemplateColumns: PropTypes.string,
    rowGap: PropTypes.string,
    columnGap: PropTypes.string,
    padding: PropTypes.string,
};

Grid.defaultProps = {
    gridTemplateColumns: 'auto',
    rowGap: 'initial',
    columnGap: 'initial',
    padding: 'initial',
};

export default Grid;
