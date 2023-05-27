import React from 'react';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import './App.scss';
import Authentication from './views/Authentication';
import Router from './Router';

const App = () => {
    return (
        <Authentication>
            <Router />
        </Authentication>
    );
};

export default App;
