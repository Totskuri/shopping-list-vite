import React from 'react';
import ContentLoader from '../components/ContentLoader/ContentLoader.jsx';
import DefaultLayout from './DefaultLayout.jsx';
import Padding from '../components/Padding/Padding.jsx';

const Placeholder = () => {
    return (
        <DefaultLayout>
            <Padding>
                <ContentLoader />
            </Padding>
        </DefaultLayout>
    );
};

export default Placeholder;
