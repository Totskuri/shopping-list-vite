import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ContentLoader = ({count, height, width}) => {
    return (
        <Skeleton
            count={count}
            height={height}
            width={width}
        />
    );
};

ContentLoader.propTypes = {
    count: PropTypes.number,
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

ContentLoader.defaultProps = {
    count: 1,
    height: 200,
    width: '100%',
};

export default ContentLoader;
