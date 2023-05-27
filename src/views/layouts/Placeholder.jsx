import React from 'react';
import ContentLoader from '../../components/ContentLoader/ContentLoader';
import DefaultLayout from './DefaultLayout';
import Padding from '../../components/Padding/Padding';

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
