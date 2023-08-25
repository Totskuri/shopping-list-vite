import React, {useEffect} from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import Padding from '../components/Padding/Padding';
import User from '../supabase/models/user';
import {useNavigate} from 'react-router-dom';
import Routes from '../constants/routes';
import useTranslation from '../hooks/useTranslation.jsx';

const SignOut = () => {
    const t = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        User.signOut().then(() => {
            navigate(Routes.INDEX);
        });
    }, []);

    return (
        <DefaultLayout>
            <Padding>
                <span>{`${t('Signing out')}...`}</span>
            </Padding>
        </DefaultLayout>
    );
};

export default SignOut;
