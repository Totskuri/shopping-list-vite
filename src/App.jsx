import React from 'react';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import './App.scss';
import Authentication from './views/Authentication';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import routes from './constants/routes.js';
import Index from './views/Index.jsx';
import SignOut from './views/SignOut.jsx';
import ListEdit from './views/list/edit/ListEdit.jsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Authentication>
                <BrowserRouter>
                    <Routes>
                        <Route
                            exact path={routes.INDEX}
                            element={<Index />}
                        />
                        <Route
                            exact path={routes.SIGN_OUT}
                            element={<SignOut />}
                        />
                        <Route
                            exact path={routes.LIST_EDIT}
                            element={<ListEdit />}
                        />
                        <Route
                            path="*"
                            element={<Navigate to={routes.INDEX} replace />}
                        />
                    </Routes>
                </BrowserRouter>
            </Authentication>
        </QueryClientProvider>
    );
};

export default App;
