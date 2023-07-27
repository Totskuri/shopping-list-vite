import React, {useEffect, useState} from 'react';
import {Auth, ThemeSupa} from '@supabase/auth-ui-react';
import {supabase} from '../supabase/client';
import PropTypes from 'prop-types';
import DataUtil from '../utils/DataUtil';
import Padding from "../components/Padding/Padding.jsx";

const Authentication = ({children}) => {
    const [initialized, setInitialized] = useState(false);
    const [session, setSession] = useState({});

    const initializeSupabase = () => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setInitialized(true);
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    };

    useEffect(() => {
        initializeSupabase();
    }, []);

    if (!initialized || DataUtil.isEmpty(session)) {
        return (
            <Padding>
                {!initialized && (
                    <span>loading...</span>
                )}
                {initialized && (
                    <Auth
                        supabaseClient={supabase}
                        appearance={{theme: ThemeSupa}}
                    />
                )}
            </Padding>
        );
    }

    return children;
};

Authentication.propTypes = {
    children: PropTypes.node,
};

Authentication.defaultProps = {
    children: undefined,
};

export default Authentication;
