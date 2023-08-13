import React from 'react';
import DefaultLayout from './DefaultLayout.jsx';
import Padding from '../components/Padding/Padding.jsx';
import PropTypes from 'prop-types';

const NotFound = ({text}) => {
    return (
        <DefaultLayout>
            <Padding>
                <p>{text}</p>
            </Padding>
        </DefaultLayout>
    );
};

NotFound.propTypes = {
    text: PropTypes.string,
};

NotFound.defaultProps = {
    text: 'Not found',
};

export default NotFound;