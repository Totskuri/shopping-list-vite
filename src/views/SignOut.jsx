import React, {useEffect} from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import Padding from '../components/Padding/Padding';
import User from '../supabase/models/user';
import {useNavigate} from 'react-router-dom';
import Routes from '../constants/routes';

const SignOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        User.signOut().then(() => {
            navigate(Routes.INDEX);
        });
    }, []);

    return (
        <DefaultLayout>
            <Padding>
                <span>Signing out...</span>
            </Padding>
        </DefaultLayout>
    );
};

export default SignOut;
